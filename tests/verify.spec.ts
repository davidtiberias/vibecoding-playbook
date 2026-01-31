import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles');

  // Verify that the new article title is visible
  const articleTitle = page.locator('text="The Unseen Guardian: How a CI/CD Pipeline Prevents Regressions"');
  await expect(articleTitle).toBeVisible();

  // Verify the newly added article
  const newArticleTitle = page.locator('text="The Role of System Invariants in AI Development"');
  await expect(newArticleTitle).toBeVisible();

  await page.screenshot({ path: 'tests/screenshot.png' });
});
