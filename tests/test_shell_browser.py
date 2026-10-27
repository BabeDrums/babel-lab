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
        context = self.browser.new_context(viewport={'width': width, 'height': 844}, has_touch=True)
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

    def assert_fire_header_role(self, title):
        self.assertEqual(title.evaluate("el => getComputedStyle(el).fontSize"), '34px')
        self.assertEqual(title.evaluate("el => getComputedStyle(el).lineHeight"), '35.36px')
        self.assertAlmostEqual(title.evaluate("el => el.getBoundingClientRect().top"), 62, delta=0.6)

    def assert_fire_row(self, locator):
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).minHeight"), '64px')
        self.assertEqual(locator.evaluate("el => el.getBoundingClientRect().height"), 64)
        strong = locator.locator('.experiment-copy strong')
        self.assertEqual(strong.evaluate("el => getComputedStyle(el).fontSize"), '16px')
        small = locator.locator('.experiment-copy small')
        self.assertEqual(small.evaluate("el => getComputedStyle(el).fontSize"), '12px')

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
        self.assertEqual(footer.evaluate("el => getComputedStyle(el).position"), 'fixed')
        self.assertEqual(footer.evaluate("el => getComputedStyle(el).fontSize"), '10px')

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

    def test_world_phase_one_uses_frozen_toolbar_and_fixed_rows(self):
        page = self.open('/world/context-loop/')
        self.assert_toolbar_control(page.locator('.context-topbar .back-link'))
        self.assert_info_control(page.locator('.context-topbar .context-info-btn'))
        self.assertEqual(page.locator('.fire-finish-identity h1').evaluate("el => getComputedStyle(el).fontSize"), '34px')

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
