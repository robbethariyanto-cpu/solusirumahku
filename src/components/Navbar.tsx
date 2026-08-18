import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export default function Navbar() {
  const { cart, settings } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'Beranda', path: '/' },
    { label: 'Info & Trend', path: '/trends' },
    { label: 'Kategori', path: '/categories' },
    { label: 'Tentang Kami', path: '/about' },
    { label: 'Hubungi Kami', path: '/contact' },
  ];

  return (
    <nav className="bg-[#135A62] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center h-full gap-2">
            {settings.logoUrl ? (
              <img src={settings.logoUrl} alt={settings.storeName} className="h-16 py-1 object-contain" />
            ) : (
              <span className="font-bold text-xl md:text-2xl tracking-tight">
                {settings.storeName}
              </span>
            )}
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-gray-900 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8fd165]"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500 hover:text-[#135A62]">
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Desktop Nav & Cart */}
          <div className="hidden md:flex items-center gap-6">
            {menuItems.map(item => (
              <Link key={item.path} to={item.path} className="hover:text-emerald-200 transition-colors">
                {item.label}
              </Link>
            ))}
            <Link to="/cart" className="relative p-2 hover:bg-[#0f4c5c] rounded-full transition-colors">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Link to="/admin" className="p-2 hover:bg-[#0f4c5c] rounded-full transition-colors" title="Admin">
              <User size={24} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button onClick={toggleMenu} className="p-2 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0f4c5c] pb-4 px-4">
          <form onSubmit={handleSearch} className="relative mb-4 pt-4">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-gray-900 rounded-full py-2 pl-4 pr-10 focus:outline-none"
            />
            <button type="submit" className="absolute right-3 top-6 text-gray-500">
              <Search size={20} />
            </button>
          </form>
          <div className="flex flex-col space-y-3">
            {menuItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block px-2 py-1 text-lg hover:text-emerald-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              to="/admin" 
              className="block px-2 py-1 text-lg hover:text-emerald-200 flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} /> Admin Access
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
