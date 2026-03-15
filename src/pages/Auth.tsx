import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LogIn, UserPlus, AlertCircle, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { auth } from '../firebase';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error('Google Auth error:', err);
      setError(err.message || 'Google authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (formData.name) {
          await updateProfile(userCredential.user, { displayName: formData.name });
        }
      }
      navigate('/');
    } catch (err: any) {
      console.error('Auth error:', err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled in the Firebase Console. Please enable it under Authentication > Sign-in method.');
      } else {
        setError(err.message || 'Authentication failed');
      }
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

        <div className="mt-8 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-charcoal/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-brand-charcoal/40 font-bold tracking-widest">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="mt-8 w-full bg-brand-white text-brand-charcoal py-5 rounded-2xl font-bold text-lg hover:bg-brand-charcoal/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3 border border-brand-charcoal/10 disabled:opacity-50"
        >
          <Chrome className="w-5 h-5" /> GOOGLE
        </button>
      </motion.div>
    </div>
  );
}
