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
        date: data.date || '1970-01-01',
        time: data.time || '00:00',
        file 
      };
    }));

  // 2. Sort by date and time
  allArticles.sort((a, b) => {
    const dtA = new Date(`${a.date}T${a.time}`);
    const dtB = new Date(`${b.date}T${b.time}`);
    return dtA.getTime() - dtB.getTime();
  });

  // Assign transient index
  const articlesWithIndex = allArticles.map((a, i) => ({ ...a, index: i + 1 }));

  // 3. Find current article index
  const currentIndex = articlesWithIndex.findIndex(a => a.slug === articleId);

  if (currentIndex === -1) return { article: null };

  // 4. Get Content for current article
  const currentMeta = articlesWithIndex[currentIndex];
  const rawContent = await fs.readFile(path.join(articlesDir, currentMeta.file), 'utf-8');
  const { content, data: frontmatter } = matter(rawContent);
  const id = currentMeta.file.replace('.md', '');

  const article = {
    id,
    index: currentMeta.index,
    title: currentMeta.title,
    date: currentMeta.date,
    time: currentMeta.time,
    content,
    keywords: frontmatter.keywords || [] 
  };

  // 5. Get Prev/Next
  const prevArticle = currentIndex > 0 ? articlesWithIndex[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesWithIndex.length - 1 ? articlesWithIndex[currentIndex + 1] : null;

  return {
    article,
    prevArticle: prevArticle ? { title: prevArticle.title, slug: prevArticle.slug } : null,
    nextArticle: nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null
  };
};