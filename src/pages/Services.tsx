import { motion } from 'motion/react';
import { Home, Building2, Car, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: "Residential",
      icon: <Home className="w-8 h-8" />,
      description: "Keep your home looking its best. We specialize in delicate siding, roofs, and deck restoration.",
      items: ["Driveways & Walkways", "Siding & Brickwork", "Roof & Gutter Cleaning", "Decks & Patios"],
      image: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&q=80&w=800",
      color: "bg-blue-500"
    },
    {
      title: "Commercial",
      icon: <Building2 className="w-8 h-8" />,
      description: "Professional appearance for your business. We handle large-scale cleaning with minimal disruption.",
      items: ["Storefronts & Entrances", "Parking Lots & Garages", "Graffiti Removal", "Dumpster Pads"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
      color: "bg-brand-cyan"
    },
    {
      title: "Mobile Car Wash",
      icon: <Car className="w-8 h-8" />,
      description: "Convenience meets quality. We bring the professional wash to your personal vehicle or fleet.",
      items: ["Personal Vehicle Wash", "Fleet Maintenance", "Undercarriage Blast", "Wheel & Rim Detailing"],
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=800",
      color: "bg-emerald-500"
    }
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Our <span className="text-brand-cyan">Services</span>
          </motion.h1>
          <p className="text-lg text-brand-charcoal/60 leading-relaxed">
            From delicate residential siding to heavy-duty commercial parking lots, we have the specialized equipment and expertise to handle it all.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-brand-charcoal/5"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className={`w-16 h-16 rounded-2xl ${service.color} flex items-center justify-center text-brand-charcoal mb-6 -mt-16 relative z-10 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-brand-charcoal/60 text-sm mb-8 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 font-bold text-brand-cyan hover:gap-4 transition-all"
                >
                  GET A QUOTE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-brand-charcoal rounded-[3rem] p-12 md:p-20 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">The Aqua Blast Process</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Inspection", desc: "We assess the surface material and level of grime to choose the right pressure and detergent." },
                  { step: "02", title: "Preparation", desc: "We protect your plants, outlets, and delicate fixtures before starting the blast." },
                  { step: "03", title: "The Blast", desc: "Using precision nozzles, we strip away dirt, mold, and stains without damaging the base material." },
                  { step: "04", title: "Final Rinse", desc: "A thorough rinse ensures no residue is left behind, leaving a streak-free finish." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-brand-cyan font-black text-2xl opacity-50">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[2rem] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1000" 
                  alt="Pressure washing detail" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-8 rounded-3xl max-w-[240px]">
                <p className="text-brand-cyan font-bold text-lg mb-2">Pro Tip:</p>
                <p className="text-white/70 text-xs leading-relaxed">Regular pressure washing can extend the life of your siding and roof by up to 10 years by removing corrosive mold.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
