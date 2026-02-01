import { test, expect } from '@playwright/test';

test('verify articles page', async ({ page }) => {
  await page.goto('/vibecoding-playbook/articles', { waitUntil: 'networkidle' });

  // Verify that the new article title is visible
  const articleTitle = page.locator('text="Advanced Prompt Engineering: Steering AI for Complex Software Tasks"');
  await expect(articleTitle).toBeVisible();

  // Verify that an existing article is still there
  const existingArticle = page.locator('text="Getting Started with the Vibecoding Workflow"');
  await expect(existingArticle).toBeVisible();

  await page.screenshot({ path: 'tests/screenshot.png' });
});
