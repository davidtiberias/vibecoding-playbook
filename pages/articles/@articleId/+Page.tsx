// pages/articles/@articleId/+Page.tsx
import React from 'react';
import { usePageContext } from '../../../renderer/usePageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticlePage: React.FC = () => {
  const pageContext = usePageContext();
  const article = pageContext.data?.article;
  const prevArticle = pageContext.data?.prevArticle;
  const nextArticle = pageContext.data?.nextArticle;

  if (!article) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-slate-800">Article Not Found</h1>
          <p className="text-slate-500 mt-2">The requested article could not be loaded.</p>
          <a href="/vibecoding-playbook/" className="text-indigo-600 font-semibold mt-4 block">
            &larr; Back to Vibecoding Playbook
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{`${article.title} - Vibecoding Playbook`}</title>
      <meta name="description" content={`An article from the Vibecoding Playbook titled: ${article.title}.`} />

      <div className="bg-slate-50 min-h-screen py-12 px-4">
        <main className="max-w-4xl mx-auto">
          {/* Back Button */}
          <a href="/vibecoding-playbook/" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-semibold mb-8 transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Vibecoding Playbook
          </a>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
             {/* Header */}
             <div className="p-8 lg:p-12 bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-[10px] font-bold uppercase tracking-[0.2em] border border-indigo-500/20">
                            {new Date(article.date).toLocaleDateString()}
                        </span>
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                        {article.title}
                    </h1>
                </div>
                <div className="absolute -right-12 -bottom-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
                <div className="absolute -left-12 -top-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl" />
             </div>

             {/* Content */}
             <div className="p-8 lg:p-12">
                <div className="prose max-w-none prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-600 prose-img:rounded-2xl prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {article.content}
                  </ReactMarkdown>
                </div>

                {/* Bottom Navigation */}
                <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between gap-4">
                  {prevArticle ? (
                    <a
                      href={`/vibecoding-playbook/articles/${prevArticle.slug}`}
                      className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-hover:text-indigo-500">Previous Article</span>
                      <span className="font-bold text-slate-700 group-hover:text-indigo-700 line-clamp-1">{prevArticle.title}</span>
                    </a>
                  ) : <div className="flex-1" />}

                  {nextArticle ? (
                    <a
                      href={`/vibecoding-playbook/articles/${nextArticle.slug}`}
                      className="flex-1 p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all text-right group"
                    >
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block group-hover:text-indigo-500">Next Article</span>
                      <span className="font-bold text-slate-700 group-hover:text-indigo-700 line-clamp-1">{nextArticle.title}</span>
                    </a>
                  ) : <div className="flex-1" />}
               </div>
             </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ArticlePage;