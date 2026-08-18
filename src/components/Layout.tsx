import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Layout() {
  const { settings } = useAppContext();
  
  return (
    <div 
      className="min-h-screen flex flex-col bg-gray-50 font-sans"
      style={settings.backgroundUrl ? { 
        backgroundImage: `url(${settings.backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      } : {}}
    >
      <Navbar />
      <main className="flex-1 w-full flex flex-col bg-white/90">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
