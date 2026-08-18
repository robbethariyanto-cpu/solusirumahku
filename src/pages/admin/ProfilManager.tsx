import React, { useState } from 'react';
import { StoreSettings, ProfileMedia } from '../../types';
import { Plus, Trash2, Image as ImageIcon, Video, Save, Check } from 'lucide-react';

export default function ProfilManager({ settings, updateSettings }: { settings: StoreSettings, updateSettings: (s: StoreSettings) => void }) {
  const [profileMedia, setProfileMedia] = useState<ProfileMedia[]>(settings.profileMedia || []);
  const [saved, setSaved] = useState(false);

  const imagesCount = profileMedia.filter(m => m.type === 'image').length;
  const videosCount = profileMedia.filter(m => m.type === 'video').length;

  const handleAddMedia = (type: 'image' | 'video') => {
    if (type === 'image' && imagesCount >= 10) {
      alert('Maksimal 10 gambar.');
      return;
    }
    if (type === 'video' && videosCount >= 2) {
      alert('Maksimal 2 video.');
      return;
    }
    setProfileMedia([...profileMedia, { id: Date.now().toString(), type, url: '', description: '' }]);
  };

  const handleRemoveMedia = (id: string) => {
    setProfileMedia(profileMedia.filter(m => m.id !== id));
  };

  const handleChangeMedia = (id: string, field: keyof ProfileMedia, value: string) => {
    setProfileMedia(profileMedia.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChangeMedia(id, 'url', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateSettings({ ...settings, profileMedia });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profil & Galeri Tentang Kami</h2>
          <p className="text-gray-500 mt-1">Kelola gambar (maks 10) dan video (maks 2) untuk ditampilkan di halaman Tentang Kami.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all ${saved ? 'bg-emerald-500' : 'bg-[#135A62] hover:bg-[#0f4c5c]'}`}
        >
          {saved ? <><Check size={18} /> Tersimpan</> : <><Save size={18} /> Simpan Perubahan</>}
        </button>
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => handleAddMedia('image')}
          disabled={imagesCount >= 10}
          className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#135A62] hover:text-[#135A62] disabled:opacity-50 transition-colors"
        >
          <ImageIcon size={18} /> Tambah Gambar ({imagesCount}/10)
        </button>
        <button 
          onClick={() => handleAddMedia('video')}
          disabled={videosCount >= 2}
          className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-[#135A62] hover:text-[#135A62] disabled:opacity-50 transition-colors"
        >
          <Video size={18} /> Tambah Video ({videosCount}/2)
        </button>
      </div>

      <div className="space-y-6">
        {profileMedia.map((media, index) => (
          <div key={media.id} className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex gap-4">
            <div className="w-48 h-32 bg-gray-200 rounded-lg border border-gray-300 flex-shrink-0 flex items-center justify-center overflow-hidden">
              {media.url ? (
                media.type === 'image' ? (
                  <img src={media.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <video src={media.url} className="w-full h-full object-cover" />
                )
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  {media.type === 'image' ? <ImageIcon size={24} /> : <Video size={24} />}
                  <span className="text-xs mt-1">{media.type === 'image' ? 'URL Gambar' : 'URL Video'}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload atau URL {media.type === 'image' ? 'Gambar' : 'Video'}</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={media.url}
                    onChange={(e) => handleChangeMedia(media.id, 'url', e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
                    placeholder={`https://...`}
                  />
                  <div className="relative overflow-hidden inline-block flex-shrink-0">
                    <button type="button" className="bg-gray-100 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      Pilih File
                    </button>
                    <input 
                      type="file" 
                      accept={media.type === 'image' ? 'image/*' : 'video/*'}
                      onChange={(e) => handleFileUpload(media.id, e)}
                      className="absolute left-0 top-0 opacity-0 cursor-pointer w-full h-full"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan / Paragraf</label>
                <textarea 
                  value={media.description}
                  onChange={(e) => handleChangeMedia(media.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#135A62] resize-none"
                  placeholder="Deskripsi..."
                />
              </div>
            </div>

            <button 
              onClick={() => handleRemoveMedia(media.id)}
              className="text-red-500 hover:bg-red-50 p-2 rounded-lg self-start transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
        {profileMedia.length === 0 && (
          <div className="text-center text-gray-500 py-12 border-2 border-dashed border-gray-200 rounded-xl">
            Belum ada media profil. Silakan tambah gambar atau video.
          </div>
        )}
      </div>
    </div>
  );
}
