// pages/index/+data.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const data = async () => {
  const articlesDir = path.resolve(process.cwd(), 'src/articles');
  const files = await fs.readdir(articlesDir);

  const articles = await Promise.all(
    files.map(async (file) => {
      const rawContent = await fs.readFile(path.join(articlesDir, file), 'utf-8');
      const { data, content } = matter(rawContent); // Capture content here
      const match = file.match(/Article(\d+)\.md$/);
      const id = match ? match[1] : file;
      return {
        id,
        title: data.title || 'Untitled',
        date: data.date || '1970-01-01',
        index: data.index || 0,
        content: content, // Pass content to client
      };
    })
  );

  return { articles };
};