(function(){
  const TAU = Math.PI * 2;

  class FireSimulation {
    constructor(getConfig) {
      this.getConfig = getConfig;
      this.particles = [];
      this.emissionCarry = 0;
      this.time = 0;
      this.width = 320;
      this.height = 320;
      this.seedWarmStart();
    }

    resize(w, h) {
      this.width = Math.max(1, w);
      this.height = Math.max(1, h);
    }

    reset() {
      this.particles = [];
      this.emissionCarry = 0;
      this.time = 0;
      this.seedWarmStart();
    }

    seedWarmStart() {
      for (let i = 0; i < 90; i++) {
        const p = this.makeParticle();
        p.age = Math.random() * p.life * 0.9;
        const q = p.age / p.life;
        p.y -= q * 145 * (0.7 + Math.random() * 0.5);
        p.x += (Math.random() - 0.5) * q * 54;
        this.particles.push(p);
      }
    }

    makeParticle() {
      const c = this.getConfig();
      const baseY = this.height * 0.88;
      const baseX = this.width * 0.5;
      const spread = 36 * (0.72 + c.intensity * 0.4);
      const life = 0.62 + Math.random() * (0.65 + c.intensity * 0.45);
      const speed = 78 * (0.72 + c.intensity * 0.58);
      return {
        x: baseX + (Math.random() - 0.5) * spread,
        y: baseY + Math.random() * 8,
        vx: (Math.random() - 0.5) * (8 + 16 * c.turbulence),
        vy: -speed * (0.72 + Math.random() * 0.52),
        age: 0,
        life,
        size: 5.3 + Math.random() * 6.2,
        rotation: Math.random() * TAU,
        spin: (Math.random() - 0.5) * 2.4,
        shapeRoll: Math.random(),
        heatRoll: Math.random()
      };
    }

    step(dt) {
      const c = this.getConfig();
      this.time += dt;
      const perSecond = 82 + c.intensity * 145;
      this.emissionCarry += perSecond * dt;
      const spawnCount = Math.min(24, Math.floor(this.emissionCarry));
      this.emissionCarry -= spawnCount;
      for (let i = 0; i < spawnCount; i++) this.particles.push(this.makeParticle());

      const turbulence = c.turbulence;
      for (const p of this.particles) {
        p.age += dt;
        const q = p.age / p.life;
        const wobble = Math.sin(this.time * (4.2 + turbulence * 3) + p.y * 0.045 + p.shapeRoll * 8);
        p.vx += wobble * (11 + turbulence * 22) * dt;
        p.vx *= Math.pow(0.985, dt * 60);
        p.vy -= (4 + c.intensity * 5) * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rotation += p.spin * dt;
        p.size *= Math.pow(0.994, dt * 60);
        if (q > 0.66) p.vx += (p.x < this.width / 2 ? -1 : 1) * turbulence * 2.2 * dt;
      }

      this.particles = this.particles.filter(p => p.age < p.life && p.size > 0.7 && p.y > -30);
    }
  }

  function shapeFor(p, config) {
    if (config.particleStyle && config.particleStyle !== 'mixed') return config.particleStyle;
    const d = config.diversity;
    const r = p.shapeRoll;
    if (d < 0.2) return 'square';
    const circleCut = 0.18 + d * 0.18;
    const diamondCut = circleCut + 0.22 + d * 0.18;
    if (r < circleCut) return 'circle';
    if (r < diamondCut) return 'diamond';
    return 'square';
  }

  function flatColor(p) {
    const q = Math.min(1, p.age / p.life);
    if (q < 0.28) return p.heatRoll > 0.42 ? '#ffd36a' : '#ffb13b';
    if (q < 0.66) return p.heatRoll > 0.45 ? '#ff8a2d' : '#f66a24';
    return p.heatRoll > 0.55 ? '#dd4c22' : '#b93620';
  }

  function drawShape(ctx, shape, x, y, size, rotation, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = color;
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.5, 0, TAU);
      ctx.fill();
    } else {
      if (shape === 'diamond') ctx.rotate(Math.PI / 4);
      ctx.fillRect(-size / 2, -size / 2, size, size);
    }
    ctx.restore();
  }

  function drawParticles(ctx, sim, config, width, height) {
    ctx.clearRect(0, 0, width, height);
    for (const p of sim.particles) {
      const q = Math.min(1, p.age / p.life);
      const alpha = Math.max(0, 1 - q);
      const size = p.size * (1 - q * 0.25);
      drawShape(ctx, shapeFor(p, config), p.x, p.y, size, p.rotation, flatColor(p), alpha);
    }
  }

  function drawGrid(ctx, sim, config, width, height) {
    ctx.clearRect(0, 0, width, height);
    const cols = 18;
    const rows = 24;
    const cell = Math.min(width / cols, height / rows);
    const gridW = cols * cell;
    const gridH = rows * cell;
    const offX = (width - gridW) / 2;
    const offY = (height - gridH) / 2;
    const energy = new Float32Array(cols * rows);
    const heat = new Float32Array(cols * rows);

    for (const p of sim.particles) {
      const gx = Math.floor((p.x - offX) / cell);
      const gy = Math.floor((p.y - offY) / cell);
      if (gx < 0 || gx >= cols || gy < 0 || gy >= rows) continue;
      const q = Math.min(1, p.age / p.life);
      const idx = gy * cols + gx;
      const e = (1 - q) * (0.65 + config.intensity * 0.5);
      energy[idx] = Math.min(1.4, energy[idx] + e);
      heat[idx] = Math.max(heat[idx], 1 - q);

      const neighbors = [[1,0],[-1,0],[0,1],[0,-1]];
      for (const [dx,dy] of neighbors) {
        const nx = gx + dx, ny = gy + dy;
        if (nx < 0 || nx >= cols || ny < 0 || ny >= rows) continue;
        const ni = ny * cols + nx;
        energy[ni] = Math.min(1.1, energy[ni] + e * 0.18);
        heat[ni] = Math.max(heat[ni], (1 - q) * 0.72);
      }
    }

    const gap = Math.max(1, Math.floor(cell * 0.12));
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        if (energy[i] < 0.17) continue;
        const h = heat[i];
        ctx.globalAlpha = Math.min(1, 0.34 + energy[i] * 0.72);
        ctx.fillStyle = h > 0.72 ? '#ffd36a' : h > 0.42 ? '#ff8a2d' : '#d84c22';
        ctx.fillRect(offX + x * cell + gap, offY + y * cell + gap, cell - gap * 2, cell - gap * 2);
      }
    }
    ctx.globalAlpha = 1;
  }

  window.createFireController = function(canvas, getConfig, options) {
    const ctx = canvas.getContext('2d');
    let renderer = options.renderer || 'particles';
    let destroyed = false;
    let raf = 0;
    let last = performance.now();
    let rect = null;
    const sim = new FireSimulation(getConfig);
    const motionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

    function isReduced() {
      return !!(motionQuery && motionQuery.matches);
    }

    function draw() {
      const config = getConfig();
      if (renderer === 'grid') drawGrid(ctx, sim, config, rect.width, rect.height);
      else drawParticles(ctx, sim, config, rect.width, rect.height);
    }

    function resize() {
      const next = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(next.width * dpr));
      canvas.height = Math.max(1, Math.round(next.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sim.resize(next.width, next.height);
      rect = next;
      draw();
    }

    function frame(now) {
      if (destroyed) return;
      if (isReduced()) {
        draw();
        return;
      }
      const dt = Math.min(0.08, Math.max(0.001, (now - last) / 1000));
      last = now;
      sim.step(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    function restartForMotionPreference() {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (isReduced()) {
        draw();
      } else {
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    if (isReduced()) draw();
    else raf = requestAnimationFrame(frame);

    const onResize = () => resize();
    let ro = null;
    if ('ResizeObserver' in window) {
      ro = new ResizeObserver(onResize);
      ro.observe(canvas);
    } else {
      window.addEventListener('resize', onResize, { passive: true });
    }

    if (motionQuery) {
      if (motionQuery.addEventListener) motionQuery.addEventListener('change', restartForMotionPreference);
      else if (motionQuery.addListener) motionQuery.addListener(restartForMotionPreference);
    }

    return {
      setRenderer(next) {
        renderer = next;
        draw();
      },
      updateConfig() {
        if (isReduced()) {
          sim.reset();
          draw();
        }
      },
      destroy() {
        destroyed = true;
        cancelAnimationFrame(raf);
        if (ro) ro.disconnect();
        else window.removeEventListener('resize', onResize);
        if (motionQuery) {
          if (motionQuery.removeEventListener) motionQuery.removeEventListener('change', restartForMotionPreference);
          else if (motionQuery.removeListener) motionQuery.removeListener(restartForMotionPreference);
        }
      }
    };
  };
})();
