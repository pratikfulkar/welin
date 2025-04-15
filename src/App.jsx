import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddUser from './pages/AddUser';
import PartnerForm from './pages/Partner';
import PartnerLogin from './pages/PartnerLogin';
import PartnerDashboard from './pages/PartnerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
// main app

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route 
            path="/partner" 
            element={
              <ProtectedRoute>
                <PartnerForm />
              </ProtectedRoute>
            } 
          />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          
          {/* Handle random/wrong routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

