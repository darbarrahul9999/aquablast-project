import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firestoreUtils';

export default function Contact() {
  const { user, isAuthenticated, firebaseUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    service: 'Residential',
    message: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      if (isAuthenticated && firebaseUser) {
        await addDoc(collection(db, 'bookings'), {
          userId: firebaseUser.uid,
          service: formData.service,
          date: formData.date,
          message: formData.message,
          status: 'pending',
          createdAt: new Date().toISOString()
        }).catch(err => handleFirestoreError(err, OperationType.CREATE, 'bookings'));
        setStatus('success');
        return;
      }

      // If not authenticated, we could still save to a 'leads' collection or similar
      await addDoc(collection(db, 'leads'), {
        ...formData,
        createdAt: new Date().toISOString()
      }).catch(err => handleFirestoreError(err, OperationType.CREATE, 'leads'));
      setStatus('success');
    } catch (error: any) {
      console.error('Booking error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Failed to process your request.');
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold mb-8 tracking-tight"
              >
                {isAuthenticated ? "Schedule your" : "Let's get"} <br />
                <span className="text-brand-cyan">{isAuthenticated ? "Restoration." : "to work."}</span>
              </motion.h1>
              <p className="text-xl text-brand-charcoal/60 leading-relaxed">
                {isAuthenticated 
                  ? "Select your service and preferred date. We'll confirm your booking within 24 hours."
                  : "Ready to restore your property? Fill out the form and we'll get back to you within 24 hours with a free, no-obligation quote."}
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Call Us</h4>
                  <p className="text-brand-charcoal/60">(555) 123-4567</p>
                  <p className="text-xs text-brand-cyan font-bold mt-1 uppercase tracking-widest">Mon-Fri: 8am - 6pm</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-brand-charcoal/60">hello@aquablast.com</p>
                  <p className="text-xs text-brand-cyan font-bold mt-1 uppercase tracking-widest">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-brand-cyan" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Our Location</h4>
                  <p className="text-brand-charcoal/60">123 Pressure Way, Clean City</p>
                  <p className="text-xs text-brand-cyan font-bold mt-1 uppercase tracking-widest">Serving the Tri-State Area</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-brand-charcoal/5">
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{isAuthenticated ? "Booking Received!" : "Message Sent!"}</h3>
                  <p className="text-brand-charcoal/60 mb-8">
                    {isAuthenticated 
                      ? "Your service has been scheduled. You can track it in your dashboard."
                      : "Thank you for reaching out. One of our experts will contact you shortly."}
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-brand-cyan font-bold hover:underline"
                  >
                    {isAuthenticated ? "Schedule another service" : "Send another message"}
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Full Name</label>
                      <input 
                        required
                        disabled={isAuthenticated}
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none disabled:opacity-50"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Email Address</label>
                      <input 
                        required
                        disabled={isAuthenticated}
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none disabled:opacity-50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Service Needed</label>
                      <select 
                        className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none appearance-none"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      >
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Mobile Car Wash</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Preferred Date</label>
                      <input 
                        required
                        type="date" 
                        className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-charcoal/70 ml-1">Message / Special Instructions</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      className="w-full px-6 py-4 rounded-2xl bg-brand-white border-none focus:ring-2 focus:ring-brand-cyan transition-all outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
                      <AlertCircle className="w-4 h-4" />
                      {errorMessage}
                    </div>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full bg-brand-cyan text-brand-charcoal py-5 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl shadow-brand-cyan/20 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'PROCESSING...' : (
                      <>{isAuthenticated ? 'SCHEDULE SERVICE' : 'SEND MESSAGE'} <Send className="w-5 h-5" /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
