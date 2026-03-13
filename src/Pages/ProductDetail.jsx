import React, { useState, useEffect } from 'react'; // Added useEffect and useState
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null); // State for the real product
  const [loading, setLoading] = useState(true);

  // 1. Fetch the real product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddClick = () => {
    if (product) {
      addToCart(product);
      // Optional: Add a small visual feedback
      alert(`${product.name} added to bag!`);
    }
  };

  if (loading) return <div className="pt-40 text-center font-serif italic">Loading Luxe...</div>;
  if (!product) return <div className="pt-40 text-center font-serif italic">Product not found.</div>;

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen px-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/shop" className="flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] transition mb-8 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAF9F6] rounded-[2.5rem] p-10 flex items-center justify-center shadow-inner"
          >
            {/* 2. Image path: If using 'public' folder, use /image.png */}
            <img 
               src={product.image.startsWith('http') ? product.image : `/${product.image}`} 
               className="w-full h-auto rounded-2xl shadow-2xl" 
               alt={product.name} 
            />
          </motion.div>

          <div className="flex flex-col justify-center">
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase mb-3">Marya Luxe Exclusive</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2D2D2D] mb-4 italic">{product.name}</h1>
            <p className="text-3xl font-light text-gray-800 mb-8 font-serif">₦{Number(product.price).toLocaleString()}</p>
            <p className="text-gray-500 leading-relaxed mb-10 text-lg font-light italic">
              {product.description || "Experience the ultimate soft life comfort."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#D4AF37" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddClick} 
                className="flex-1 bg-[#2D2D2D] text-white py-5 rounded-full font-bold flex items-center justify-center gap-3 transition-all"
              >
                <ShoppingBag size={20} /> Add to Bag
              </motion.button>
              
              <button className="p-5 rounded-full border border-gray-100 hover:bg-red-50 transition-all group">
                <Heart size={24} className="text-gray-300 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;