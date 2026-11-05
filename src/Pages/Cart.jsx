import React from 'react';
import { useCart } from '../Context/CartContext'; 
import { Link } from 'react-router-dom';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();

  const items = cartItems || [];
  const total = cartTotal || 0;

  // Function to handle WhatsApp Redirection
  const handleWhatsAppOrder = () => {
    const adminPhone = "2347041490128"; // REPLACE with Marya's actual WhatsApp number
    
    // 1. Format each item in the cart for the message
    const itemDetails = items.map(item => 
      `• ${item.name} (x${item.quantity || 1}) - ₦${(item.price * (item.quantity || 1)).toLocaleString()}`
    ).join('%0A'); // %0A creates a new line in WhatsApp

    // 2. Build the final message string
    const message = `New Order Inquiry - Marya Luxe %0A%0A` +
                    `Customer: ${user?.displayName || 'Guest User'}%0A` +
                    `My Bag:%0A${itemDetails}%0A%0A` +
                    `Total Amount: ₦${total.toLocaleString()}%0A%0A` +
                    `Hello Marya! I've finished picking my items. Please send me your account details so I can complete my payment.`;

    // 3. Open WhatsApp in a new tab
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center bg-[#FAF9F6] min-h-screen">
        <h2 className="text-3xl font-serif mb-4 italic">Your bag is empty</h2>
        <p className="text-gray-500 mb-8">Start your "soft life" journey today.</p>
        <Link to="/shop" className="bg-[#D4AF37] text-white px-8 py-3 rounded-md">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-[#FAF9F6] min-h-screen px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-10 italic">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl flex items-center gap-6 shadow-sm border border-gray-50">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-[#D4AF37] text-sm">₦{item.price?.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3 bg-[#FAF9F6] rounded-full p-1">
                  <button onClick={() => removeFromCart(item.id)} className="p-1 hover:text-red-500 transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold w-4 text-center">{item.quantity || 1}</span>
                  <button onClick={() => addToCart(item)} className="p-1 hover:text-[#D4AF37] transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 h-fit sticky top-32">
            <h3 className="text-xl font-serif mb-6">Summary</h3>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-8 text-xl font-bold border-t pt-4">
              <span>Total</span>
              <span className="text-[#D4AF37]">₦{total.toLocaleString()}</span>
            </div>

            {/* WhatsApp Checkout Button */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold hover:bg-[#128C7E] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageCircle size={20} />
              Order via WhatsApp
            </button>
            
            <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-[0.1em]">
              You will confirm delivery and payment details in WhatsApp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
