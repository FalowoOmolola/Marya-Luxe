import React from 'react';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../Context/CartContext';

const CartToast = () => {
  const { cartNotice, dismissCartNotice } = useCart();

  return (
    <AnimatePresence>
      {cartNotice && (
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          role="status"
          className="fixed bottom-5 left-4 right-4 z-[70] mx-auto flex max-w-md items-center gap-3 rounded-2xl bg-[#2D2D2D] p-4 text-white shadow-2xl sm:left-auto sm:right-6"
        >
          <div className="rounded-full bg-[#D4AF37] p-2">
            <Check size={17} strokeWidth={3} />
          </div>
          <p className="min-w-0 flex-1 text-sm">
            <span className="font-semibold">{cartNotice.name}</span> added to your bag.
          </p>
          <Link to="/cart" onClick={dismissCartNotice} className="shrink-0 text-sm font-bold text-[#F5D981] hover:text-white">
            View bag
          </Link>
          <button onClick={dismissCartNotice} aria-label="Dismiss cart message" className="shrink-0 text-gray-300 hover:text-white">
            <X size={18} />
          </button>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartToast;
