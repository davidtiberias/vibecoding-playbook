import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles');

  // Verify that the new article title is visible
  const articleTitle = page.locator('text="The Human-in-the-Loop: Why Oversight is the Heart of Verification-Driven Development"');
  await articleTitle.scrollIntoViewIfNeeded();
  await expect(articleTitle).toBeVisible();

  await page.screenshot({ path: 'tests/screenshot_new_article_visible.png', fullPage: true });
});
