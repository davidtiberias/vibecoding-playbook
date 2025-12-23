import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

// Example: import one article
import Article001 from "../articles/Article001.md?raw";

const Articles: React.FC = () => {
  const [selected, setSelected] = useState<string>("001");

  const articles: Record<string, string> = {
    "001": Article001,
    // Add more imports here as you add files
    // '002': Article002,
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Vibecoding Articles</h2>

      {/* Simple selector */}
      <div className="flex gap-4 mb-6">
        {Object.keys(articles).map((id) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`px-3 py-1 rounded ${selected === id ? "bg-indigo-600 text-white" : "bg-slate-100"
              }`}
          >
            Article {id}
          </button>
        ))}
      </div>

      {/* Render markdown */}
      <div className="prose max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{articles[selected]}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Articles;
