import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles');

  // Verify that the new article title is visible
  const articleTitle = page.locator('text="The Unseen Guardian: How a CI/CD Pipeline Prevents Regressions"');
  await expect(articleTitle.first()).toBeVisible();

  // Verify that the added Article 015 is visible
  const article015Title = page.locator('text="Bridging the Gap: Integrating AI into Your CI/CD Workflow"');
  await expect(article015Title.first()).toBeVisible();

  await page.screenshot({ path: 'tests/screenshot.png' });
});
