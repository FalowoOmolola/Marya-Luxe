import React from 'react';
import { motion } from 'framer-motion';
import HeroImg from '../assets/HeroImg.jpeg';


const Hero = () => {
    return (
        // Removed 'max-w-5xl' and 'px-4' to allow full-screen width
        <section className="relative w-full h-[85vh] lg:h-screen overflow-hidden bg-[#FAF9F6]">

            {/* 1. The Background Image: covers 100% of the side and height */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={HeroImg}
                    alt="Marya Luxe Hero"
                    // 'object-cover' ensures the image fills the space without stretching
                    className="w-full h-full object-cover"
                />
                {/* Subtle dark overlay to make white text pop */}
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* 2. Centered Content Overlay */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-white text-5xl md:text-7xl font-serif mb-6 drop-shadow-2xl italic"
                >
                    Indulge Everyday Luxury
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                    className="text-white/90 text-xl md:text-2xl font-light italic mb-10 tracking-wide"
                >
                    Soft, radiant, effortlessly you
                </motion.p>
            </div>
          {/* 3. Subtle Bottom Fade: blends the hero into the next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent" />
        </section>
    );
};

export default Hero;