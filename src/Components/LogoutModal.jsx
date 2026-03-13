import { motion, AnimatePresence } from 'framer-motion';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
          >
            <h3 className="text-2xl font-serif italic mb-2">Leaving so soon?</h3>
            <p className="text-gray-500 mb-8 text-sm">Are you sure you want to log out of your Marya Luxe account?</p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={onConfirm}
                className="bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Yes, Log Out
              </button>
              <button 
                onClick={onClose}
                className="text-gray-400 text-sm hover:text-black transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;