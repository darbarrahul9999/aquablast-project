import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Calendar, Trash2, Clock, AlertCircle } from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  deleteDoc, 
  doc,
  orderBy 
} from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../firestoreUtils';

interface Booking {
  id: string;
  service: string;
  date: string;
  status: string;
  message: string;
}

export default function ClientDashboard() {
  const { user, firebaseUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseUser) return;

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', firebaseUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingData);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'bookings');
      setError('Failed to fetch bookings');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseUser]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      await deleteDoc(doc(db, 'bookings', id)).catch(err => handleFirestoreError(err, OperationType.DELETE, `bookings/${id}`));
    } catch (err: any) {
      console.error('Delete error:', err);
      setError('Failed to delete booking');
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-brand-charcoal/60">Manage your service bookings and restoration projects.</p>
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-[2rem] p-12 text-center border border-dashed border-brand-charcoal/20">
              <Calendar className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Bookings Yet</h3>
              <p className="text-brand-charcoal/60">You haven't scheduled any restoration services yet.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-6 shadow-lg border border-brand-charcoal/5 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{booking.service}</h3>
                    <p className="text-brand-charcoal/60 text-sm">
                      {new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDelete(booking.id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
