import React, { useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  const { categories, products, settings, trends } = useAppContext();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery) || 
    p.brand.toLowerCase().includes(searchQuery)
  );

  const favoriteProducts = [...products]
    .filter(p => p.favoriteRank && p.favoriteRank > 0)
    .sort((a, b) => (a.favoriteRank || 0) - (b.favoriteRank || 0))
    .slice(0, 20);

  return (
    <div className="w-full">
      {/* Hero Section */}
      {!searchQuery && (
        <div className="relative bg-[#135A62] text-white overflow-hidden">
          {settings.heroMediaUrl && (
            <div className="absolute inset-0 z-0">
              {settings.heroMediaType === 'video' ? (
                <video src={settings.heroMediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30" />
              ) : (
                <img src={settings.heroMediaUrl} alt="Hero" className="w-full h-full object-cover opacity-30" />
              )}
            </div>
          )}
          <div className="relative z-10 py-16 md:py-24 px-4 max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-lg">Solusi Lengkap Kebutuhan Rumah Anda</h1>
            <p className="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto mb-8 drop-shadow-md">
              {settings.aboutText}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Search Results Header */}
        {searchQuery && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Hasil pencarian untuk "{searchQuery}"
            </h2>
            <p className="text-gray-500 mt-1">{filteredProducts.length} produk ditemukan</p>
          </div>
        )}

        {/* Info & Trends Section */}
        {!searchQuery && trends && trends.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Info & Trend</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trends.slice(0, 6).map(trend => (
                <Link key={trend.id} to={`/trend/${trend.id}`} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
                  {trend.mediaUrl && (
                    <div className="h-48 bg-gray-100 relative shrink-0">
                      {trend.mediaType === 'video' ? (
                        <video src={trend.mediaUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                      ) : (
                        <img src={trend.mediaUrl} alt={trend.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      )}
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-semibold text-[#135A62] mb-2">{trend.date}</div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-[#135A62] transition-colors">{trend.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-3">{trend.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Categories Slider */}
        {!searchQuery && (
          <div className="mb-12 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="text-yellow-500" /> Kategori Pilihan
              </h2>
              <div className="flex gap-2">
                <button onClick={() => scrollSlider('left')} className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => scrollSlider('right')} className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 transition-colors">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div 
              ref={sliderRef}
              className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/category/${category.id}`}
                  className="flex-none w-32 md:w-40 snap-start group"
                >
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 h-32 md:h-40 flex flex-col items-center justify-center text-center shadow-sm group-hover:shadow-md group-hover:border-emerald-200 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#135A62] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {/* Placeholder for actual icon/logo if available */}
                      <span className="font-bold text-xl">{category.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#135A62] line-clamp-2">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div>
          {searchQuery ? (
            /* Search Results View */
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-lg">Tidak ada produk yang ditemukan.</p>
              </div>
            )
          ) : (
            /* Home View */
            <div className="space-y-12">
              {/* Terbaru */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Produk Terbaru</h2>
                  <Link to="/categories" className="text-[#135A62] hover:text-emerald-700 font-medium">Lihat Semua</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                  {/* Take up to 3 newest products (now that new ones are prepended to the array) */}
                  {products.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {/* Terfavorit */}
              {favoriteProducts.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <span className="text-amber-500">⭐</span> Produk Terfavorit Bulan ini
                    </h2>
                    <Link to="/categories" className="text-[#135A62] hover:text-emerald-700 font-medium">Lihat Semua</Link>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {favoriteProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
