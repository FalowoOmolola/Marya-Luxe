import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ShopGrid from '../Components/ShopGrid';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category'); // Captures 'Wellness' from the URL

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen px-6"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif text-[#2D2D2D] mb-2 italic">
            {categoryFilter ? `${categoryFilter} Collection` : 'The Collection'}
          </h1>
          <p className="text-gray-500 italic">"Your soft life plug" — Curated Essentials</p>
        </header>
        
        {/* Pass the category to the grid so it knows what to show */}
        <ShopGrid activeCategory={categoryFilter} />
      </div>
    </motion.div>
  );
};

export default Shop;