import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useAppContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <span className="text-xs font-semibold text-[#135A62] uppercase tracking-wider mb-1">{product.brand}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-[#135A62] transition-colors">{product.name}</h3>
        </Link>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
          </div>
          <button 
            onClick={() => addToCart(product, 1)}
            className="p-2 bg-[#135A62] text-white rounded-full hover:bg-[#0f4c5c] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#135A62]"
            title="Tambah ke keranjang"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
