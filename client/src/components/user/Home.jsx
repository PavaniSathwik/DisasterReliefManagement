import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const UserHome = () => {
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
            Hello, this is User Home
          </motion.h1>
          <motion.p
            className="lead mt-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Welcome to your dashboard!
          </motion.p>
        </div>
      </div>

      {/* Relief Management Section */}
      <div className="container text-center py-5">
        <h2 className="fw-semibold mb-4">Relief Management Systems</h2>
        <p>
          Join us in providing immediate support and aid to disaster victims.
          Your contributions help deliver essential supplies, medical assistance, and shelter to those in need.
        </p>
      </div>
    </div>
  );
};

export default UserHome;
