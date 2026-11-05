import React, { useState, useEffect } from 'react'; // Added useEffect and useState
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, ArrowLeft, ShieldCheck, Sparkles, Truck } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase';
import { featuredProducts } from '../data/featuredProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null); // State for the real product
  const [loading, setLoading] = useState(true);

  // 1. Fetch the real product from Firebase
  useEffect(() => {
    const fetchProduct = async () => {
      const featuredProduct = featuredProducts.find((item) => item.id === id);
      if (featuredProduct) {
        setProduct(featuredProduct);
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
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
    }
  };

  if (loading) return <div className="pt-40 text-center font-serif italic">Loading Luxe...</div>;
  if (!product) return <div className="pt-40 text-center font-serif italic">Product not found.</div>;

  const careNotes = {
    Wellness: {
      howToUse: 'Follow the instructions on the product label. Supplements work best as part of a balanced daily routine.',
      details: 'Keep in a cool, dry place and check the label for ingredients, serving size, and suitability before use.',
    },
    Skincare: {
      howToUse: 'Apply to clean skin as directed. Patch test before first use and discontinue use if irritation occurs.',
      details: 'Check the product label for the complete ingredient list and recommended routine order.',
    },
    Jewelry: {
      howToUse: 'Style solo for a subtle finish or layer with your favourite Marya Luxe pieces.',
      details: 'Store dry and avoid perfume, lotions, and water to help preserve the finish.',
    },
  };
  const productNotes = careNotes[product.category] || {
    howToUse: 'Enjoy this thoughtfully selected Marya Luxe essential as part of your everyday routine.',
    details: 'See the product packaging for full care and product information.',
  };
  const relatedProducts = featuredProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

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
               src={product.image.startsWith('http') || product.image.startsWith('/') ? product.image : `/${product.image}`}
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-gray-100 pt-7 text-sm text-gray-600">
              <div className="flex items-start gap-2"><Truck size={18} className="shrink-0 text-[#D4AF37]" /><span>Delivery details confirmed after your order.</span></div>
              <div className="flex items-start gap-2"><ShieldCheck size={18} className="shrink-0 text-[#D4AF37]" /><span>Order securely via our verified WhatsApp line.</span></div>
              <div className="flex items-start gap-2"><Sparkles size={18} className="shrink-0 text-[#D4AF37]" /><span>Thoughtfully selected for your soft-life routine.</span></div>
            </div>
          </div>
        </div>

        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-[#FAF9F6] p-7">
            <h2 className="font-serif text-xl text-[#2D2D2D] mb-3">How to enjoy</h2>
            <p className="text-sm leading-relaxed text-gray-600">{productNotes.howToUse}</p>
          </div>
          <div className="rounded-2xl bg-[#FAF9F6] p-7">
            <h2 className="font-serif text-xl text-[#2D2D2D] mb-3">Product details & care</h2>
            <p className="text-sm leading-relaxed text-gray-600">{productNotes.details}</p>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-serif italic text-[#2D2D2D]">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/product/${item.id}`} className="group rounded-2xl bg-[#FAF9F6] overflow-hidden">
                  <img src={item.image} alt={item.name} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-4">
                    <h3 className="font-serif text-gray-800">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#D4AF37]">₦{item.price.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
