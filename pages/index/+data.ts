// pages/index/+data.ts
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export const data = async () => {
  const articlesDir = path.resolve(process.cwd(), 'src/articles');
  const files = (await fs.readdir(articlesDir)).filter(f => f.endsWith('.md'));

  const articles = await Promise.all(
    files.map(async (file) => {
      const rawContent = await fs.readFile(path.join(articlesDir, file), 'utf-8');
      const { data, content } = matter(rawContent);
      return {
        id: file.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date || '1970-01-01',
        time: data.time || '00:00',
        content,
      };
    })
  );

  // Sort by date and time
  articles.sort((a, b) => {
    const dtA = new Date(`${a.date}T${a.time}`);
    const dtB = new Date(`${b.date}T${b.time}`);
    return dtA.getTime() - dtB.getTime();
  });

  // Assign index based on sorted position
  const articlesWithIndex = articles.map((a, i) => ({
    ...a,
    index: i + 1
  }));

  return { articles: articlesWithIndex };
};