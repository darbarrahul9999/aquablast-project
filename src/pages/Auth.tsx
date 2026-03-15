import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token, data.user);
        navigate('/');
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-brand-charcoal/5"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="text-brand-charcoal/60 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"} 
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-brand-cyan font-bold ml-1 hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Full Name</label>
              <input 
                required
                type="text" 
                placeholder="John Doe"
                className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="john@example.com"
              className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Password</label>
            <input 
              required
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-brand-cyan text-brand-charcoal py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-cyan/20 disabled:opacity-50"
          >
            {loading ? 'PROCESSING...' : (
              isLogin ? <><LogIn className="w-5 h-5" /> LOG IN</> : <><UserPlus className="w-5 h-5" /> SIGN UP</>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
