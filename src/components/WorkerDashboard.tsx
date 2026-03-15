import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Clock, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc,
  updateDoc,
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
  userId: string;
}

export default function WorkerDashboard() {
  const { user, firebaseUser } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!firebaseUser) return;

    // Fetch bookings assigned to this worker
    const q = query(
      collection(db, 'bookings'),
      where('assignedWorkerId', '==', firebaseUser.uid),
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
      setError('Failed to fetch assigned bookings');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firebaseUser]);

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
      setError('Failed to update status');
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading Assignments...</div>;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Worker Portal</h1>
            <p className="text-brand-charcoal/60">View and manage your assigned restoration tasks.</p>
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
              <Clock className="w-12 h-12 text-brand-charcoal/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No Assignments</h3>
              <p className="text-brand-charcoal/60">You don't have any assigned tasks at the moment.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div 
                key={booking.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-brand-charcoal/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8"
              >
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{booking.service}</h3>
                      <p className="text-brand-charcoal/60 text-sm">{new Date(booking.date).toLocaleString()}</p>
                    </div>
                  </div>
                  {booking.message && (
                    <p className="text-sm text-brand-charcoal/70 bg-brand-white p-4 rounded-xl italic">
                      Client Note: "{booking.message}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 w-full md:w-48">
                  <span className={`text-center px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                    booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                    booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {booking.status}
                  </span>
                  
                  {booking.status !== 'completed' && (
                    <button 
                      onClick={() => handleUpdateStatus(booking.id, 'completed')}
                      className="w-full bg-brand-cyan text-brand-charcoal py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> MARK DONE
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
