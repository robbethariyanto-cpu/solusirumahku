import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Phone, MessageCircle } from 'lucide-react';

export default function Contact() {
  const { settings } = useAppContext();

  const handleWA = () => {
    window.open(`https://wa.me/${settings.whatsappNumber}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
        <div className="w-16 h-16 bg-emerald-50 text-[#135A62] rounded-full flex items-center justify-center mx-auto mb-6">
          <Phone size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Hubungi Kami</h1>
        
        <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">
          {settings.contactText}
        </p>

        <button 
          onClick={handleWA}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors shadow-sm"
        >
          <MessageCircle size={24} />
          Chat via WhatsApp
        </button>
      </div>
    </div>
  );
}
