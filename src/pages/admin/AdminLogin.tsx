import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Lock, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const { loginAdmin } = useAppContext();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = loginAdmin(password);
    
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Password salah. Silakan coba lagi.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#135A62] text-white rounded-full flex items-center justify-center mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Akses Admin</h1>
          <p className="text-gray-500 text-sm mt-2 text-center">
            Silakan masukkan password admin Anda.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
              placeholder="Masukkan password admin"
              required
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              <AlertCircle size={18} className="flex-none mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 px-4 bg-[#135A62] hover:bg-[#0f4c5c] text-white font-bold rounded-lg transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
