import React from 'react';
import { Link } from 'react-router-dom'; // This is the missing line
import { MessageCircle, Facebook, Instagram, Twitter } from 'lucide-react'; // Icons for your social links

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white p-8 mt-12 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-start border-b border-gray-800 pb-6 mb-4">
          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <div className="flex flex-col gap-2">
              {/* These Links were causing the error because 'Link' wasn't defined */}
              <Link to="/shop" className="text-xs text-gray-500 hover:text-[#D4AF37] transition">Quick Links</Link>
              <Link to="/about" className="text-xs text-gray-500 hover:text-[#D4AF37] transition">About Us</Link>
              <Link to="/contact" className="text-xs text-gray-500 hover:text-[#D4AF37] transition">Contact</Link>
            </div>
          </div>
          
          <div className="text-right text-xs text-gray-500 uppercase tracking-widest">Marya Luxe</div>
        </div>

        {/* Social Icons matching your design */}
        <div className="flex justify-end gap-4">
          <Facebook size={18} className="text-gray-400 hover:text-white cursor-pointer" />
          <Instagram size={18} className="text-gray-400 hover:text-white cursor-pointer" />
          <Twitter size={18} className="text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>

      {/* Floating WhatsApp Button from your mockup */}
      <a 
        href="https://wa.me/2347041490128?text=Hello%20Marya%20Luxe%2C%20I%27m%20interested%20in%20your%20products."
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] p-3 rounded-full absolute -top-6 right-6 shadow-lg cursor-pointer hover:scale-110 transition-transform"
      >
        <MessageCircle size={24} fill="white" />
      </a>
    </footer>
  );
};

export default Footer;
