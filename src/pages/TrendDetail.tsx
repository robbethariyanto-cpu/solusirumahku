import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ChevronLeft, Calendar } from 'lucide-react';

export default function TrendDetail() {
  const { trendId } = useParams();
  const { trends } = useAppContext();
  
  const trend = useMemo(() => {
    return trends?.find(t => t.id === trendId);
  }, [trends, trendId]);

  if (!trend) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Info/Trend tidak ditemukan</h2>
        <Link to="/trends" className="text-[#135A62] hover:underline">Kembali ke Info & Trend</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <Link to="/trends" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#135A62] transition-colors mb-8">
        <ChevronLeft size={20} /> Kembali ke daftar Info & Trend
      </Link>
      
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {trend.mediaUrl && (
          <div className="w-full bg-gray-50 aspect-video relative">
            {trend.mediaType === 'video' ? (
              <video 
                src={trend.mediaUrl} 
                controls
                autoPlay 
                loop 
                playsInline 
                className="w-full h-full object-cover" 
              />
            ) : (
              <img 
                src={trend.mediaUrl} 
                alt={trend.title} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
        )}
        
        <div className="p-8 md:p-12">
          <div className="flex items-center gap-2 text-sm font-medium text-[#135A62] mb-4">
            <Calendar size={16} />
            <time>{trend.date}</time>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
            {trend.title}
          </h1>
          
          <div className="prose prose-emerald max-w-none text-gray-700">
            <p className="whitespace-pre-line leading-relaxed text-lg">
              {trend.description}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
