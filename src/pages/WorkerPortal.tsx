import React from 'react';
import WorkerDashboard from '../components/WorkerDashboard';
import { motion } from 'motion/react';
import { HardHat } from 'lucide-react';

export default function WorkerPortal() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-orange-50/30"
    >
      <div className="bg-brand-charcoal text-white py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2">
          <HardHat className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-black tracking-widest uppercase">Field Staff Portal</span>
        </div>
      </div>
      <WorkerDashboard />
    </motion.div>
  );
}
