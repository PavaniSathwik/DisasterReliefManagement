import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

// Styles
const cardStyle = {
  borderLeft: "5px solid #dc3545",
  background: "#fff",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  transition: "transform 0.3s ease-in-out",
  marginBottom: "20px",
};

const imageStyle = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "10px",
  marginBottom: "20px",
};

const buttonStyle = {
  background: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  transition: "0.3s ease-in-out",
};

const reliefManagementData = [
  {
    title: "AI-Powered Disaster Response & Relief Coordination",
    description:
      "Leveraging cutting-edge AI algorithms, this system ensures real-time decision-making for optimized resource distribution during natural disasters. It assesses risk zones, prioritizes affected regions, and provides live analytics to responders for immediate action.",
    image: "/AI disaster response system.png",
    department: "Sheba Technologies Ltd.",
    helpline: "101 - National Emergency Response",
  },
  {
    title: "Intelligent Disaster Coordination with Machine Learning",
    description:
      "An adaptive disaster management tool using artificial intelligence to predict impact zones, coordinate between emergency units, and dynamically allocate resources based on urgency and availability.",
    image: "/artificial intelligence disaster coordination.webp",
    department: "JETIR Research & Development",
    helpline: "102 - AI Emergency Command",
  },
  {
    title: "Emergency Resource Management using Predictive AI",
    description:
      "This system provides predictive models for pre-disaster planning and emergency logistics. It supports smart inventory control, predictive supply chain routing, and automated alert systems for communities.",
    image: "/emergency resource management AI.avif",
    department: "Community Emergency Services",
    helpline: "1078 - Resource Response Line",
  },
  {
    title: "Smart Disaster Management Dashboard",
    description:
      "A centralized control interface displaying real-time data feeds from sensors, drones, and satellites. It enables emergency officials to monitor conditions, track assets, and coordinate responses efficiently.",
    image: "/smart disaster management dashboard.png",
    department: "National Flood Relief Coordination Center",
    helpline: "1098 - Central Flood Command",
  },
];

const ReliefManagementSection = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-semibold mb-4">Technology Based Relief Management Systems</h2>
      <div className="row">
        {reliefManagementData.map((item, index) => (
          <motion.div
            key={index}
            className="col-md-6 mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div
              className="p-3"
              style={cardStyle}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img src={item.image} alt={item.title} style={imageStyle} />
              <h4 className="fw-bold mt-3">{item.title}</h4>
              <p className="fs-5">{item.description}</p>
              <p className="fs-6 text-muted">
                <strong>Developed By:</strong> {item.department}
              </p>
              <p className="fs-6 text-muted">
                <strong>Helpline:</strong> {item.helpline}
              </p>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <div className="position-relative w-100" style={{ height: "450px" }}>
        <img
          src="/disaster_scene.jpg"
          alt="Disaster Management"
          className="w-100 h-100 object-fit-cover"
          style={{ opacity: 0.8 }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white text-center bg-dark bg-opacity-50 px-3">
          <motion.h1
            className="display-4 fw-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Disaster Relief Initiative
          </motion.h1>
          <motion.p
            className="lead mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Join us in providing immediate support and aid to disaster victims.
            Your contributions help deliver essential supplies, medical
            assistance, and shelter to those in need. Together, we can bring
            hope, rebuild lives, and create a resilient future for affected
            communities.
          </motion.p>
        </div>
      </div>

      {/* Relief Management Section */}
      <ReliefManagementSection />
    </div>
  );
};

export default HomePage;
