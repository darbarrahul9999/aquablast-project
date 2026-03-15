import { motion } from 'motion/react';
import { Shield, Leaf, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
          >
            We are <span className="text-brand-cyan">Aqua Blast</span>. <br />
            The Surface Experts.
          </motion.h1>
          <p className="text-xl text-brand-charcoal/60 leading-relaxed">
            Founded on the principles of precision and reliability, Aqua Blast has grown into the region's leading pressure washing service. We combine industrial-grade power with a delicate touch to restore your property's original shine.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1000" 
              alt="Our team at work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-cyan/20 mix-blend-overlay"></div>
          </div>

          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Philosophy</h2>
              <p className="text-brand-charcoal/70 leading-relaxed">
                We believe that every surface tells a story. Over time, that story gets buried under dirt, grime, and environmental wear. Our mission is to uncover the beauty that's already there, using techniques that are safe for your property and the planet.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-brand-cyan" />
                </div>
                <h4 className="font-bold">Eco-Friendly</h4>
                <p className="text-sm text-brand-charcoal/60">We use biodegradable detergents that are safe for pets and plants.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-brand-cyan" />
                </div>
                <h4 className="font-bold">Professional Grade</h4>
                <p className="text-sm text-brand-charcoal/60">Top-tier equipment ensures consistent pressure and superior results.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-brand-cyan" />
                </div>
                <h4 className="font-bold">Precision Driven</h4>
                <p className="text-sm text-brand-charcoal/60">We target the grime, not the surface. Zero damage, maximum clean.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-brand-cyan" />
                </div>
                <h4 className="font-bold">Reliable Team</h4>
                <p className="text-sm text-brand-charcoal/60">Fully insured and background-checked professionals you can trust.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Banner */}
        <div className="bg-brand-charcoal rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Committed to Excellence</h2>
            <p className="text-white/60 text-lg leading-relaxed mb-10">
              Whether it's a small residential driveway or a massive commercial parking garage, we bring the same level of intensity and attention to detail to every job. That's the Aqua Blast promise.
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-cyan mb-2">10+</div>
                <div className="text-white/40 text-sm uppercase tracking-widest">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-cyan mb-2">2k+</div>
                <div className="text-white/40 text-sm uppercase tracking-widest">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-cyan mb-2">100%</div>
                <div className="text-white/40 text-sm uppercase tracking-widest">Safety Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
