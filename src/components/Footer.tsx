import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Droplets, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="p-2 bg-brand-cyan rounded-lg">
                <Droplets className="w-6 h-6 text-brand-charcoal" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">
                AQUA<span className="text-brand-cyan">BLAST</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              High Pressure. High Standards. Professional pressure washing and surface restoration for your home and business.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-cyan hover:text-brand-charcoal transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-cyan hover:text-brand-charcoal transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-cyan hover:text-brand-charcoal transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/" className="hover:text-brand-cyan transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-cyan transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Our Services</Link></li>
              <li><Link to="/contact" className="hover:text-brand-cyan transition-colors">Book a Service</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Residential Cleaning</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Commercial Washing</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Roof Restoration</Link></li>
              <li><Link to="/services" className="hover:text-brand-cyan transition-colors">Mobile Fleet Wash</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-cyan" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-cyan" />
                <span>hello@aquablast.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-cyan" />
                <span>123 Pressure Way, Clean City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-xs">
          <p>© {currentYear} Aqua Blast. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
