// pages/articles/@articleId/+data.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import type { PageContext } from 'vike/types';

export const data = async (pageContext: PageContext) => {
  const { articleId } = pageContext.routeParams;
  const articlesDir = path.resolve(process.cwd(), 'src/articles');
  const files = await fs.readdir(articlesDir);

  const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  // 1. Parse all articles
  const allArticles = await Promise.all(files
    .filter(file => file.endsWith('.md'))
    .map(async (file) => {
      const rawContent = await fs.readFile(path.join(articlesDir, file), 'utf-8');
      const { data } = matter(rawContent);
      const slug = toSlug(data.title || 'Untitled');
      return {
        slug,
        title: data.title || 'Untitled',
        // Force index to be a number, default to 999 if missing to push to end
        index: typeof data.index === 'number' ? data.index : 999,
        date: data.date || '1970-01-01',
        file 
      };
    }));

  // 2. Sort by index explicitly
  allArticles.sort((a, b) => a.index - b.index);

  // 3. Find current article index
  const currentIndex = allArticles.findIndex(a => a.slug === articleId);

  if (currentIndex === -1) return { article: null };

  // 4. Get Content for current article
  const currentMeta = allArticles[currentIndex];
  const rawContent = await fs.readFile(path.join(articlesDir, currentMeta.file), 'utf-8');
  const { content } = matter(rawContent);
  const match = currentMeta.file.match(/Article(\d+)\.md$/);
  const id = match ? match[1] : currentMeta.file;

  const article = {
    id,
    index: currentMeta.index,
    title: currentMeta.title,
    date: currentMeta.date,
    content
  };

  // 5. Get Prev/Next
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return {
    article,
    prevArticle: prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null,
    nextArticle: nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null
  };
};