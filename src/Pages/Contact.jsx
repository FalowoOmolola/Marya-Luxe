import React from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const Contact = () => (
  <div className="pt-32 pb-20 bg-white min-h-screen px-6 flex items-center justify-center">
    <div className="max-w-2xl w-full bg-[#FAF9F6] rounded-[3rem] p-12 text-center border border-gray-100 shadow-xl">
      <h2 className="text-3xl font-serif mb-2 italic">Connect with Mariam</h2>
      <p className="text-gray-400 mb-10 italic">~Marya Luxe</p>
      
      <div className="space-y-4 text-left">
        <a href="https://wa.me/+2347041490128?text=Hello%20Marya%20Luxe,%20I'm%20interested%20in%20your%20products!" className="flex items-center justify-between p-6 bg-white rounded-2xl hover:bg-[#D4AF37] hover:text-white transition-all group">
          <div className="flex items-center gap-4">
            <MessageCircle className="text-[#25D366] group-hover:text-white" />
            <span className="font-medium">Chat on WhatsApp</span>
          </div>
        </a>
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl">
          <div className="flex items-center gap-4 text-gray-700">
            <Mail size={20} />
            <span className="font-medium">Email Inquiries</span>
          </div>
          <span className="text-gray-500 text-sm">hello@maryaluxe.com</span>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;