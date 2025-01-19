import React, { useEffect } from 'react';
import { Menu, X, Phone, Mail, MapPin, ArrowUp } from 'lucide-react';
import logo from '../assets/logo_new.jpg'

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { title: 'Teleconsultation', description: 'Connect with healthcare professionals from the comfort of your home' },
    { title: 'Diagnostic Services', description: 'Comprehensive testing and diagnostic facilities' },
    { title: 'Medicine', description: 'Quality healthcare products and medications' },
    { title: 'Mental Wellness', description: 'Professional mental health support and counseling' },
    { title: 'Ambulance Services', description: '24/7 emergency medical transportation' },
    { title: 'Diet Counselling', description: 'Personalized nutrition advice and meal planning' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img src={logo} alt='logo' className="h-12 w-auto object-contain max-w-[150px]"></img>
              <span className="text-2xl font-bold" style={{ color: '#77DC4E' }}>Welin</span>
            </div>
            
            {/* Rest of the header content remains the same */}
            <nav className="hidden md:flex space-x-8">
              {['Services', 'About Us', 'Contact Us'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-gray-600 hover:text-[#77DC4E] transition-colors"
                >
                  {item}
                </button>
              ))}
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              {['Services', 'About Us', 'Contact Us'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#77DC4E] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12" style={{ background: 'linear-gradient(to bottom, rgba(119, 220, 78, 0.1), white)' }}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Welcome to Welin
            </h1>
            <p className="text-xl text-gray-600">Wellness Redefined</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border"
                style={{ borderColor: 'rgba(119, 220, 78, 0.2)' }}
              >
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#77DC4E' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us" className="py-16" style={{ backgroundColor: 'rgba(119, 220, 78, 0.1)' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-4">
              At Welin, we are committed to redefining wellness through comprehensive healthcare solutions. 
              Our mission is to make quality healthcare accessible to everyone, everywhere.
            </p>
            <p className="text-gray-600">
              With a team of dedicated professionals and state-of-the-art facilities, 
              we ensure that your health and wellness journey is in safe hands.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" style={{ color: '#77DC4E' }} />
                  <span>+91 9867721337</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" style={{ color: '#77DC4E' }} />
                  <span>info@welin.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" style={{ color: '#77DC4E' }} />
                  <span>402, 24/Awing, Bimbisar nagar, Goregaon east, Mumbai 400065</span>
                </div>
              </div>
            </div>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#77DC4E]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#77DC4E]"
              />
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#77DC4E]"
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded hover:opacity-90 transition-opacity text-white"
                style={{ backgroundColor: '#77DC4E' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#77DC4E' }}>Welin</h2>
            <p className="text-gray-400">Wellness Redefined</p>
            <p className="text-sm text-gray-400 mt-4">© 2024 Welin. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: '#77DC4E' }}
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default LandingPage;