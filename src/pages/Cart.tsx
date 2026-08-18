import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Trash2, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, settings, clearCart } = useAppContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const handleCheckoutWA = () => {
    let message = `Halo ${settings.storeName}, saya ingin memesan:\n\n`;
    
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`;
      message += `   Jumlah: ${item.quantity}\n`;
      message += `   Harga: ${formatPrice(item.product.price * item.quantity)}\n\n`;
    });
    
    message += `*Total: ${formatPrice(totalAmount)}*\n\n`;
    message += `Mohon konfirmasi ketersediaan stok dan total pembayaran. Terima kasih.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodedMessage}`;
    
    window.open(waUrl, '_blank');
    // Optional: clear cart after opening WA? Let user decide.
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="text-gray-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Keranjang belanja Anda kosong</h2>
          <p className="text-gray-500 mb-8">Silakan lihat produk kami dan mulai berbelanja.</p>
          <Link to="/" className="px-8 py-3 bg-[#135A62] text-white rounded-lg font-medium hover:bg-[#0f4c5c] transition-colors inline-flex items-center gap-2">
            <ArrowLeft size={18} /> Lanjutkan Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Keranjang Belanja</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item.product.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-none bg-gray-50 rounded-lg overflow-hidden border border-gray-200 block">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-1">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-bold text-gray-900 text-lg hover:text-[#135A62]">{item.product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                <p className="font-bold text-[#135A62]">{formatPrice(item.product.price)}</p>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                  <button 
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-l-lg transition-colors"
                  >
                    -
                  </button>
                  <input 
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 1)}
                    className="w-12 text-center bg-transparent font-medium text-gray-900 focus:outline-none text-sm py-1"
                  />
                  <button 
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-r-lg transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 flex-none">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Total Item</span>
                <span>{cart.reduce((t, i) => t + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-xl border-t border-gray-100 pt-4">
                <span>Total Belanja</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ Stok dan Diskon Tidak Mengikat, Selalu Lakukan Konfirmasi Melalui Whatsapp.
              </p>
            </div>

            <button 
              onClick={handleCheckoutWA}
              className="w-full py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 mb-4"
            >
              Kirim Pesanan ke WhatsApp
            </button>

            <button 
              onClick={clearCart}
              className="w-full py-2 px-6 text-gray-500 hover:text-red-500 font-medium transition-colors text-sm"
            >
              Kosongkan Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Need to import ShoppingCart icon here because it wasn't imported yet.
import { ShoppingCart } from 'lucide-react';
