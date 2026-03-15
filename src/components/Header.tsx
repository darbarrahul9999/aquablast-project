import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Droplets, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-brand-charcoal/90 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-brand-cyan rounded-lg group-hover:rotate-12 transition-transform">
              <Droplets className="w-6 h-6 text-brand-charcoal" />
            </div>
            <span className={cn(
              "text-2xl font-bold tracking-tighter",
              isScrolled ? "text-white" : "text-brand-charcoal"
            )}>
              AQUA<span className="text-brand-cyan">BLAST</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-cyan",
                  location.pathname === link.path 
                    ? "text-brand-cyan" 
                    : (isScrolled ? "text-white/80" : "text-brand-charcoal/80")
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <Link 
                  to={
                    user?.role === 'admin' ? '/admin' :
                    user?.role === 'worker' ? '/worker' :
                    '/client'
                  } 
                  className={cn(
                    "flex items-center gap-2 text-sm font-bold hover:text-brand-cyan transition-colors",
                    isScrolled ? "text-white" : "text-brand-charcoal"
                  )}
                >
                  <User className="w-4 h-4" /> {user?.role?.toUpperCase()} SPACE
                </Link>
                <button 
                  onClick={logout}
                  className="text-white/50 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="bg-brand-cyan text-brand-charcoal px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-brand-cyan/20"
              >
                LOG IN
              </Link>
            )}
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={cn("w-6 h-6", isScrolled ? "text-white" : "text-brand-charcoal")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-white" : "text-brand-charcoal")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-charcoal border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "block text-lg font-medium",
                    location.pathname === link.path ? "text-brand-cyan" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link 
                    to={
                      user?.role === 'admin' ? '/admin' :
                      user?.role === 'worker' ? '/worker' :
                      '/client'
                    } 
                    className="block text-lg font-medium text-brand-cyan"
                  >
                    {user?.role?.toUpperCase()} SPACE
                  </Link>
                  <button 
                    onClick={logout}
                    className="block w-full text-left text-lg font-medium text-red-400"
                  >
                    LOG OUT
                  </button>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="block w-full text-center bg-brand-cyan text-brand-charcoal py-3 rounded-xl font-bold"
                >
                  LOG IN
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
