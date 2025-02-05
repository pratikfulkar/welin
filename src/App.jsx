import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AddUser from './pages/AddUser';
import PartnerForm from './pages/Partner';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/partner" element={<PartnerForm />}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

