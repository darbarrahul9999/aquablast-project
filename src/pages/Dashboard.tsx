import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) return (
    <div className="pt-32 text-center font-bold tracking-widest text-brand-charcoal/20 animate-pulse">
      SYNCING ROLES...
    </div>
  );

  if (!isAuthenticated || !user) return <Navigate to="/auth" replace />;

  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin" replace />;
    case 'worker':
      return <Navigate to="/worker" replace />;
    default:
      return <Navigate to="/client" replace />;
  }
}
