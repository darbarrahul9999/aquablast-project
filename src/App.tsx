import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import WorkerPortal from './pages/WorkerPortal';
import ClientHome from './pages/ClientHome';
import RoleGuard from './components/RoleGuard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Smart Redirect Route */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Role-Specific Protected Routes */}
              <Route 
                path="/admin" 
                element={
                  <RoleGuard allowedRoles={['admin']}>
                    <AdminPanel />
                  </RoleGuard>
                } 
              />
              <Route 
                path="/worker" 
                element={
                  <RoleGuard allowedRoles={['worker']}>
                    <WorkerPortal />
                  </RoleGuard>
                } 
              />
              <Route 
                path="/client" 
                element={
                  <RoleGuard allowedRoles={['client']}>
                    <ClientHome />
                  </RoleGuard>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
