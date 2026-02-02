import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles');

  // Verify that the new article title is visible
  const articleTitle = page.locator('text="The Unseen Guardian: How a CI/CD Pipeline Prevents Regressions"');
  await expect(articleTitle).toBeVisible();

  // Verify that Article 015 title is visible
  const article015Title = page.locator('text="The Silent Watchman: Automated Visual Regression Testing in AI Development"');
  await expect(article015Title).toBeVisible();

  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true });
});
