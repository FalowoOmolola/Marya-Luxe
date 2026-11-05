import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Share2, Menu, X, LogOut } from 'lucide-react'; // Added LogOut icon
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../Context/CartContext';
import Logo from '../assets/Logo.jpeg';
import { useAuth } from '../Context/AuthContext';
import LogoutModal from './LogoutModal'; // 1. Import the Modal component

const Navbar = () => {
    const { user, loginWithGoogle, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // 2. State for Modal
    const { cartCount } = useCart();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Shop", path: "/shop" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    // 3. Handle the Logout Confirmation
    const handleConfirmLogout = async () => {
        await logout();
        setIsLogoutModalOpen(false);
        setIsProfileOpen(false);
    };
    const handleShare = async () => {
        const shareData = {
            title: 'Marya Luxe',
            text: 'Experience luxury and wellness with Marya Luxe.',
            url: window.location.href, // This shares the current page link
        };

        try {
            if (navigator.share) {
                // Native share (Mobile/Safari/Chrome)
                await navigator.share(shareData);
            } else {
                // Fallback: Copy to clipboard if API is not supported
                await navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard!");
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    return (
        <>
            <nav className="bg-[#FAF9F6]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">                <div className="flex items-center gap-8">
                <Link to="/">
                    <img src={Logo} alt="Marya Luxe" className="w-12 h-12 rounded-full border border-gray-200" />
                </Link>
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <NavLink to={link.path} className={({ isActive }) => `transition font-serif italic ${isActive ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}>
                                {link.name}
                            </NavLink>
                        </motion.div>
                    ))}
                </div>
            </div>

                <div className="flex items-center gap-5 text-gray-600">
                    <Link to="/cart" className="relative group">
                        <ShoppingCart size={22} className="group-hover:text-[#D4AF37] transition-colors" />
                        {cartCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </Link>

                    <div className="relative">
                        {user ? (
                            <img
                                src={user.photoURL}
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="w-8 h-8 rounded-full cursor-pointer border border-[#D4AF37]"
                                alt="Profile"
                            />
                        ) : (
                            <User onClick={loginWithGoogle} className="cursor-pointer hover:text-[#D4AF37]" />
                        )}

                        <AnimatePresence>
                            {isProfileOpen && user && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-4 w-56 bg-white shadow-xl rounded-2xl p-5 border border-gray-50"
                                >
                                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Welcome</p>
                                    <p className="text-sm font-serif italic font-bold mb-4 text-gray-800">{user.displayName}</p>
                                    <hr className="mb-4 border-gray-50" />
                                    <button
                                        onClick={() => setIsLogoutModalOpen(true)}
                                        className="flex items-center gap-2 text-red-500 text-sm hover:translate-x-1 transition-transform"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <Share2
                        size={20}
                        onClick={handleShare} // Add this line
                        className="cursor-pointer hover:text-[#D4AF37] transition hidden md:block"
                    />

                    <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* 4. The Logout Confirmation Modal Component */}
            <LogoutModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleConfirmLogout}
            />



            {/* Mobile Menu Drawer */}
            < AnimatePresence >
                {isMobileMenuOpen && (
                    <>
                        {/* Dark Overlay for Mobile Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden" />

                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[60] shadow-xl p-8 md:hidden flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex justify-between items-center mb-12">
                                    <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                        <img src={Logo} alt="Marya Luxe" className="w-12 h-12 rounded-full border border-gray-200" />
                                    </Link>
                                    <button onClick={() => setIsMobileMenuOpen(false)}>
                                        <X size={28} className="text-gray-700" />
                                    </button>
                                </div>
                                <nav className="flex flex-col gap-6 text-lg font-serif">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 + 0.2 }}
                                        >
                                            <NavLink
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={({ isActive }) => `block py-2 border-b border-gray-100 transition italic ${isActive ? 'text-[#D4AF37]' : 'hover:text-[#D4AF37]'}`}
                                            >
                                                {link.name}
                                            </NavLink>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>

                            <div className="mt-auto pt-8 border-t border-gray-100">
                                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full bg-[#D4AF37] text-white py-3 rounded-full font-bold hover:bg-[#2D2D2D] transition mb-4 flex items-center justify-center gap-2">
                                        <ShoppingCart size={18} /> View Bag ({cartCount})
                                    </button>
                                </Link>
                                <button className="w-full border border-gray-200 text-gray-700 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                                    My Account
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence >
        </>
    );
};

export default Navbar;
