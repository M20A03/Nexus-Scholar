import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Quote, Download } from 'lucide-react';
// import MiniGraph from '../components/MiniGraph'; // We'll add this later if needed

export default function PaperDetail() {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:4000/api/papers/${id}`)
      .then(res => res.json())
      .then(data => {
        setPaper(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto p-10 text-center text-slate-500">Loading publication details...</div>;
  }

  if (!paper || paper.error) {
    return <div className="max-w-5xl mx-auto p-10 text-center text-red-500">Publication not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <Link to="/search" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft size={16} /> Back to Publications
      </Link>

      <div className="academic-card p-8 md:p-10">
        <div className="flex gap-2 mb-4">
          <span className="badge badge-department">{paper.year || new Date(paper.publishedAt).getFullYear()}</span>
          {paper.doi && <span className="badge badge-concept">DOI: {paper.doi}</span>}
        </div>
        
        <h1 className="academic-title text-3xl md:text-4xl mb-6 leading-tight">
          {paper.title}
        </h1>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 border-b border-slate-100 pb-8">
          {paper.authors?.map((author: any) => (
            <div key={author.id} className="flex flex-col">
              <span className="font-semibold text-blue-700">{author.name}</span>
              {author.department && <span className="text-xs text-slate-500">{author.department}</span>}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
              <BookOpen size={16} className="text-slate-400" /> Abstract
            </h3>
            <p className="text-slate-700 leading-relaxed text-justify">
              {paper.abstract || "No abstract available."}
            </p>
          </div>
        </div>

        {paper.pdfUrl && (
          <div className="mt-10">
            <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center gap-2">
              <Download size={16} /> Download Full Text (PDF)
            </a>
          </div>
        )}
      </div>

      {/* Citation Graph Section could go here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="academic-card p-6">
          <h3 className="font-serif font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <Quote size={18} className="text-slate-400" /> References ({paper.citationsTo?.length || 0})
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
             {paper.citationsTo?.length > 0 ? (
               paper.citationsTo.map((citation: any) => (
                 <li key={citation.id} className="border-b border-slate-100 pb-2 last:border-0">
                   <Link to={`/papers/${citation.targetPaper.id}`} className="hover:text-blue-600">
                     {citation.targetPaper.title}
                   </Link>
                 </li>
               ))
             ) : (
               <li className="italic text-slate-400">No references recorded.</li>
             )}
          </ul>
        </div>
        <div className="academic-card p-6">
          <h3 className="font-serif font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <Quote size={18} className="text-slate-400" /> Cited By ({paper.citationsFrom?.length || 0})
          </h3>
          <ul className="space-y-3 text-sm text-slate-600">
             {paper.citationsFrom?.length > 0 ? (
               paper.citationsFrom.map((citation: any) => (
                 <li key={citation.id} className="border-b border-slate-100 pb-2 last:border-0">
                   <Link to={`/papers/${citation.sourcePaper.id}`} className="hover:text-blue-600">
                     {citation.sourcePaper.title}
                   </Link>
                 </li>
               ))
             ) : (
               <li className="italic text-slate-400">No citations recorded yet.</li>
             )}
          </ul>
        </div>
      </div>
    </div>
  );
}
