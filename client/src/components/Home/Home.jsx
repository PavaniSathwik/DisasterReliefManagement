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
  marginBottom: "20px", // Added margin for better spacing
};

const imageStyle = {
  width: "100%",
  height: "300px", // Increased height for larger images
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
    title: "Disaster Relief Management System",
    description:
      "An integrated system designed to efficiently manage and allocate resources during disasters, ensuring timely and effective aid distribution. It prioritizes relief based on the severity of emergencies and tracks supplies in real-time.",
    image: "https://tse1.mm.bing.net/th?id=OIP.ZfBplFUkjS3-ixU14KA9awHaEK&pid=Api",
    department: "Sheba Technologies Ltd.",
    helpline: "101",
  },
  {
    title: "Virtual Reality-Based Post-Flood Relief Management",
    description:
      "A system utilizing virtual reality to streamline post-flood relief efforts. It allows victims to select needed supplies through holographic images projected from helicopters, ensuring targeted aid delivery.",
    image: "https://tse4.mm.bing.net/th?id=OIP.xUzeLOWzrdDkX8LKMA2a-QHaF5&pid=Api",
    department: "JETIR Research",
    helpline: "102",
  },
  {
    title: "Community-Based Disaster Relief Management System",
    description:
      "A community-driven approach to disaster relief, focusing on local participation and resource management. It emphasizes the importance of community involvement in disaster preparedness and response.",
    image: "https://tse2.mm.bing.net/th?id=OIP.86ZHK--FKomSi8vpZiz5VgHaET&pid=Api",
    department: "Community Outreach Programs",
    helpline: "1078",
  },
  {
    title: "Flood Relief Management System",
    description:
      "A specialized system developed to address the challenges posed by floods. It focuses on efficient resource allocation and real-time tracking to ensure effective relief operations during flood disasters.",
    image: "https://tse2.mm.bing.net/th?id=OIP.Tfc3dIh8LvFkjttjUTTOQQHaDt&pid=Api",
    department: "Flood Relief Coordination Center",
    helpline: "1098",
  },
];

const ReliefManagementSection = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-semibold mb-4">Relief Management Systems</h2>
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
          src="/disaster_scene.jpg"  // Keep this image intact as requested
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
