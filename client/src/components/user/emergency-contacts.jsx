import React from "react";

const emergencyData = [
  {
    title: "Medical Emergency",
    numbers: "102, 1066",
    description: "Emergency medical assistance and ambulance services.",
    image: "/Blood Bank.png",
  },
  {
    title: "Police Emergency",
    numbers: "100, 103",
    description: "Emergency police assistance in critical situations.",
    image: "/Police Emergency.jpg",
  },
  {
    title: "Fire Department",
    numbers: "101",
    description: "Immediate fire rescue and firefighting services.",
    image: "/Fire Department.webp",
  },
  {
    title: "Food & Water Supply",
    numbers: "1800-112-345",
    description: "Essential food and water supply assistance.",
    image: "/Food & Water Supply.jpg",
  },
  {
    title: "Rescue Department",
    numbers: "108",
    description: "Emergency rescue services for disasters and accidents.",
    image: "/Rescue Department.webp",
  },
  {
    title: "Women Helpline",
    numbers: "1091",
    description: "Support and safety assistance for women.",
    image: "/Women Helpline.avif",
  },
  {
    title: "Child Helpline",
    numbers: "1098",
    description: "Help and protection for children in distress.",
    image: "/Child Helpline.avif",
  },
  {
    title: "Blood Bank",
    numbers: "1910",
    description: "Blood donation and emergency blood supply services.",
    image: "/Blood Bank.png",
  },
  {
    title: "National Disaster Helpline",
    numbers: "+91 11 2309 3054",
    description:
      "Emergency assistance for national disasters and relief efforts.",
    image: "/National Disaster Helpline.jpg",
  },
];

const EmergencyContacts = () => {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#333",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        Emergency Contacts
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {emergencyData.map((contact, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={contact.image}
              alt={contact.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px", textAlign: "center" }}>
              <h3 style={{ marginBottom: "10px", color: "#007bff" }}>
                {contact.title}
              </h3>
              <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                Contact: {contact.numbers}
              </p>
              <p style={{ color: "#555", fontSize: "0.9rem" }}>
                {contact.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyContacts;
