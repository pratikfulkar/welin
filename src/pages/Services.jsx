const Services = () => {
    const services = [
      {
        title: "Teleconsultation",
        description: "Connect with healthcare professionals remotely",
        icon: "🏥"
      },
      {
        title: "Diagnostic Services",
        description: "Comprehensive medical tests and diagnostics",
        icon: "🔬"
      },
      {
        title: "Medicine",
        description: "Online pharmacy and medicine delivery",
        icon: "💊"
      },
      {
        title: "Mental Wellness",
        description: "Professional mental health support",
        icon: "🧠"
      },
      {
        title: "Ambulance Services",
        description: "24/7 emergency ambulance support",
        icon: "🚑"
      },
      {
        title: "Diet Counselling",
        description: "Personalized nutrition guidance",
        icon: "🥗"
      }
    ];
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Services;