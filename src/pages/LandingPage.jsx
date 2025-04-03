import React, { useEffect, useState } from "react";
import { Menu, X, Phone, Mail, MapPin, ArrowUp, Check, Heart, Shield, Clock, Users } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import logo from "../assets/logo_new.jpg";
import emailjs from "@emailjs/browser";

// Import images (you'll need to add these to your assets folder)
import heroImage from "../assets/hero01.jpg";
import partner1 from "../assets/rheja.jpg";
import partner2 from "../assets/universal.svg";
import partner3 from "../assets/zuno.png";
import aboutImage from "../assets/about.svg";
import contactImage from "../assets/contact.svg";
// import partner4 from "../assets/partner4.png";
// import partner5 from "../assets/partner5.png";

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [currentPartnerIndex, setCurrentPartnerIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    message: "",
  });
  const [selectedPlan, setSelectedPlan] = useState(null);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const partners = [
    { id: 1, image: partner1, name: "Partner 1" },
    { id: 2, image: partner2, name: "Partner 2" },
    { id: 3, image: partner3, name: "Partner 3" },
    // { id: 4, image: partner4, name: "Partner 4" },
    // { id: 5, image: partner5, name: "Partner 5" },
  ];

  const plans = [
    {
      name: "Basic Plan",
      price: "₹2,500",
      features: [
        "12 Teleconsultations with general physicians",
        "12 Psychologist Venting Sessions",
        "Affordable & Convenient virtual healthcare",
        "Perfect for individuals",
      ],
      popular: false,
    },
    {
      name: "Pro Plan",
      price: "₹4,500",
      features: [
        "Unlimited Teleconsultations",
        "12 Psychologist Venting Sessions",
        "Up to 40% Discount on Diagnostic Services",
        "Best for families and regular medical support",
      ],
      popular: true,
    },
    {
      name: "Elite Plan",
      price: "₹7,500",
      features: [
        "Unlimited Teleconsultations",
        "Unlimited Psychologist Venting Sessions",
        "Up to 40% Discount on Diagnostic Services",
        "Up to 60% Discount on Medicine Services",
        "Up to 10% Discount on Ambulance Services",
        "6 Free Diet Consultations",
      ],
      popular: false,
    },
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Patient",
      content: "The best healthcare experience I've ever had. Professional and caring staff.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Regular Customer",
      content: "Welin has transformed how I approach my health. Their teleconsultation service is excellent!",
      rating: 5,
    },
    {
      name: "Dr. Amit Kumar",
      role: "Healthcare Partner",
      content: "As a healthcare provider, I'm impressed with Welin's commitment to quality care.",
      rating: 5,
    },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPartnerIndex((prev) => (prev + 1) % partners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get environment variables
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_USER_ID;

    // Check if environment variables are defined
    if (!serviceID || !templateID || !userID) {
      console.error("EmailJS environment variables are not set.");
      alert("Failed to send the message. Please check your configuration.");
      return;
    }

    // Send the email
    emailjs.send(serviceID, templateID, formData, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          message: "",
        });
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send the message, please try again.");
      }
    );
  };

  const services = [
    {
      title: "Teleconsultation",
      description: "Access virtual consultations with expert doctors, including general physicians and specialists. Book appointments for second opinions and receive medical advice from home.",
      icon: <Phone className="w-8 h-8 text-[#77DC4E]" />,
    },
    {
      title: "Mental Wellness Support",
      description: "Engage in virtual venting sessions through chat or teleconsultation. Our expert psychologists provide confidential support for anxiety, depression, and stress management.",
      icon: <Heart className="w-8 h-8 text-[#77DC4E]" />,
    },
    {
      title: "Diagnostic Services",
      description: "Enjoy up to 40% discount on diagnostic tests. Book lab tests or full-body health packages with home sample collection and expert guidance on reports.",
      icon: <Shield className="w-8 h-8 text-[#77DC4E]" />,
    },
    {
      title: "Medicine Services",
      description: "Avail up to 60% discount on both generic and branded medicines. Get convenient home delivery, verified prescriptions, and auto-refill reminders.",
      icon: <Check className="w-8 h-8 text-[#77DC4E]" />,
    },
    {
      title: "Ambulance Services",
      description: "Get up to 10% discount on emergency and non-emergency ambulance services. Book instantly through our platform with 24/7 availability.",
      icon: <Clock className="w-8 h-8 text-[#77DC4E]" />,
    },
    {
      title: "Diet Consultation",
      description: "Receive personalized diet consultations from certified nutritionists. Get custom diet plans for weight management, diabetes, heart health, and overall wellness.",
      icon: <Users className="w-8 h-8 text-[#77DC4E]" />,
    },
  ];

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Enhanced with animations */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed w-full bg-white/80 backdrop-blur-md shadow-lg z-50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain max-w-[150px]"
              ></img>
              <span className="text-2xl font-bold" style={{ color: "#77DC4E" }}>
                Welin
              </span>
            </div>

            {/* Rest of the header content remains the same */}
            <nav className="hidden md:flex space-x-8">
              {["Services", "About Us", "Contact Us"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" ", "-"))
                  }
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
              {["Services", "About Us", "Contact Us"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase().replace(" ", "-"))
                  }
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-[#77DC4E] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </motion.header>

      {/* Hero Section with Parallax */}
      <motion.section 
        style={{ y }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#77DC4E] to-green-600">
            Your Health, Our Priority
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Comprehensive healthcare solutions for a better tomorrow
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("plans")}
            className="bg-[#77DC4E] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>
        <div className="absolute inset-0 bg-black/30 z-0" />
        <img 
          src={heroImage} 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about-us"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">About Welin</h2>
              <p className="text-gray-600 mb-6">
                Welin is a comprehensive healthcare platform dedicated to providing accessible and quality healthcare services to everyone. Our mission is to bridge the gap between patients and healthcare providers through innovative solutions.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-50 rounded-xl"
                >
                  <Heart className="w-8 h-8 text-[#77DC4E] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Patient Care</h3>
                  <p className="text-gray-600">Compassionate and personalized healthcare services</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gray-50 rounded-xl"
                >
                  <Shield className="w-8 h-8 text-[#77DC4E] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
                  <p className="text-gray-600">Highest standards of medical care and safety</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src={aboutImage} 
                alt="About Welin" 
                className="rounded-2xl shadow-2xl"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#77DC4E] p-3 rounded-full">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">10K+</p>
                    <p className="text-gray-600">Happy Patients</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section - Enhanced with animations */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive healthcare solutions for your well-being</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section - Enhanced */}
      <section id="plans" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Membership Plans</h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your healthcare needs</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => handlePlanSelect(plan.name)}
                className={`relative p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.name
                    ? "bg-[#77DC4E] text-white transform scale-105"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`absolute top-0 right-0 px-4 py-1 rounded-bl-lg rounded-tr-lg font-semibold ${
                      selectedPlan === plan.name
                        ? "bg-white text-[#77DC4E]"
                        : "bg-[#77DC4E] text-white"
                    }`}
                  >
                    Most Popular
                  </motion.div>
                )}
                <motion.h3 
                  className="text-2xl font-bold mb-4"
                  animate={{ color: selectedPlan === plan.name ? "white" : "inherit" }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.name}
                </motion.h3>
                <motion.div 
                  className="mb-6"
                  animate={{ color: selectedPlan === plan.name ? "white" : "inherit" }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`${selectedPlan === plan.name ? "text-white/80" : "text-gray-500"}`}>/month</span>
                </motion.div>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <motion.li 
                      key={feature} 
                      className="flex items-start"
                      animate={{ color: selectedPlan === plan.name ? "white" : "inherit" }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check className={`w-5 h-5 mr-2 flex-shrink-0 ${
                        selectedPlan === plan.name ? "text-white" : "text-[#77DC4E]"
                      }`} />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${currentPartnerIndex * 100}%` }}
              transition={{ duration: 0.5 }}
              className="flex"
            >
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="min-w-full flex items-center justify-center"
                >
                  <img
                    src={partner.image}
                    alt={partner.name}
                    className="h-20 object-contain mx-4"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg shadow-lg"
              >
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center">
                  <div className="ml-3">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section 
        id="contact-us"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src={contactImage} 
                alt="Contact" 
                className="rounded-2xl shadow-2xl"
              />
          <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-[#77DC4E] p-3 rounded-full">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-600">Call us at</p>
                    <p className="text-xl font-bold text-gray-800">+91 1234567890</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ x: 50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gray-800">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#77DC4E] focus:ring-2 focus:ring-[#77DC4E]/20 transition-all"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#77DC4E] focus:ring-2 focus:ring-[#77DC4E]/20 transition-all"
                    required
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#77DC4E] focus:ring-2 focus:ring-[#77DC4E]/20 transition-all"
                    required
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                    type="submit"
                  className="w-full bg-[#77DC4E] text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    Send Message
                </motion.button>
                </form>
            </motion.div>
            </div>
        </div>
      </motion.section>

      {/* Footer - Enhanced */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Welin</h3>
              <p className="text-gray-400">
                Redefining healthcare through innovation and compassion.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="text-gray-400 hover:text-white">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about-us" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact-us" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Services</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Teleconsultation</li>
                <li className="text-gray-400">Diagnostic Services</li>
                <li className="text-gray-400">Mental Wellness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons/links here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Welin. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button - Enhanced */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 bg-[#77DC4E] text-white p-3 rounded-full shadow-lg hover:bg-[#68c344] transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
