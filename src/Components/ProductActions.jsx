import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { useCart } from '../Context/CartContext'; // 1. Must import the hook

const ProductActions = ({ product }) => { // 2. Accept 'product' as a prop
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart(); // 3. Get the add function from context

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    // 4. Create a helper to handle the specific quantity
    const handleAdd = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
    };

    return (
        <div className="space-y-6">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 uppercase tracking-widest">Quantity</span>
                <div className="flex items-center border border-gray-200 rounded-full p-1 bg-[#FAF9F6]">
                    <button onClick={decrement} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
                        <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-medium text-[#2D2D2D]">{quantity}</span>
                    <button onClick={increment} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
                        <Plus size={16} />
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                    onClick={handleAdd} // 5. Use the helper function
                    whileHover={{ scale: 1.02, backgroundColor: "#D4AF37" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#2D2D2D] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg transition-all"
                >
                    <ShoppingBag size={20} />
                    Add to Bag
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 border border-[#2D2D2D] text-[#2D2D2D] py-4 rounded-full font-bold hover:bg-gray-50 transition-all"
                >
                    Buy It Now
                </motion.button>
            </div>
        </div>
    );
};

export default ProductActions;