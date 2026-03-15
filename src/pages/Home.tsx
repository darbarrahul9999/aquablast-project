import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
            alt="Pressure washing background" 
            className="w-full h-full object-cover blur-3xl scale-110 opacity-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan text-sm font-bold mb-6 border border-brand-cyan/30">
              #1 RATED PRESSURE WASHING
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-brand-charcoal mb-6 leading-[1.1] tracking-tight">
              High Pressure. <br />
              <span className="text-brand-cyan">High Standards.</span>
            </h1>
            <p className="text-xl text-brand-charcoal/70 mb-10 leading-relaxed max-w-2xl">
              Restore your property's beauty with professional-grade surface restoration. From driveways to storefronts, we blast away years of grime in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="bg-brand-cyan text-brand-charcoal px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-2xl shadow-brand-cyan/30"
              >
                BOOK NOW <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/services" 
                className="bg-brand-charcoal text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-charcoal/90 transition-all flex items-center justify-center"
              >
                VIEW SERVICES
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-10 left-0 right-0 hidden lg:block">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-3 gap-8 glass p-8 rounded-3xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 flex items-center justify-center">
                  <CheckCircle2 className="text-brand-cyan w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-white/50 text-sm">Projects Completed</div>
                </div>
              </div>
              <div className="flex items-center gap-4 border-x border-white/10 px-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 flex items-center justify-center">
                  <ShieldCheck className="text-brand-cyan w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-white/50 text-sm">Satisfaction Guaranteed</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 flex items-center justify-center">
                  <Zap className="text-brand-cyan w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Eco</div>
                  <div className="text-white/50 text-sm">Friendly Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24 bg-brand-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Real Results, <span className="text-brand-cyan underline decoration-brand-cyan/30">Real Fast</span></h2>
            <p className="text-brand-charcoal/60 max-w-2xl mx-auto">See the transformation for yourself. Our high-pressure equipment removes even the toughest stains.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid grid-cols-2 h-[400px]">
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale" alt="Before" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-brand-charcoal text-white px-3 py-1 rounded-full text-xs font-bold">BEFORE</div>
                </div>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="After" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-brand-cyan text-brand-charcoal px-3 py-1 rounded-full text-xs font-bold">AFTER</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-brand-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            <div className="flex flex-col justify-center space-y-8 p-8">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold">Why Aqua Blast?</h3>
                <p className="text-brand-charcoal/70 leading-relaxed">
                  We don't just spray water. We use specialized techniques and eco-friendly detergents to restore surfaces without causing damage.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Professional Grade Gear",
                  "Fully Insured Team",
                  "Eco-Friendly Cleaning",
                  "Transparent Pricing"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                    </div>
                    <span className="font-semibold text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" className="text-brand-cyan font-bold flex items-center gap-2 hover:gap-4 transition-all">
                LEARN MORE ABOUT OUR PROCESS <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section (3-column) */}
      <section className="py-24 bg-brand-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan flex items-center justify-center">
                <ShieldCheck className="w-8 h-8 text-brand-charcoal" />
              </div>
              <h3 className="text-2xl font-bold">Reliable Service</h3>
              <p className="text-white/60 leading-relaxed">
                We show up on time, every time. Our professional crew respects your property and your schedule.
              </p>
            </div>
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan flex items-center justify-center">
                <Droplets className="w-8 h-8 text-brand-charcoal" />
              </div>
              <h3 className="text-2xl font-bold">Deep Cleaning</h3>
              <p className="text-white/60 leading-relaxed">
                Our high-pressure systems penetrate deep into porous surfaces to remove mold, mildew, and oil stains.
              </p>
            </div>
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-brand-cyan flex items-center justify-center">
                <Zap className="w-8 h-8 text-brand-charcoal" />
              </div>
              <h3 className="text-2xl font-bold">Instant Value</h3>
              <p className="text-white/60 leading-relaxed">
                Instantly boost your property's curb value. A professional wash is the most cost-effective way to refresh your home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
