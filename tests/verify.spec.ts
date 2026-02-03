import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles');

  // Verify that multiple articles are visible to ensure no regression
  const articles = [
    "The Fragmentation Tax: Why AI Studio is the Warren Buffett of Vibecoding",
    "The Importance of a CI/CD Pipeline",
    "Deterministic AI Development: The Power of Context Management"
  ];

  for (const title of articles) {
    const articleLocator = page.locator(`text="${title}"`).first();
    await articleLocator.scrollIntoViewIfNeeded();
    await expect(articleLocator).toBeVisible();
  }

  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true });
});
