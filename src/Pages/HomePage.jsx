import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../Components/Hero';
import Logo from '../assets/Logo.jpeg';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { featuredProducts } from '../data/featuredProducts';

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Points to your 'products' collection in Firestore
                const querySnapshot = await getDocs(collection(db, "products"));
                const items = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setProducts(items);
            } catch (error) {
                console.error("Error fetching luxury products: ", error);
            }
        };

        fetchProducts();
    }, []);

    const newArrivals = [featuredProducts[0], featuredProducts[3], featuredProducts[6], ...products].slice(0, 4);

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Hero />
            {/* Featured Categories with Staggered Entrance */}
            <div className="bg-[#FAF9F6] pt-20">

                {/* FEATURED CATEGORIES SECTION */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="px-6 py-10 max-w-6xl mx-auto"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-medium mb-10 text-gray-800 uppercase tracking-widest text-center">Featured Categories</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {['Wellness', 'Skincare', 'Jewelry'].map((cat) => (
                                <Link to={{ pathname: '/shop', search: `?category=${encodeURIComponent(cat)}` }} key={cat}>
                                    <motion.div variants={itemVariants} className="flex flex-col items-center group cursor-pointer">
                                        <span className="text-[#D4AF37] font-serif mb-6 text-xl">{cat}</span>
                                        <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-pink-50 shadow-inner">
                                            <motion.img
                                                whileHover={{ scale: 1.1 }}
                                                src={`/assets/${cat.toLowerCase()}.jpg`}
                                                alt={cat}
                                                className="w-full h-full object-cover transition-transform duration-700"
                                            />
                                        </div>
                                        <button className="text-xs text-gray-400 font-medium italic group-hover:text-[#D4AF37] transition-colors">
                                            [Shop {cat}]
                                        </button>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.section>

                {/* NEW ARRIVALS */}
                <section className="px-6 py-20 max-w-6xl mx-auto">
                    <div className="mb-10 flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-[#D4AF37]">Just in</p>
                            <h2 className="text-3xl font-serif italic text-gray-800">New Arrivals</h2>
                            <p className="mt-2 text-sm text-gray-500">Fresh essentials for your soft-life routine.</p>
                        </div>
                        <Link to="/shop" className="text-sm font-medium text-[#2D2D2D] underline underline-offset-4 hover:text-[#D4AF37]">View all products</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {newArrivals.map((product) => (
                            <div key={product.id} className="group">
                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src={product.image} alt={product.name} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="p-6">
                                        <p className="text-[#D4AF37] text-sm mb-1 uppercase tracking-tighter">{product.category}</p>
                                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-500">{product.description || 'A thoughtfully selected Marya Luxe essential.'}</p>
                                        <p className="mt-3 font-bold text-gray-700">₦{Number(product.price).toLocaleString()}</p>
                                    </div>
                                    </div>
                                </Link>
                                <button onClick={() => addToCart(product)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#2D2D2D] py-3 text-sm font-bold text-white transition-colors hover:bg-[#D4AF37]">
                                    <ShoppingBag size={17} /> Add to Bag
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* Mission Section with Slide-in Animation */}
            <motion.section
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="px-6 py-10 max-w-6xl mx-auto"
            >
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h2 className="text-2xl font-serif mb-6 text-gray-800">The "Soft Life" Mission</h2>
                        <p className="text-gray-500 text-sm leading-relaxed font-light italic">
                            At Marya Luxe, we believe luxury belongs in your everyday life. We curate thoughtful essentials that help you embrace your soft-life era.
                        </p>
                        <p className="hidden">
                            At Marya luife, believe luxury is or'sn'— is it's curate essentithat help your transition into "soft life era...
                        </p>
                    </div>
                    <motion.div
                        whileHover={{ rotate: 1 }}
                        className="w-full md:w-80 h-48 rounded-2xl overflow-hidden shadow-md"
                    >
                        <img src={Logo} className="w-full h-full object-cover" />
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default HomePage;
