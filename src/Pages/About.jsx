import React from 'react';
import { motion } from 'framer-motion';
import HeroImg from '../assets/HeroImg.jpeg';

const About = () => (
  <motion.div
    initial={{ scale: 1.2, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className="pt-32 pb-20 bg-[#FAF9F6] min-h-screen px-6 text-center max-w-4xl mx-auto"
  >
    <span className="text-[#D4AF37] tracking-widest text-xs uppercase font-bold">Our Philosophy</span>
    <h1 className="text-5xl font-serif text-[#2D2D2D] mt-4 mb-8 italic">Soft, Radiant, Effortlessly You</h1>
    <div className="aspect-video rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
      <img src={HeroImg} className="w-full h-full object-cover" alt="Brand Story" />
    </div>
    <p className="text-lg text-gray-600 leading-relaxed">
      At Marya Luxe, We curate elegance and comfort for everyone. Our mission is to make the "soft life" accessible through premium lifestyle essentials..
    </p>
  </motion.div>
);

export default About;