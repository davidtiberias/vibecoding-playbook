// scripts/generateSitemap.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://davidtiberias.github.io/vibecoding-playbook";
const ARTICLES_DIR = path.resolve(__dirname, '../src/articles');
const DIST_DIR = path.resolve(__dirname, '../dist/client');

// Static routes defined in your app
const staticRoutes = [
    '',
    '/workflow-map',
    '/invariants',
    '/analysis',
    '/strategy',
    '/articles'
];

const generateSitemap = () => {
    console.log('🗺️  Generating Sitemap...');

    // 1. Get Article Routes
    const files = fs.readdirSync(ARTICLES_DIR);
    const articleRoutes = files
        .filter(file => file.endsWith('.md'))
        .map(file => {
            const content = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
            const { data } = matter(content);
            const slug = data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
            return `/articles/${slug}`;
        });

    // 2. Combine All Routes
    const allRoutes = [...staticRoutes, ...articleRoutes];

    // 3. Build XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(route => `  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    // 4. Write to dist
    if (!fs.existsSync(DIST_DIR)) {
        console.error('❌ Dist directory not found. Run build first.');
        process.exit(1);
    }

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemap);
    console.log(`✅ Sitemap generated at ${path.join(DIST_DIR, 'sitemap.xml')}`);
};

generateSitemap();