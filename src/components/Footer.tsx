import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Footer() {
  const { settings } = useAppContext();
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Logo Terbesar */}
          {settings.logoUrl && (
            <div className="w-full lg:w-1/3 xl:w-2/5 flex-shrink-0">
              <img 
                src={settings.logoUrl} 
                alt={settings.storeName} 
                className="w-full h-auto object-contain bg-white/5 p-4 rounded-xl shadow-inner max-h-[350px]" 
              />
            </div>
          )}

          {/* Kolom Teks Menyesuaikan di Samping */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              {!settings.logoUrl ? (
                <h3 className="text-2xl font-bold text-white mb-4">{settings.storeName}</h3>
              ) : (
                <h4 className="text-lg font-bold text-white mb-4">Tentang Kami</h4>
              )}
              <p className="text-gray-400 text-sm leading-relaxed">
                Toko online terpercaya untuk segala kebutuhan peralatan listrik, kerja tehnik, dan perlengkapan rumah tangga Anda.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Tautan</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-emerald-400">Beranda</Link></li>
                <li><Link to="/categories" className="hover:text-emerald-400">Kategori Produk</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400">Tentang Kami</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400">Hubungi Kami</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>WhatsApp: +{settings.whatsappNumber}</li>
                <li>{settings.contactText}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {settings.storeName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
