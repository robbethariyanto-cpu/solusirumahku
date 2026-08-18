import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { TrendingUp, Search, History } from 'lucide-react';

export default function Trends() {
  const { trends } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrends = useMemo(() => {
    if (!trends) return [];
    return trends.filter(trend => 
      trend.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trend.date.includes(searchQuery)
    );
  }, [trends, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-500 w-8 h-8" />
          <h1 className="text-3xl font-bold text-gray-900">Info & Trend</h1>
        </div>
        
        {/* Fitur Riwayat / Pencarian */}
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#135A62] sm:text-sm transition duration-150 ease-in-out"
            placeholder="Cari riwayat info & trend..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {(!trends || trends.length === 0) ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
          <TrendingUp className="mx-auto h-16 w-16 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Belum ada info atau trend terbaru.</p>
        </div>
      ) : (
        <>
          {searchQuery && (
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <History className="w-5 h-5" />
              <span>Menampilkan riwayat pencarian untuk <strong>"{searchQuery}"</strong></span>
            </div>
          )}
          
          {filteredTrends.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">Tidak ada riwayat info yang cocok dengan pencarian Anda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTrends.map(trend => (
                <Link key={trend.id} to={`/trend/${trend.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col group">
                  {trend.mediaUrl && (
                    <div className="h-64 bg-gray-100 relative shrink-0">
                      {trend.mediaType === 'video' ? (
                        <video src={trend.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={trend.mediaUrl} alt={trend.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-sm font-semibold text-[#135A62] mb-3">{trend.date}</div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#135A62] transition-colors">{trend.title}</h3>
                    <p className="text-gray-600 leading-relaxed line-clamp-4">{trend.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
