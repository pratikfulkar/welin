import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
// import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
// import Contact from './pages/Contact';
import AddUser from './pages/AddUser';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutUs />} /> */}
          <Route path="/services" element={<Services />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/adduser" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;