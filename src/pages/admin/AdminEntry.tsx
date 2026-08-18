import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserPlus } from 'lucide-react';

export default function AdminEntry() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Portal Admin</h1>
        <p className="text-gray-500 text-sm mb-8">
          Pilih metode masuk untuk mengelola toko.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/admin/login"
            className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-[#135A62] hover:bg-[#0f4c5c] text-white font-bold rounded-lg transition-colors"
          >
            <User size={20} />
            Masuk
          </Link>
          
          <Link 
            to="/admin/register"
            className="w-full flex items-center justify-center gap-2 py-4 px-4 bg-white border-2 border-[#135A62] text-[#135A62] hover:bg-emerald-50 font-bold rounded-lg transition-colors"
          >
            <UserPlus size={20} />
            Daftar (akses manager only)
          </Link>
        </div>
      </div>
    </div>
  );
}
