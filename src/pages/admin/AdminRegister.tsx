import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { UserPlus, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminRegister() {
  const { registerAdmin } = useAppContext();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [accessCode, setAccessCode] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const validatePassword = (pass: string) => {
    // 8 chars, 1 uppercase, alphanumeric
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handleAccessCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (accessCode === 'dear2226') {
      setStep(2);
    } else {
      setError('Kode akses salah.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Konfirmasi password tidak cocok.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password harus minimal 8 karakter, mengandung huruf, angka, dan minimal satu huruf kapital.');
      return;
    }

    registerAdmin(password);
    navigate('/admin/dashboard');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 w-full">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        
        {step === 1 ? (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-[#135A62] text-white rounded-full flex items-center justify-center mb-4">
                <KeyRound size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Kode Akses Manager</h1>
              <p className="text-gray-500 text-sm mt-2 text-center">
                Masukkan kode akses untuk melanjutkan pendaftaran admin.
              </p>
            </div>

            <form onSubmit={handleAccessCode} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kode Akses</label>
                <input 
                  type="password" 
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  placeholder="Masukkan kode akses manager"
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
                Lanjut
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-[#135A62] text-white rounded-full flex items-center justify-center mb-4">
                <UserPlus size={32} />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Registrasi Admin</h1>
              <p className="text-gray-500 text-sm mt-2 text-center">
                Buat kredensial admin pertama Anda. Password harus memiliki minimal 8 karakter dengan kombinasi angka dan minimal satu huruf kapital.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password Baru</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  placeholder="Masukkan password admin"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Password</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  placeholder="Ulangi password admin"
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
                Daftarkan Admin
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
