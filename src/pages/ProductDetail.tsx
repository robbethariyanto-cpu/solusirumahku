import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Check, ChevronRight, Package2 } from 'lucide-react';

export default function ProductDetail() {
  const { productId } = useParams();
  const { products, categories, addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | undefined>(undefined);

  const product = products.find(p => p.id === productId);
  
  useEffect(() => {
    if (product) {
      setActiveImage(product.images?.[0] || product.image);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Produk tidak ditemukan</h2>
        <Link to="/" className="text-[#135A62] hover:underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  const availableImages = product.images && product.images.length > 0 
    ? product.images.filter(img => img.trim() !== '') 
    : (product.image ? [product.image] : []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-[#135A62]">Beranda</Link>
        <ChevronRight size={14} />
        {category && (
          <>
            <Link to={`/category/${category.id}`} className="hover:text-[#135A62]">{category.name}</Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-gray-900 truncate">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="flex flex-col p-8 border-r border-gray-100">
            <div className="aspect-square bg-gray-50 flex items-center justify-center p-8 rounded-xl border border-gray-100 mb-4 overflow-hidden">
              {activeImage ? (
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              ) : (
                <div className="text-gray-300">Tidak ada gambar</div>
              )}
            </div>
            {/* Thumbnails */}
            {availableImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {availableImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-gray-50 rounded-lg p-2 border-2 transition-all ${activeImage === img ? 'border-[#135A62]' : 'border-transparent hover:border-gray-200'}`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-8 md:p-12 flex flex-col">
            <span className="text-sm font-bold text-[#135A62] uppercase tracking-wider mb-2">{product.brand}</span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-4xl font-extrabold text-gray-900 mb-6">{formatPrice(product.price)}</p>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-block px-3 py-1 bg-emerald-50 text-[#135A62] rounded-full text-sm font-medium">
                Stok: {product.stock > 0 ? 'Tersedia' : 'Tanya Admin'}
              </span>
              
              {product.packingQuantity && product.packingUnit && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <Package2 size={16} /> 1 {product.packingUnit} = {product.packingQuantity} pcs
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {product.specs && product.specs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-3">Spesifikasi:</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  {product.specs.map((spec, idx) => (
                    <li key={idx}>{spec}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto border-t border-gray-100 pt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors font-medium"
                >
                  -
                </button>
                <input 
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-transparent font-medium text-gray-900 focus:outline-none"
                />
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition-colors font-medium"
                >
                  +
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-white transition-all ${
                  added 
                    ? 'bg-emerald-500 hover:bg-emerald-600' 
                    : 'bg-[#135A62] hover:bg-[#0f4c5c]'
                }`}
              >
                {added ? (
                  <><Check size={20} /> Ditambahkan</>
                ) : (
                  <><ShoppingCart size={20} /> Pesan Sekarang</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
