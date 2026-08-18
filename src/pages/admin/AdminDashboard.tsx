import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Settings, Tag, Package, LogOut, Plus, Trash2, Edit2, AlertTriangle, ArrowUp, ArrowDown, Image as ImageIcon, X, TrendingUp } from 'lucide-react';
import { Product, Category, TrendInfo } from '../../types';

import ProfilManager from './ProfilManager';

export default function AdminDashboard() {
  const { 
    isAdmin, logoutAdmin, settings, updateSettings,
    categories, addCategory, updateCategory, deleteCategory, reorderCategories,
    products, addProduct, updateProduct, deleteProduct, reorderProducts,
    trends, addTrend, updateTrend, deleteTrend
  } = useAppContext();
  
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'tampilan' | 'profil' | 'kategori' | 'produk' | 'trend'>('tampilan');

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* Admin Sidebar */}
      <div className="w-full md:w-64 flex-none space-y-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
          <h2 className="font-bold text-gray-900 px-2 mb-4">Menu Admin</h2>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('tampilan')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'tampilan' ? 'bg-[#135A62] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings size={18} /> Tampilan & Info
            </button>
            <button 
              onClick={() => setActiveTab('profil')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profil' ? 'bg-[#135A62] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <ImageIcon size={18} /> Profil & Galeri
            </button>
            <button 
              onClick={() => setActiveTab('kategori')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'kategori' ? 'bg-[#135A62] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Tag size={18} /> Kategori Produk
            </button>
            <button 
              onClick={() => setActiveTab('produk')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'produk' ? 'bg-[#135A62] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Package size={18} /> Daftar Produk
            </button>
            <button 
              onClick={() => setActiveTab('trend')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'trend' ? 'bg-[#135A62] text-white' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <TrendingUp size={18} /> Info & Trend
            </button>
          </nav>
        </div>
        
        <button 
          onClick={() => {
            logoutAdmin();
            navigate('/');
          }}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium text-red-600 bg-white border border-red-100 hover:bg-red-50 transition-colors shadow-sm"
        >
          <LogOut size={18} /> Keluar
        </button>

        {/* Low Stock Alert */}
        <div className="mt-8 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <h3 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
            <AlertTriangle size={18} /> Peringatan Stok
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            {products.filter(p => p.stock < 10).map(p => (
              <li key={p.id}>• {p.name} (Sisa: {p.stock})</li>
            ))}
            {products.filter(p => p.stock < 10).length === 0 && (
              <li>Semua stok aman.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
        {activeTab === 'tampilan' && <TampilanSettings settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'profil' && <ProfilManager settings={settings} updateSettings={updateSettings} />}
        {activeTab === 'kategori' && <KategoriManager categories={categories} addCategory={addCategory} updateCategory={updateCategory} deleteCategory={deleteCategory} reorderCategories={reorderCategories} />}
        {activeTab === 'produk' && <ProdukManager products={products} categories={categories} addProduct={addProduct} updateProduct={updateProduct} deleteProduct={deleteProduct} reorderProducts={reorderProducts} />}
        {activeTab === 'trend' && <TrendManager trends={trends} addTrend={addTrend} updateTrend={updateTrend} deleteTrend={deleteTrend} />}
      </div>
    </div>
  );
}

// Subcomponents for Admin Dashboard Tabs
function TampilanSettings({ settings, updateSettings }: any) {
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);
  const { changeAdminPassword } = useAppContext();
  
  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const validatePassword = (pass: string) => {
    // 8 chars, 1 uppercase, alphanumeric
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pass);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Konfirmasi password tidak cocok.');
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError('Password harus minimal 8 karakter, mengandung huruf, angka, dan minimal satu huruf kapital.');
      return;
    }

    const success = changeAdminPassword(oldPassword, newPassword);
    
    if (success) {
      setPasswordSuccess('Password berhasil diubah!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setIsChangingPassword(false), 2000);
    } else {
      setPasswordError('Password lama salah.');
    }
  };

  const handleImageUpload = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'heroMediaUrl') {
          setFormData({ ...formData, [field]: reader.result, heroMediaType: isVideo ? 'video' : 'image' });
        } else {
          setFormData({ ...formData, [field]: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Pengaturan Tampilan & Info</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Aplikasi</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 relative min-h-[120px]">
              {formData.logoUrl ? (
                <>
                  <img src={formData.logoUrl} alt="Logo Preview" className="max-h-16 object-contain mb-2 rounded" />
                  <button type="button" onClick={() => setFormData({...formData, logoUrl: ''})} className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded shadow-sm hover:bg-red-50"><Trash2 size={16} /></button>
                </>
              ) : (
                <div className="text-center text-gray-500 text-sm">Upload Logo (Image)</div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload('logoUrl')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Background Dasar</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 relative min-h-[120px]">
              {formData.backgroundUrl ? (
                <>
                  <img src={formData.backgroundUrl} alt="Background Preview" className="max-h-16 object-cover mb-2 rounded w-full" />
                  <button type="button" onClick={() => setFormData({...formData, backgroundUrl: ''})} className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded shadow-sm hover:bg-red-50"><Trash2 size={16} /></button>
                </>
              ) : (
                <div className="text-center text-gray-500 text-sm">Upload Background</div>
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload('backgroundUrl')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Utama / Video (Hero Banner)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 relative min-h-[160px]">
            {formData.heroMediaUrl ? (
              <>
                {formData.heroMediaType === 'video' ? (
                  <video src={formData.heroMediaUrl} autoPlay loop muted playsInline className="max-h-32 object-cover mb-2 rounded" />
                ) : (
                  <img src={formData.heroMediaUrl} alt="Hero Preview" className="max-h-32 object-cover mb-2 rounded" />
                )}
                <button type="button" onClick={() => setFormData({...formData, heroMediaUrl: '', heroMediaType: 'image'})} className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded shadow-sm hover:bg-red-50"><Trash2 size={16} /></button>
              </>
            ) : (
              <div className="text-center text-gray-500 text-sm">Upload GIF, Video Pendek, atau Gambar (Max 5MB)</div>
            )}
            <input type="file" accept="image/*,video/mp4,video/webm" onChange={handleImageUpload('heroMediaUrl')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nama Toko</label>
          <input 
            type="text" 
            value={formData.storeName}
            onChange={e => setFormData({...formData, storeName: e.target.value})}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp (Tanpa +, contoh: 62812...)</label>
          <input 
            type="text" 
            value={formData.whatsappNumber}
            onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teks Tentang Kami (Konteks Aplikasi)</label>
          <textarea 
            value={formData.aboutText}
            onChange={e => setFormData({...formData, aboutText: e.target.value})}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] h-32"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Teks Hubungi Kami</label>
          <textarea 
            value={formData.contactText}
            onChange={e => setFormData({...formData, contactText: e.target.value})}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] h-24"
          />
        </div>
        <button type="submit" className="py-2 px-6 bg-[#135A62] text-white font-medium rounded-lg hover:bg-[#0f4c5c] transition-colors">
          {saved ? 'Tersimpan!' : 'Simpan Perubahan'}
        </button>
      </form>

      {/* Password Management */}
      <div className="mt-12 pt-10 border-t border-gray-100 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          Keamanan Akun
        </h2>
        
        {!isChangingPassword ? (
          <button 
            onClick={() => setIsChangingPassword(true)}
            className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Ubah Password Admin
          </button>
        ) : (
          <form onSubmit={handlePasswordChange} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
            <h3 className="font-bold text-gray-900 mb-2">Form Ubah Password</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Lama</label>
              <input 
                type="password" 
                required
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
              <input 
                type="password" 
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
              />
              <p className="text-xs text-gray-500 mt-1">Min. 8 karakter, kombinasi huruf, angka, & huruf kapital.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
              <input 
                type="password" 
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
              />
            </div>

            {passwordError && (
              <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                <AlertTriangle size={16} className="flex-none mt-0.5" />
                <p>{passwordError}</p>
              </div>
            )}

            {passwordSuccess && (
              <div className="text-green-600 bg-green-50 p-3 rounded-lg text-sm font-medium">
                {passwordSuccess}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button 
                type="submit" 
                className="py-2 px-6 bg-[#135A62] text-white font-medium rounded-lg hover:bg-[#0f4c5c] transition-colors"
              >
                Simpan Password Baru
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setIsChangingPassword(false);
                  setPasswordError('');
                  setPasswordSuccess('');
                }}
                className="py-2 px-6 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function KategoriManager({ categories, addCategory, updateCategory, deleteCategory, reorderCategories }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState('');

  const handleAdd = () => {
    if (newCat.trim()) {
      addCategory({ id: Date.now().toString(), name: newCat });
      setNewCat('');
      setIsAdding(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newCats = [...categories];
    const temp = newCats[index - 1];
    newCats[index - 1] = newCats[index];
    newCats[index] = temp;
    reorderCategories(newCats);
  };

  const moveDown = (index: number) => {
    if (index === categories.length - 1) return;
    const newCats = [...categories];
    const temp = newCats[index + 1];
    newCats[index + 1] = newCats[index];
    newCats[index] = temp;
    reorderCategories(newCats);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Kategori</h2>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-[#135A62] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f4c5c]">
          <Plus size={16} /> Tambah
        </button>
      </div>

      {isAdding && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center gap-4">
          <input 
            type="text" 
            placeholder="Nama Kategori Baru"
            value={newCat}
            onChange={e => setNewCat(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
          />
          <button onClick={handleAdd} className="bg-[#135A62] text-white px-4 py-2 rounded-lg font-medium">Simpan</button>
          <button onClick={() => setIsAdding(false)} className="text-gray-500 font-medium">Batal</button>
        </div>
      )}

      <div className="space-y-3">
        {categories.map((c: Category, index: number) => (
          <div key={c.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            <span className="font-medium">{c.name}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => moveUp(index)} 
                disabled={index === 0}
                className="text-gray-500 p-2 hover:bg-gray-200 rounded-lg disabled:opacity-30"
                title="Pindah ke Atas"
              >
                <ArrowUp size={18} />
              </button>
              <button 
                onClick={() => moveDown(index)} 
                disabled={index === categories.length - 1}
                className="text-gray-500 p-2 hover:bg-gray-200 rounded-lg disabled:opacity-30"
                title="Pindah ke Bawah"
              >
                <ArrowDown size={18} />
              </button>
              <button onClick={() => deleteCategory(c.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-lg ml-2"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProdukManager({ products, categories, addProduct, updateProduct, deleteProduct, reorderProducts }: any) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newProducts = [...products];
    const temp = newProducts[index - 1];
    newProducts[index - 1] = newProducts[index];
    newProducts[index] = temp;
    reorderProducts(newProducts);
  };

  const moveDown = (index: number) => {
    if (index === products.length - 1) return;
    const newProducts = [...products];
    const temp = newProducts[index + 1];
    newProducts[index + 1] = newProducts[index];
    newProducts[index] = temp;
    reorderProducts(newProducts);
  };

  const openAddForm = () => {
    setCurrentProduct({
      id: Date.now().toString(),
      name: '',
      brand: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      price: 0,
      stock: 0,
      description: '',
      specs: [],
      image: '',
      images: ['', '', '', '', ''],
      packingQuantity: 1,
      packingUnit: 'Pieces'
    });
    setIsEditing(true);
  };

  const openEditForm = (product: Product) => {
    // Pastikan product.images ada atau gunakan gambar lama di urutan pertama
    const initialImages = product.images ? [...product.images] : (product.image ? [product.image] : []);
    // Lengkapi menjadi 5 slot array
    while (initialImages.length < 5) initialImages.push('');

    setCurrentProduct({ 
      ...product, 
      specs: [...product.specs],
      images: initialImages
    });
    setIsEditing(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    // Validate minimally
    if (!currentProduct.name || !currentProduct.categoryId) {
      alert("Nama dan Kategori wajib diisi");
      return;
    }

    // Fix images array by removing empty ones, and set the first one as primary `image`
    const cleanedImages = currentProduct.images?.filter(img => img.trim() !== '') || [];
    const productToSave = {
      ...currentProduct,
      images: cleanedImages,
      image: cleanedImages[0] || ''
    } as Product;

    const isExisting = products.some((p: Product) => p.id === productToSave.id);
    if (isExisting) {
      updateProduct(productToSave);
    } else {
      addProduct(productToSave);
    }
    setIsEditing(false);
    setCurrentProduct(null);
  };

  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (currentProduct && currentProduct.images) {
          const newImages = [...currentProduct.images];
          newImages[index] = reader.result as string;
          setCurrentProduct({ ...currentProduct, images: newImages });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addSpec = () => {
    if (currentProduct) {
      setCurrentProduct({ ...currentProduct, specs: [...(currentProduct.specs || []), ''] });
    }
  };

  const updateSpec = (index: number, value: string) => {
    if (currentProduct && currentProduct.specs) {
      const newSpecs = [...currentProduct.specs];
      newSpecs[index] = value;
      setCurrentProduct({ ...currentProduct, specs: newSpecs });
    }
  };

  const removeSpec = (index: number) => {
    if (currentProduct && currentProduct.specs) {
      const newSpecs = currentProduct.specs.filter((_, i) => i !== index);
      setCurrentProduct({ ...currentProduct, specs: newSpecs });
    }
  };

  if (isEditing && currentProduct) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{products.some((p: Product) => p.id === currentProduct.id) ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
          <button 
            onClick={() => setIsEditing(false)} 
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSaveProduct} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk *</label>
                <input 
                  type="text" 
                  required
                  value={currentProduct.name}
                  onChange={e => setCurrentProduct({...currentProduct, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Informasi Jumlah Packing *</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={currentProduct.packingQuantity || 1}
                    onChange={e => setCurrentProduct({...currentProduct, packingQuantity: parseInt(e.target.value) || 1})}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Satuan *</label>
                  <select 
                    required
                    value={currentProduct.packingUnit || 'Pieces'}
                    onChange={e => setCurrentProduct({...currentProduct, packingUnit: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  >
                    {['Pieces', 'Roll', 'Slop', 'Renteng', 'Yard', 'Meter', 'Set', 'Unit', 'Lusin', 'Pack', 'Karung', 'Kotak', 'Box/Carton'].map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori *</label>
                <select 
                  required
                  value={currentProduct.categoryId}
                  onChange={e => setCurrentProduct({...currentProduct, categoryId: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                >
                  <option value="" disabled>Pilih Kategori</option>
                  {categories.map((c: Category) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Merek</label>
                <input 
                  type="text" 
                  value={currentProduct.brand}
                  onChange={e => setCurrentProduct({...currentProduct, brand: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Urutan Favorit (1-20, Kosongkan jika bukan favorit)</label>
                <input 
                  type="number"
                  min="1"
                  max="20"
                  value={currentProduct.favoriteRank || ''}
                  onChange={e => setCurrentProduct({...currentProduct, favoriteRank: e.target.value ? parseInt(e.target.value) : undefined})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Misal: 1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp) *</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    value={currentProduct.price}
                    onChange={e => setCurrentProduct({...currentProduct, price: parseInt(e.target.value) || 0})}
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stok (Opsional)</label>
                  <input 
                    type="number" 
                    min="0"
                    value={currentProduct.stock === 0 ? '' : currentProduct.stock}
                    onChange={e => setCurrentProduct({...currentProduct, stock: e.target.value === '' ? 0 : parseInt(e.target.value) || 0})}
                    placeholder="Kosongkan jika tidak tentu"
                    className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Produk</label>
                <textarea 
                  value={currentProduct.description}
                  onChange={e => setCurrentProduct({...currentProduct, description: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] h-24"
                />
              </div>
            </div>

            <div className="space-y-6">
              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Produk (Maks. 5)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {[0, 1, 2, 3, 4].map((index) => {
                    const imgUrl = currentProduct.images?.[index] || (index === 0 ? currentProduct.image : '');
                    return (
                      <div key={index} className="border-2 border-dashed border-gray-300 rounded-xl p-2 flex flex-col items-center justify-center bg-gray-50 relative h-[120px] sm:h-[150px]">
                        {imgUrl ? (
                          <>
                            <img src={imgUrl} alt={`Preview ${index + 1}`} className="max-h-full object-contain rounded" />
                            <button 
                              type="button" 
                              onClick={() => {
                                const newImages = [...(currentProduct.images || ['', '', '', '', ''])];
                                newImages[index] = '';
                                setCurrentProduct({...currentProduct, images: newImages});
                              }}
                              className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded shadow hover:bg-red-50"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        ) : (
                          <div className="text-center w-full relative">
                            <ImageIcon className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-1" />
                            <div className="text-[10px] sm:text-xs text-gray-500">{index === 0 ? 'Gambar Utama' : `Tambahan ${index}`}</div>
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => handleMultipleImageUpload(e, index)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Specifications */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Spesifikasi</label>
                  <button type="button" onClick={addSpec} className="text-[#135A62] text-sm font-medium hover:underline flex items-center gap-1">
                    <Plus size={14} /> Tambah Spek
                  </button>
                </div>
                
                <div className="space-y-2">
                  {currentProduct.specs?.map((spec, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input 
                        type="text" 
                        value={spec}
                        onChange={e => updateSpec(idx, e.target.value)}
                        placeholder={`Spesifikasi ${idx + 1} (contoh: 10 Watt)`}
                        className="flex-1 border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#135A62]"
                      />
                      <button 
                        type="button" 
                        onClick={() => removeSpec(idx)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {(!currentProduct.specs || currentProduct.specs.length === 0) && (
                    <p className="text-sm text-gray-400 italic">Belum ada spesifikasi ditambahkan.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-[#135A62] text-white rounded-lg font-medium hover:bg-[#0f4c5c] transition-colors"
            >
              Simpan Produk
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Produk</h2>
        <button onClick={openAddForm} className="flex items-center gap-2 bg-[#135A62] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f4c5c]">
          <Plus size={16} /> Tambah Produk Baru
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Urutan</th>
              <th className="px-4 py-3">Gambar</th>
              <th className="px-4 py-3">Nama Produk</th>
              <th className="px-4 py-3">Merek</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Stok</th>
              <th className="px-4 py-3 rounded-tr-lg">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p: Product, index: number) => (
              <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => moveUp(index)} 
                      disabled={index === 0}
                      className="text-gray-500 p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button 
                      onClick={() => moveDown(index)} 
                      disabled={index === products.length - 1}
                      className="text-gray-500 p-1 hover:bg-gray-200 rounded disabled:opacity-30"
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-white border border-gray-200 rounded overflow-hidden">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon size={16}/></div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  <div className="flex flex-col gap-1">
                    <span>{p.name}</span>
                    {p.favoriteRank && (
                      <span className="inline-flex items-center self-start px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                        Favorit #{p.favoriteRank}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">{p.brand}</td>
                <td className="px-4 py-3">Rp {p.price.toLocaleString('id-ID')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <button onClick={() => openEditForm(p)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
                  <button onClick={() => { if(window.confirm('Hapus produk ini?')) deleteProduct(p.id); }} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">Belum ada produk. Silakan tambah produk baru.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrendManager({ trends, addTrend, updateTrend, deleteTrend }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TrendInfo>>({
    title: '',
    description: '',
    mediaUrl: '',
    mediaType: 'image'
  });

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video/');
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, mediaUrl: reader.result as string, mediaType: isVideo ? 'video' : 'image' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (isEditing && formData.id) {
      updateTrend(formData as TrendInfo);
    } else {
      addTrend({
        ...formData,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
      } as TrendInfo);
    }
    setIsAdding(false);
    setIsEditing(false);
    setFormData({ title: '', description: '', mediaUrl: '', mediaType: 'image' });
  };

  const startEdit = (trend: TrendInfo) => {
    setFormData(trend);
    setIsEditing(true);
    setIsAdding(true);
  };

  if (isAdding) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{isEditing ? 'Edit Info/Trend' : 'Tambah Info & Trend Baru'}</h2>
          <button 
            onClick={() => { setIsAdding(false); setIsEditing(false); setFormData({ title: '', description: '', mediaUrl: '', mediaType: 'image' }); }} 
            className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Judul *</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Singkat</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Media Utama (Gambar/GIF/Video)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50 relative min-h-[160px]">
              {formData.mediaUrl ? (
                <>
                  {formData.mediaType === 'video' ? (
                    <video src={formData.mediaUrl} autoPlay loop muted playsInline className="max-h-48 object-cover mb-4 rounded" />
                  ) : (
                    <img src={formData.mediaUrl} alt="Preview" className="max-h-48 object-contain mb-4 rounded" />
                  )}
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, mediaUrl: '', mediaType: 'image'})}
                    className="absolute top-2 right-2 bg-white text-red-500 p-1 rounded shadow-sm hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <div className="text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <div className="text-sm text-gray-600">Upload dari komputer (Max 5MB)</div>
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*,video/mp4,video/webm"
                onChange={handleMediaUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Upload media"
              />
            </div>
            <div className="mt-2 text-xs text-gray-500">Atau masukkan URL media (GIF / MP4 didukung):</div>
            <input 
              type="text" 
              placeholder="https://example.com/image.gif"
              value={formData.mediaUrl && !formData.mediaUrl.startsWith('data:') ? formData.mediaUrl : ''}
              onChange={e => {
                const url = e.target.value;
                const isVideo = url.endsWith('.mp4') || url.endsWith('.webm');
                setFormData({...formData, mediaUrl: url, mediaType: isVideo ? 'video' : 'image'});
              }}
              className="w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] text-sm"
            />
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => { setIsAdding(false); setIsEditing(false); }}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-[#135A62] text-white rounded-lg font-medium hover:bg-[#0f4c5c] transition-colors"
            >
              Simpan Trend
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manajemen Info & Trend</h2>
        <button onClick={() => { setIsAdding(true); setFormData({title:'', description:'', mediaUrl:'', mediaType: 'image'}); }} className="flex items-center gap-2 bg-[#135A62] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#0f4c5c]">
          <Plus size={16} /> Tambah Baru
        </button>
      </div>

      <div className="space-y-4">
        {trends && trends.map((t: TrendInfo) => (
          <div key={t.id} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
            {t.mediaUrl && (
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-none">
                {t.mediaType === 'video' ? (
                  <video src={t.mediaUrl} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                ) : (
                  <img src={t.mediaUrl} className="w-full h-full object-cover" alt={t.title} />
                )}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{t.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{t.description}</p>
              <p className="text-xs text-gray-400 mt-2">{t.date}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => startEdit(t)} className="text-blue-500 p-2 hover:bg-blue-50 rounded-lg"><Edit2 size={16} /></button>
              <button onClick={() => { if(window.confirm('Hapus trend ini?')) deleteTrend(t.id); }} className="text-red-500 p-2 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {(!trends || trends.length === 0) && (
          <div className="text-center py-10 bg-gray-50 rounded-lg border border-gray-100">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-300 mb-3" />
            <p className="text-gray-500">Belum ada info atau trend. Silakan tambah baru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
