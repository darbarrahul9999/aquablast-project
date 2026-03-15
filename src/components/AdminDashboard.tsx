import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Users, Clock, AlertCircle, CheckCircle, UserCheck } from 'lucide-react';
import { 
  collection, 
  query, 
  onSnapshot, 
  doc,
  updateDoc,
  orderBy,
  getDocs,
  where
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
  assignedWorkerId?: string;
  userEmail?: string;
}

interface Worker {
  id: string;
  name: string;
  email: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all bookings
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Booking[];
      setBookings(bookingData);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'bookings');
      setError('Failed to fetch all bookings');
      setLoading(false);
    });

    // Fetch all workers
    const fetchWorkers = async () => {
      const wq = query(collection(db, 'users'), where('role', '==', 'worker'));
      const snapshot = await getDocs(wq);
      const workerData = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email
      })) as Worker[];
      setWorkers(workerData);
    };

    fetchWorkers();

    return () => unsubscribe();
  }, []);

  const handleAssignWorker = async (bookingId: string, workerId: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), {
        assignedWorkerId: workerId,
        status: 'confirmed'
      });
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
      setError('Failed to assign worker');
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status });
    } catch (err: any) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${bookingId}`);
      setError('Failed to update status');
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading Admin Panel...</div>;

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Control Center</h1>
            <p className="text-brand-charcoal/60">Oversee all restoration projects and staff assignments.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-brand-cyan/10 px-6 py-3 rounded-2xl border border-brand-cyan/20">
              <span className="text-brand-cyan font-bold">{bookings.length} Total Bookings</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-8 flex items-center gap-2 text-red-500 text-sm font-bold bg-red-50 p-4 rounded-xl">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {bookings.map((booking) => (
            <motion.div 
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-8 shadow-xl border border-brand-charcoal/5"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                      booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-600' : 
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {booking.status}
                    </span>
                    <h3 className="text-2xl font-bold">{booking.service}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-charcoal/60">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {new Date(booking.date).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Client ID: {booking.userId.substring(0, 8)}...
                    </div>
                  </div>

                  {booking.message && (
                    <div className="bg-brand-white p-4 rounded-xl text-sm italic">
                      "{booking.message}"
                    </div>
                  )}
                </div>

                <div className="lg:w-80 space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40">Assign Worker</label>
                    <select 
                      className="w-full bg-brand-white border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-cyan outline-none"
                      value={booking.assignedWorkerId || ''}
                      onChange={(e) => handleAssignWorker(booking.id, e.target.value)}
                    >
                      <option value="">Unassigned</option>
                      {workers.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdateStatus(booking.id, 'completed')}
                      className="flex-1 bg-emerald-500 text-white py-3 rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" /> COMPLETE
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(booking.id, 'cancelled')}
                      className="px-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
