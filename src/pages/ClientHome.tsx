import React from 'react';
import ClientDashboard from '../components/ClientDashboard';
import { motion } from 'motion/react';
import { User } from 'lucide-react';

export default function ClientHome() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-brand-white"
    >
      <div className="bg-brand-charcoal text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-cyan" />
          <span className="text-xs font-black tracking-widest uppercase">Client Personal Space</span>
        </div>
      </div>
      <ClientDashboard />
    </motion.div>
  );
}
