import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryList from './pages/CategoryList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import Trends from './pages/Trends';
import TrendDetail from './pages/TrendDetail';
import AdminEntry from './pages/admin/AdminEntry';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="category/:categoryId" element={<CategoryList />} />
            <Route path="product/:productId" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="trends" element={<Trends />} />
            <Route path="trend/:trendId" element={<TrendDetail />} />
            <Route path="admin" element={<AdminEntry />} />
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin/register" element={<AdminRegister />} />
            <Route path="admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
