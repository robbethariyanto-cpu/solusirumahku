import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

export default function CategoryList() {
  const { categoryId } = useParams();
  const { categories, products } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');

  const currentCategory = categories.find(c => c.id === categoryId);

  // Filter products based on category, search query, and brand
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = categoryId ? p.categoryId === categoryId : true;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchBrand = selectedBrand ? p.brand === selectedBrand : true;
      return matchCategory && matchSearch && matchBrand;
    });
  }, [products, categoryId, searchQuery, selectedBrand]);

  // Extract unique brands for the current filtered list (ignoring brand filter itself)
  const availableBrands = useMemo(() => {
    const baseList = products.filter(p => {
      const matchCategory = categoryId ? p.categoryId === categoryId : true;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
    return Array.from(new Set(baseList.map(p => p.brand)));
  }, [products, categoryId, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <div className="w-full md:w-64 flex-none space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={18} /> Kategori
          </h3>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/categories" 
                className={`block px-3 py-2 rounded-lg text-sm transition-colors ${!categoryId ? 'bg-[#135A62] text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                Semua Kategori
              </Link>
            </li>
            {categories.map(cat => (
              <li key={cat.id}>
                <Link 
                  to={`/category/${cat.id}`}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${categoryId === cat.id ? 'bg-[#135A62] text-white font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {availableBrands.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Merek</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="brand" 
                  checked={selectedBrand === ''}
                  onChange={() => setSelectedBrand('')}
                  className="text-[#135A62] focus:ring-[#135A62]"
                />
                <span className="text-sm text-gray-700">Semua Merek</span>
              </label>
              {availableBrands.map(brand => (
                <label key={brand} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="brand" 
                    checked={selectedBrand === brand}
                    onChange={() => setSelectedBrand(brand)}
                    className="text-[#135A62] focus:ring-[#135A62]"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {currentCategory ? currentCategory.name : 'Semua Produk'}
          </h1>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari di kategori ini..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#135A62]"
            />
            <Search className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 text-lg">Tidak ada produk yang sesuai dengan kriteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
