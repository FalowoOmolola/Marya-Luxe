import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroImg from '../assets/HeroImg.jpeg';


const Hero = () => {
    return (
        <section className="relative w-full h-[85vh] lg:h-screen overflow-hidden bg-[#FAF9F6]">

            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={HeroImg}
                    alt="Marya Luxe Hero"
                    className="w-full h-full object-cover"
                />
                {/* Subtle dark overlay to make white text pop */}
                <div className="absolute inset-0 bg-black/20" />
            </motion.div>

            {/* 2. Centered Content Overlay */}
            <div className="relative z-10 flex h-full flex-col items-center justify-start px-6 pt-28 text-center md:pt-36">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.8 }}
                    className="px-4 py-5"
                >
                    <h1 className="text-white text-5xl md:text-7xl font-serif mb-5 italic drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)]">
                        Indulge Everyday Luxury
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-light italic mb-8 tracking-wide">
                        Soft, radiant, effortlessly you
                    </p>
                    <Link to="/shop" className="inline-flex rounded-full bg-[#2D2D2D] px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#D4AF37]">
                        Shop the Collection
                    </Link>
                </motion.div>
            </div>
          {/* 3. Subtle Bottom Fade: blends the hero into the next section */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#FAF9F6] to-transparent" />
        </section>
    );
};

export default Hero;
