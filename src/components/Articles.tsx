// src/components/Articles.tsx
import React, { useState, useMemo } from "react";
import { usePageContext } from '../../renderer/usePageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const toSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const Articles: React.FC = () => {
  const pageContext = usePageContext();
  // We no longer need the fallback here
  const articles = pageContext.data?.articles;

  const [sortKey, setSortKey] = useState<"index" | "date" | "title">("index");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const sortedArticles = useMemo(() => {
    // --- FIX: Move the fallback logic inside useMemo ---
    const articlesToUse = articles || []; 
    const sorted = [...articlesToUse].sort((a, b) => {
      if (sortKey === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortKey === "title") return a.title.localeCompare(b.title);
      return a.index - b.index;
    });
    return sortOrder === "desc" ? sorted.reverse() : sorted;
  }, [articles, sortKey, sortOrder]);

  // --- FIX START ---
  // REMOVED the problematic useEffect.
  
  // Instead, we derive the ID to use for this render.
  // If the user has made a selection (`selectedArticleId` is not null), we use it.
  // Otherwise, we fall back to the first article in the sorted list.
  const effectiveSelectedId = selectedArticleId ?? (sortedArticles.length > 0 ? sortedArticles[0].id : null);
  // --- FIX END ---

  const selectedArticleIndex = useMemo(
    () => sortedArticles.findIndex(a => a.id === effectiveSelectedId),
    [sortedArticles, effectiveSelectedId]
  );

  const selectedArticle = sortedArticles[selectedArticleIndex];
  const prevArticle = selectedArticleIndex > 0 ? sortedArticles[selectedArticleIndex - 1] : null;
  const nextArticle = selectedArticleIndex < sortedArticles.length - 1 ? sortedArticles[selectedArticleIndex + 1] : null;

  const sortOptions: { key: 'index' | 'date' | 'title'; label: string }[] = [
    { key: 'index', label: 'Index' },
    { key: 'date', label: 'Date' },
    { key: 'title', label: 'Title' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 animate-fade-in w-full relative">
      {/* Left Column: List (1/3 width) */}
      <div className="w-full lg:w-1/3 lg:shrink-0">
        <div className="sticky top-24 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Articles</h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Deep dives into the philosophy, mechanics, and future of Vibecoding.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Library Sort
                </label>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-100 p-1 rounded-lg border border-slate-200 grid grid-cols-3 gap-1">
                {sortOptions.map(option => (
                  <button
                    key={option.key}
                    onClick={() => setSortKey(option.key)}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all text-center ${
                      sortKey === option.key
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-indigo-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
                className="w-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-indigo-600 transition-colors shadow-sm flex items-center justify-center"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <span className="material-symbols-outlined text-lg transition-transform duration-300 transform">
                  {sortOrder === 'asc' ? 'arrow_downward' : 'arrow_upward'}
                </span>
              </button>
            </div>
          </div>

          <div className="relative max-h-[calc(100vh-20rem)] overflow-y-auto pr-2 space-y-3">
              {sortedArticles.map((article) => {
                const isSelected = effectiveSelectedId === article.id;
                return (
                  <button
                    key={article.id}
                    onClick={() => {
                        setSelectedArticleId(article.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group w-full flex items-start gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                      isSelected
                        ? "bg-white shadow-xl shadow-indigo-100 ring-1 ring-indigo-100 translate-x-1"
                        : "hover:bg-slate-100/80 hover:translate-x-1"
                    }`}
                  >
                    <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 transition-all duration-300 ${
                        isSelected
                        ? "bg-indigo-600 border-indigo-600 text-white scale-110 shadow-indigo-200"
                        : "bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500"
                    }`}>
                        <span className="material-symbols-outlined text-xl">article</span>
                    </div>

                    <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`}>
                                Article {String(article.index).padStart(2, '0')}
                            </span>
                        </div>
                        <h3 className={`font-bold text-sm leading-snug transition-colors mb-1 ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                            {article.title}
                        </h3>
                        <p className={`text-[10px] font-medium transition-colors ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`}>
                            {new Date(article.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                    </div>

                    {isSelected && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 self-center" />
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </div>

      {/* Right Column: Content (2/3 width) */}
      <div className="w-full lg:w-2/3 min-w-0">
        {selectedArticle ? (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 animate-fade-in sticky top-24">
             
             {/* Header Section */}
             <div className="p-8 lg:p-10 bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-[10px] font-bold uppercase tracking-[0.2em] border border-indigo-500/20">
                            {new Date(selectedArticle.date).toLocaleDateString()}
                        </span>
                    </div>
                    
                    <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight leading-tight mb-6">
                        {selectedArticle.title}
                    </h1>

                    <div className="flex flex-wrap gap-3">
                         <a 
                            href={`/vibecoding-playbook/articles/${toSlug(selectedArticle.title)}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-white text-slate-900 hover:bg-indigo-50 transition-colors"
                        >
                            <span className="material-symbols-outlined text-lg">open_in_new</span>
                            Open Standalone
                        </a>
                    </div>
                </div>
                
                <div className="absolute -right-12 -bottom-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -left-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
             </div>

            {/* Content Body */}
            <div className="p-8 lg:p-12">
               <div className="prose max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-2xl prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                     {selectedArticle.content}
                  </ReactMarkdown>
               </div>

               {/* Bottom Navigation */}
               <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                  {prevArticle ? (
                    <button
                      onClick={() => {
                        setSelectedArticleId(prevArticle.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-hover:text-indigo-500">Previous Article</span>
                      <span className="font-bold text-slate-700 group-hover:text-indigo-700 line-clamp-1">{prevArticle.title}</span>
                    </button>
                  ) : <div className="flex-1" />}

                  {nextArticle ? (
                    <button
                      onClick={() => {
                        setSelectedArticleId(nextArticle.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-right group"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-hover:text-indigo-500">Next Article</span>
                      <span className="font-bold text-slate-700 group-hover:text-indigo-700 line-clamp-1">{nextArticle.title}</span>
                    </button>
                  ) : <div className="flex-1" />}
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-[500px] border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center group bg-white/50">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ring-4 ring-slate-100">
                <span className="material-symbols-outlined text-slate-400 text-4xl">library_books</span>
            </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">Select an Article</h3>
             <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                Choose an entry from the library on the left to begin reading.
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;