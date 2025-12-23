// src/components/Articles.tsx

import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import matter from "gray-matter";

// Define a type for our article objects
interface Article {
  id: string;
  title: string;
  date: string;
  index: number;
  content: string;
}

// Vite's glob import for raw markdown content
const articleModules = import.meta.glob("../articles/*.md", {
  eager: true,
  query: '?raw',
  import: 'default',
});

const Articles: React.FC = () => {
  // Use useMemo to parse articles only once, preventing Buffer errors.
  const articles = useMemo((): Article[] => {
    return Object.entries(articleModules).map(([path, rawContent]) => {
      const { data, content } = matter(rawContent);
      const match = path.match(/Article(\d+)\.md$/);
      const id = match ? match[1] : path;
      return {
        id,
        title: data.title || "Untitled",
        date: data.date || "1970-01-01",
        index: data.index || 0,
        content,
      };
    });
  }, []);

  const [sortKey, setSortKey] = useState<"index" | "date" | "title">("index");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort articles based on user selection
  const sortedArticles = useMemo(() => {
    const sorted = [...articles].sort((a, b) => {
      if (sortKey === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortKey === "title") return a.title.localeCompare(b.title);
      return a.index - b.index;
    });
    return sortOrder === "desc" ? sorted.reverse() : sorted;
  }, [articles, sortKey, sortOrder]);

  const [selectedId, setSelectedId] = useState<string | null>(
    sortedArticles.length > 0 ? sortedArticles[0].id : null
  );

  const selectedArticle = sortedArticles.find(
    (article) => article.id === selectedId
  );

  // A helper array for creating the sort buttons cleanly
  const sortOptions: { key: 'index' | 'date' | 'title'; label: string }[] = [
    { key: 'index', label: 'Index' },
    { key: 'date', label: 'Date' },
    { key: 'title', label: 'Title' },
  ];

  return (
    <> {/* Wrap in a fragment */}
      {selectedArticle && (
        <title>{selectedArticle.title} - Vibecoding Playbook</title>
      )}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* --- Left Column: Sidebar --- */}
        <aside className="w-full lg:w-1/3 xl:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Articles</h2>
              <p className="text-sm text-slate-500 mt-1">Select an article to read.</p>
            </div>

            {/* NEW: Beautiful Sorting Controls */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Sort by
              </label>
              <div className="flex gap-2">
                {/* Custom buttons for sort key */}
                <div className="flex-1 bg-slate-100 p-1 rounded-lg border border-slate-200 grid grid-cols-3 gap-1">
                  {sortOptions.map(option => (
                    <button
                      key={option.key}
                      onClick={() => setSortKey(option.key)}
                      className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all text-center ${sortKey === option.key
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:text-indigo-600"
                        }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {/* Icon button for sort order */}
                <button
                  onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                  className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-indigo-600 transition-colors shadow-sm flex items-center "
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
                >
                  <span className="material-symbols-outlined transition-transform duration-300 transform">
                    {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
                  </span>
                </button>
              </div>
            </div>

            {/* NEW: Article List with independent scroll */}
            <div className="relative max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
              <nav className="flex flex-col gap-2">
                {sortedArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedId(article.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 ${selectedId === article.id
                      ? "bg-white border-indigo-500 shadow-lg shadow-indigo-100"
                      : "bg-white border-transparent hover:border-slate-200 hover:bg-slate-50"
                      }`}
                  >
                    <p className="font-bold text-slate-800">{article.title}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Published: {new Date(article.date).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* --- Right Column: Article Content --- */}
        <main className="w-full lg:flex-1 bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 min-h-[60vh] lg:max-h-[calc(100vh-7.5rem)] lg:overflow-y-auto">
          {selectedArticle ? (
            <div className="prose max-w-none p-8 lg:p-12">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selectedArticle.content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-8">
              <div>
                <h3 className="text-xl font-bold text-slate-800">No Articles Found</h3>
                <p className="text-slate-500 mt-2">Add markdown files to the <code>src/articles</code> directory.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Articles;