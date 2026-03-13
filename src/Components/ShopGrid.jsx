import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const ShopGrid = ({ activeCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the prop passed from Shop.jsx
  const displayedProducts = activeCategory 
    ? products.filter(p => p.category === activeCategory)
    : products;

  if (loading) return <div className="text-center py-20 italic">Loading Marya Luxe...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {displayedProducts.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="group">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-square overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>
            <div className="p-6">
              <p className="text-[#D4AF37] text-xs uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="text-xl font-serif text-gray-800">{product.name}</h3>
              <p className="mt-2 font-medium">₦{Number(product.price).toLocaleString()}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopGrid;