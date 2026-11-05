import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ShopGrid from '../Components/ShopGrid';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const categoryFilter = searchParams.get('category');
  const categories = ['Wellness', 'Skincare', 'Jewelry'];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categoryFilter]);

  const selectCategory = (category) => {
    setSearchParams(category ? { category } : {});
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-28 pb-20 bg-[#FAF9F6] min-h-screen px-6"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-serif text-[#2D2D2D] mb-2 italic">
            {categoryFilter ? `${categoryFilter} Collection` : 'The Collection'}
          </h1>
          <p className="text-gray-500 italic">"Your soft life plug" — Curated Essentials</p>
        </header>

        <section className="mb-10 rounded-2xl bg-white p-5 shadow-sm border border-gray-100" aria-label="Shop controls">
          <div className="flex flex-wrap gap-2 mb-5">
            <button onClick={() => selectCategory(null)} className={`rounded-full px-4 py-2 text-sm transition ${!categoryFilter ? 'bg-[#2D2D2D] text-white' : 'bg-[#FAF9F6] text-gray-600 hover:bg-[#D4AF37] hover:text-white'}`}>
              All
            </button>
            {categories.map((category) => (
              <button key={category} onClick={() => selectCategory(category)} className={`rounded-full px-4 py-2 text-sm transition ${categoryFilter === category ? 'bg-[#2D2D2D] text-white' : 'bg-[#FAF9F6] text-gray-600 hover:bg-[#D4AF37] hover:text-white'}`}>
                {category}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <label className="sr-only" htmlFor="product-search">Search products</label>
            <input id="product-search" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search products" className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#D4AF37]" />
            <label className="sr-only" htmlFor="product-sort">Sort products</label>
            <select id="product-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#D4AF37]">
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to high</option>
              <option value="price-high">Price: High to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </div>
        </section>
        
        {/* Pass the category to the grid so it knows what to show */}
        <ShopGrid activeCategory={categoryFilter} searchTerm={searchTerm} sortBy={sortBy} />
      </div>
    </motion.div>
  );
};

export default Shop;
