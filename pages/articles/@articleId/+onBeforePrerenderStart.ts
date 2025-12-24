// pages/articles/@articleId/+onBeforePrerenderStart.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export default async function onBeforePrerenderStart() {
  const articlesDir = path.resolve(process.cwd(), 'src/articles');
  const files = await fs.readdir(articlesDir);

  const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  
  const urls: string[] = [];

  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const rawContent = await fs.readFile(path.join(articlesDir, file), 'utf-8');
    const { data } = matter(rawContent);
    const slug = toSlug(data.title || 'Untitled');
    
    // Add the URL to the prerender list
    urls.push(`/articles/${slug}`);
  }

  return urls;
}