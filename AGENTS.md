# Agent Instructions

This document provides instructions for AI agents working on this repository.

## Adding New Articles

To add a new article to the Vibecoding Playbook, follow these steps:

1.  **Create a new Markdown file:** All articles are located in the `src/articles/` directory. Create a new file with a sequential name, following the `ArticleXXX.md` format (e.g., `Article013.md`).

2.  **Add Frontmatter:** At the beginning of the file, include the following frontmatter:
    *   `title`: The title of the article. This will be used to generate the URL slug.
    *   `date`: The publication date in `YYYY-MM-DD` format. Check your current date.
    *   `index`: A unique, sequential number that determines the article's order in the navigation. This should be the next number after the highest existing index.
    *   `keywords`: A list of relevant keywords for SEO purposes.

    Example:
    ```yaml
    ---
    title: "Your New Article Title"
    date: "2025-12-25"
    index: 13
    keywords:
      - "keyword one"
      - "keyword two"
      - "keyword three"
    ---
    ```

3.  **Write the Article Content:** Write the article content in Markdown below the frontmatter. Follow the style and tone of the existing articles.
    All content must follows this guidelines:
    *   [Google Publisher Policies](https://support.google.com/adsense/answer/10502938)
    *   [Google AdSense content and user experience](https://support.google.com/adsense/answer/10015918)
    *   [Manual actions report](https://support.google.com/webmasters/answer/9044175)
    *   [Spam policies for Google web search](https://support.google.com/publisherpolicies/answer/11035931)

4.  **Verify the Build:** After adding the new article, run `npm run build` to ensure the site builds correctly and the new article is included in the prerendered pages. Check the `dist/client/articles` directory to confirm the new article's HTML file was generated. And if you want to publish it, run `npm run deploy` to make the site live at GH-pages.

## CI/CD Pipeline

Before submitting any changes, ensure that the CI/CD pipeline passes. The pipeline is automatically triggered on every push to the `main` branch. You can check the status of the pipeline in the "Actions" tab of the GitHub repository.

## Changelog

- **2024-07-29:** Added `Article014.md` on the importance of CI/CD pipelines and wrote the full content.
- **2024-07-29:** Added a new article, "Five Best Practices for Using AI Coding Assistants."
- **2024-07-29:** Updated the CI/CD pipeline to automate testing and builds.
- **2026-01-14:** Added `Article014.md` - "The Unseen Guardian: Why CI/CD is Non-Negotiable for AI-Driven Software Development".
- **2026-01-17:** Added `Article014.md` on the importance of CI/CD pipelines.
- **2026-01-14:** Added `Article014.md` - "The Unseen Guardian: How a CI/CD Pipeline Prevents Regressions".
- **2026-01-14:** Added `Article014.md` on "The Power of CI/CD: Building a Failsafe Pipeline for Your Future Self".
- **2026-01-31:** Added `Article015.md` - "The Role of System Invariants in AI Development" and created a verification pipeline script `scripts/agent-verify.sh`.
