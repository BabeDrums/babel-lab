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
        # Frozen FIRE G7 contract: the 44px control itself owns the visible circle.
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).width"), '44px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).height"), '44px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).backgroundColor"), 'rgb(23, 23, 26)')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).borderTopWidth"), '1px')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el).borderRadius"), '50%')
        self.assertEqual(locator.evaluate("el => getComputedStyle(el, '::after').content"), 'none')

    def test_root_header_uses_frozen_title_role(self):
        page = self.open('/')
        title = page.locator('.lab-header h1')
        self.assertEqual(title.inner_text(), 'Babel Lab')
        self.assertEqual(title.evaluate("el => getComputedStyle(el).fontSize"), '34px')
        subtitle = page.locator('.lab-header p')
        self.assertEqual(subtitle.evaluate("el => getComputedStyle(el).fontSize"), '14px')
        self.assertEqual(page.locator('.large-card--destination').count(), 3)

    def test_shell_gallery_uses_real_shared_primitives(self):
        page = self.open('/shell/')
        self.assertEqual(page.locator('.lab-page-header h1').inner_text(), 'Shell Gallery')
        self.assert_toolbar_control(page.locator('.lab-topbar > .back-link'))
        self.assert_toolbar_control(page.locator('.header-demo .back-link'))
        self.assert_toolbar_control(page.locator('.header-demo .context-info-btn'))
        self.assertGreaterEqual(page.locator('.large-card--destination').count(), 1)
        self.assertGreaterEqual(page.locator('.large-card--orientation').count(), 1)
        self.assertGreaterEqual(page.locator('.large-card--decision').count(), 1)

    def test_world_lab_header_uses_shared_toolbar_and_title(self):
        page = self.open('/world/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'World Lab')
        self.assertEqual(title.evaluate("el => getComputedStyle(el).fontSize"), '34px')

    def test_fire_lab_header_uses_shared_toolbar_and_title(self):
        page = self.open('/fire/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'Fire Lab')
        self.assertEqual(title.evaluate("el => getComputedStyle(el).fontSize"), '34px')

    def test_achievements_header_uses_shared_toolbar_and_title(self):
        page = self.open('/world/achievements/')
        self.assert_toolbar_control(page.locator('.back-link'))
        title = page.locator('.lab-page-header h1')
        self.assertEqual(title.inner_text(), 'Achievements')
        self.assertEqual(title.evaluate("el => getComputedStyle(el).fontSize"), '34px')

    def test_world_phase_one_uses_exact_frozen_toolbar(self):
        page = self.open('/world/context-loop/')
        self.assert_toolbar_control(page.locator('.context-topbar .back-link'))
        self.assert_toolbar_control(page.locator('.context-topbar .context-info-btn'))


if __name__ == '__main__':
    unittest.main()
