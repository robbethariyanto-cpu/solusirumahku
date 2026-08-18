import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Info } from 'lucide-react';

export default function About() {
  const { settings } = useAppContext();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center mb-12">
        <div className="w-16 h-16 bg-emerald-50 text-[#135A62] rounded-full flex items-center justify-center mx-auto mb-6">
          <Info size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tentang {settings.storeName}</h1>
        <div className="prose prose-emerald mx-auto text-gray-600">
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {settings.aboutText}
          </p>
        </div>
      </div>

      {settings.profileMedia && settings.profileMedia.length > 0 && (
        <div className="space-y-16">
          {settings.profileMedia.map((media) => (
            <div key={media.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="aspect-video bg-gray-50 flex items-center justify-center relative">
                {media.type === 'image' ? (
                  <img 
                    src={media.url} 
                    alt="Profil" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000';
                    }}
                  />
                ) : (
                  <video 
                    src={media.url} 
                    controls 
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              {media.description && (
                <div className="p-8 text-center">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {media.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
