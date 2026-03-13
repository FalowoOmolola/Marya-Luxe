import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../Components/Hero';
import Logo from '../assets/Logo.jpeg';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center font-serif italic">Loading Marya Luxe...</div>;

    return (
        <div className="bg-[#FAF9F6] min-h-screen">
            <Hero />
            <div className="relative flex flex-col items-center justify-center h-full text-center px-6 py-15">
                <motion.button
                    onClick={() => navigate("/shop")}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#b8962d" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#D4AF37] text-white px-10 py-4 rounded-md font-bold text-sm tracking-[0.2em] uppercase shadow-2xl transition-all"
                >
                    Shop the Collection
                </motion.button>
            </div>
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
                                <Link to={`/shop?category=${cat}`} key={cat}>
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

                {/* DYNAMIC PRODUCTS SECTION */}
                <section className="px-6 py-20 max-w-6xl mx-auto">
                    <h2 className="text-2xl font-serif mb-12 italic border-b border-gray-100 pb-4">New Arrivals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <Link to={`/product/${product.id}`} key={product.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                    <img src={product.image} alt={product.name} className="w-full h-72 object-cover" />
                                    <div className="p-6">
                                        <p className="text-[#D4AF37] text-sm mb-1 uppercase tracking-tighter">{product.category}</p>
                                        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                        <p className="mt-2 font-bold text-gray-700">₦{Number(product.price).toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
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