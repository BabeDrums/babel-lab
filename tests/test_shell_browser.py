import os
import unittest

from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get('LAB_URL', 'http://127.0.0.1:8000').rstrip('/')


class LabShellBrowser(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.pw = sync_playwright().start()
        cls.browser = cls.pw.chromium.launch(
            executable_path=os.environ.get('CHROMIUM_PATH') or None,
            args=['--no-sandbox'],
        )

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.pw.stop()

    def open(self, path):
        width = int(os.environ.get('LAB_TEST_WIDTH', '390'))
        height = 768 if width >= 1000 else 844
        context = self.browser.new_context(viewport={'width': width, 'height': height}, has_touch=True)
        self.addCleanup(context.close)
        page = context.new_page()
        page.set_default_timeout(5000)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on(
            'response',
            lambda response: errors.append(f'{response.status} {response.url}')
            if response.status >= 400 and not response.url.endswith('/favicon.ico')
            else None,
        )
        page.on(
            'console',
            lambda message: errors.append(message.text)
            if message.type == 'error' and not message.text.startswith('Failed to load resource:')
            else None,
        )
        response = page.goto(f'{BASE_URL}/{path.lstrip("/")}')
        self.assertIsNotNone(response)
        self.assertEqual(response.status, 200)
        self.addCleanup(lambda: self.assertEqual(errors, []))
        return page

    def rect(self, locator):
        return locator.evaluate("el => { const r = el.getBoundingClientRect(); return {x:r.x, y:r.y, width:r.width, height:r.height, right:r.right}; }")

    def assert_same_rect_axis(self, first, second, keys=('x', 'width', 'right'), delta=0.1):
        for key in keys:
            self.assertAlmostEqual(first[key], second[key], delta=delta, msg=f'{key}: {first[key]} != {second[key]}')

    def assert_toolbar_control(self, locator):
        # Final frozen FIRE G7 cascade: 44px transparent interaction host + one 36px visible circle.
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).width"), '44px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).height"), '44px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).backgroundColor"), 'rgba(0, 0, 0, 0)')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).borderTopWidth"), '0px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').width"), '36px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').height"), '36px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').backgroundColor"), 'rgb(23, 23, 26)')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').borderTopWidth"), '1px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').borderRadius"), '50%')

    def assert_info_control(self, locator):
        self.assert_toolbar_control(locator)
        self.assertEqual(locator.inner_text().strip(), 'i')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).fontSize"), '0px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::before').width"), '20px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::before').height"), '20px')
        self.assertNotEqual(locator.evaluate("el => getComputedStyle(el, '::before').webkitMaskImage"), 'none')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::before').zIndex"), '1')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').zIndex"), '0')

    def assert_forward_chevron(self, locator):
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).fontSize"), '0px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).width"), '20px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).height"), '20px')
        self.assertNotEqual(locator.evaluate("el => getComputedStyle(el).webkitMaskImage"), 'none')

    def assert_fire_header_role(self, title):
        viewport = title.evaluate("window.innerWidth")
        expected_font = 35 if viewport >= 700 else 34
        self.assertAlmostEqual(title.evaluate("el => parseFloat(getComputedStyle(el).fontSize)"), expected_font, delta=0.1)
        self.assertAlmostEqual(title.evaluate("el => parseFloat(getComputedStyle(el).lineHeight)"), expected_font * 1.04, delta=0.1)
        self.assertAlmostEqual(title.evaluate("el => el.getBoundingClientRect().top"), 62, delta=0.6)

    def assert_fire_row(self, locator):
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).minHeight"), '64px')
        self.assertEqual(locator.evaluate("el => el.getBoundingClientRect().height"), 64)
        strong = locator.locator('.experiment-copy strong')
        self.assertEqual(strong.evaluate("el => getComputedStyle(el).fontSize"), '16px')
        small = locator.locator('.experiment-copy small')
        self.assertEqual(small.evaluate("el => getComputedStyle(el).fontSize"), '12px')
        chevron = locator.locator('.row-chevron')
        if chevron.count():
            self.assert_forward_chevron(chevron)

    def test_root_header_and_rows_use_frozen_fire_roles(self):
        page = self.open('/')
        title = page.locator('.lab-header h1')
        self.assertEqual(title.inner_text(), 'Babel Lab')
        self.assert_fire_header_role(title)
        subtitle = page.locator('.lab-header p')
        self.assertEqual(subtitle.evaluate("el => getComputedStyle(el).fontSize"), '14px')
        rows = page.locator('.experiment-row')
        self.assertEqual(rows.count(), 3)
        for index in range(rows.count()):
            self.assert_fire_row(rows.nth(index))
        footer = page.locator('.lab-version')
        self.assertEqual(footer.inner_text(), 'LAB · local')
        self.assertEqual(footer.evaluate("el => getComputedStyle(el).position"), 'fixed')
        self.assertEqual(footer.evaluate("el => getComputedStyle(el).fontSize"), '10px')
        viewport = page.evaluate('window.innerWidth')
        expected_bottom = 20 if viewport >= 700 else 12
        self.assertAlmostEqual(footer.evaluate("el => parseFloat(getComputedStyle(el).bottom)"), expected_bottom, delta=0.1)

    def test_shell_gallery_uses_real_shared_primitives_only(self):
        page = self.open('/shell/')
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'Shell Gallery')
        self.assert_fire_header_role(title)
        self.assert_toolbar_control(page.locator('.lab-topbar > .back-link'))
        self.assert_toolbar_control(page.locator('.header-demo .back-link'))
        self.assert_info_control(page.locator('.header-demo .context-info-btn'))
        self.assert_toolbar_control(page.locator('.header-demo .gallery-plus'))
        self.assert_toolbar_control(page.locator('.header-demo .gallery-more'))
        self.assertEqual(page.locator('.large-card').count(), 0)
        rows = page.locator('.experiment-row')
        self.assertGreaterEqual(rows.count(), 3)
        for index in range(rows.count()):
            self.assert_fire_row(rows.nth(index))

    def test_world_lab_header_and_rows_use_fire_geometry(self):
        page = self.open('/world/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'World Lab')
        self.assert_fire_header_role(title)
        rows = page.locator('.experiment-row')
        self.assertEqual(rows.count(), 2)
        for index in range(rows.count()):
            self.assert_fire_row(rows.nth(index))

    def test_fire_lab_header_and_rows_use_fire_geometry(self):
        page = self.open('/fire/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'Fire Lab')
        self.assert_fire_header_role(title)
        rows = page.locator('.experiment-row')
        self.assertEqual(rows.count(), 2)
        for index in range(rows.count()):
            self.assert_fire_row(rows.nth(index))

    def test_achievements_header_uses_shared_toolbar_and_title(self):
        page = self.open('/world/achievements/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'Achievements')
        self.assert_fire_header_role(title)

    def test_shared_canvas_matches_final_computed_frozen_g7_page_frame(self):
        root = self.open('/')
        root_shell = self.rect(root.locator('.lab-shell'))
        root_group = self.rect(root.locator('.experiment-list'))
        viewport = root.evaluate('window.innerWidth')
        expected_width = min(viewport, 760)
        expected_inline = 34 if viewport >= 700 else 20
        expected_bottom = 54 if viewport >= 700 else 26
        shell = root.locator('.lab-shell')

        self.assertAlmostEqual(root_shell['width'], expected_width, delta=0.1)
        self.assertAlmostEqual(root_shell['x'], (viewport - expected_width) / 2, delta=0.1)
        self.assertAlmostEqual(shell.evaluate("el => parseFloat(getComputedStyle(el).paddingLeft)"), expected_inline, delta=0.1)
        self.assertAlmostEqual(shell.evaluate("el => parseFloat(getComputedStyle(el).paddingRight)"), expected_inline, delta=0.1)
        self.assertAlmostEqual(shell.evaluate("el => parseFloat(getComputedStyle(el).paddingBottom)"), expected_bottom, delta=0.1)
        self.assertAlmostEqual(root_group['x'], root_shell['x'] + expected_inline, delta=0.1)
        self.assertAlmostEqual(root_group['width'], expected_width - (expected_inline * 2), delta=0.1)

        for path in ('/world/', '/fire/', '/shell/'):
            page = self.open(path)
            self.assert_same_rect_axis(root_shell, self.rect(page.locator('.lab-shell')))

        world = self.open('/world/')
        fire = self.open('/fire/')
        self.assert_same_rect_axis(root_group, self.rect(world.locator('.experiment-list')))
        self.assert_same_rect_axis(root_group, self.rect(fire.locator('.experiment-list')))

    def test_fire_core_never_changes_canvas_or_left_edge_at_depth(self):
        page = self.open('/fire/core/')
        shell_before = self.rect(page.locator('.lab-shell'))
        list_before = self.rect(page.locator('.core-project-list'))
        rows = page.locator('.core-project-row')
        self.assertEqual(rows.count(), 2)
        for index in range(rows.count()):
            row = rows.nth(index)
            self.assertEqual(row.evaluate("el => el.getBoundingClientRect().height"), 64)
            self.assertEqual(row.locator('strong').evaluate("el => getComputedStyle(el).fontSize"), '16px')
            self.assertEqual(row.locator('small').evaluate("el => getComputedStyle(el).fontSize"), '12px')
            self.assert_forward_chevron(row.locator('.core-project-arrow'))

        page.locator('[data-select-project="even"]').click()
        first_choice = self.rect(page.locator('.core-choice-list'))
        self.assert_same_rect_axis(list_before, first_choice)
        self.assertEqual(page.locator('.core-choice').first.evaluate("el => el.getBoundingClientRect().height"), 64)

        page.locator('[data-stage]').first.click()
        second_choice = self.rect(page.locator('.core-choice-list'))
        self.assert_same_rect_axis(list_before, second_choice)

        page.locator('[data-need]').first.click()
        focus = self.rect(page.locator('.core-focus-card'))
        self.assert_same_rect_axis(list_before, focus)
        self.assert_same_rect_axis(shell_before, self.rect(page.locator('.lab-shell')))

    def test_world_phase_one_uses_shared_symbols_and_clean_info_sheet(self):
        page = self.open('/world/context-loop/')
        self.assert_toolbar_control(page.locator('.context-topbar .back-link'))
        self.assert_info_control(page.locator('.context-topbar .context-info-btn'))
        self.assertEqual(page.locator('.fire-finish-identity h1').evaluate("el => getComputedStyle(el).fontSize"), '34px')

        doorway = page.locator('.world-doorway')
        self.assertEqual(doorway.locator('.world-doorway-mark').count(), 0)
        self.assertEqual(doorway.locator('.world-doorway-stars').count(), 0)
        self.assertEqual(doorway.locator('.world-doorway-arrow').count(), 0)
        self.assertEqual(doorway.locator('.world-doorway-chevron').count(), 1)
        self.assert_forward_chevron(doorway.locator('.world-doorway-chevron'))

        page.locator('[data-action="prototype-info"]').click()
        self.assertEqual(page.locator('.scenario-control').count(), 0)
        self.assertEqual(page.locator('.scenario-option').count(), 0)
        self.assertEqual(page.locator('.prototype-setting-row').count(), 2)
        self.assertEqual(page.locator('.prototype-select').count(), 2)
        sheet = self.rect(page.locator('.prototype-sheet'))
        self.assertLessEqual(sheet['width'], 420.1)
        page.locator('.prototype-sheet [data-dismiss]').click()

        page.locator('[data-action="open-world"]').click()
        page.locator('[data-action="choose-even-album"]').click()
        orientation = page.locator('.orientation-copy')
        self.assertEqual(orientation.evaluate("el => el.getBoundingClientRect().height"), 64)
        decision_title = page.locator('.decision-card h2')
        self.assertEqual(decision_title.evaluate("el => el.getBoundingClientRect().height"), 64)
        decision_reason = page.locator('.decision-card p')
        self.assertEqual(decision_reason.evaluate("el => el.getBoundingClientRect().height"), 64)
        alternative = page.locator('.alternative-line')
        self.assertEqual(alternative.evaluate("el => el.getBoundingClientRect().height"), 64)


if __name__ == '__main__':
    unittest.main()
