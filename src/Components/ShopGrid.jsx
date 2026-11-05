import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { featuredProducts } from '../data/featuredProducts';

const ShopGrid = ({ activeCategory, searchTerm, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

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
  const allProducts = [...featuredProducts, ...products];
  const displayedProducts = allProducts.filter((product) => {
    const matchesCategory = !activeCategory || product.category === activeCategory;
    const searchText = `${product.name} ${product.category}`.toLowerCase();
    return matchesCategory && searchText.includes((searchTerm || '').toLowerCase());
  }).sort((firstProduct, secondProduct) => {
    if (sortBy === 'price-low') return Number(firstProduct.price) - Number(secondProduct.price);
    if (sortBy === 'price-high') return Number(secondProduct.price) - Number(firstProduct.price);
    if (sortBy === 'name') return firstProduct.name.localeCompare(secondProduct.name);
    return 0;
  });

  if (loading) return <div className="text-center py-20 italic">Loading Marya Luxe...</div>;

  if (displayedProducts.length === 0) {
    return <div className="rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">No products matched your search. Try another word or category.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {displayedProducts.map((product) => (
        <div key={product.id} className="group">
          <Link to={`/product/${product.id}`} className="block">
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
              <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">{product.description}</p>
              <p className="mt-2 font-medium">₦{Number(product.price).toLocaleString()}</p>
            </div>
            </div>
          </Link>
          <button
            onClick={() => addToCart(product)}
            className="w-full mt-3 rounded-full bg-[#2D2D2D] py-3 text-sm font-bold text-white flex items-center justify-center gap-2 transition-colors hover:bg-[#D4AF37]"
          >
            <ShoppingBag size={17} /> Add to Bag
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShopGrid;
