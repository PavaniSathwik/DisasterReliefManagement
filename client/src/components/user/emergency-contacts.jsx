import React from "react";

const emergencyData = [
  {
    title: "Medical Emergency",
    numbers: "102, 1066",
    description: "Emergency medical assistance and ambulance services available 24/7 for urgent healthcare needs.",
    image: "/Blood Bank.png",
    icon: "🩺",
    tips: [
      "Call immediately for serious injuries or sudden illness.",
      "Provide location details for quick ambulance dispatch.",
    ],
  },
  {
    title: "Police Emergency",
    numbers: "100, 103",
    description: "Immediate police assistance for crimes, safety threats, and law enforcement emergencies.",
    image: "/Police Emergency.jpg",
    icon: "👮‍♂️",
    tips: [
      "Use in cases of theft, assault, or suspicious activities.",
      "Stay calm and provide detailed information.",
    ],
  },
  {
    title: "Fire Department",
    numbers: "101",
    description: "Fire rescue and firefighting services responding to residential, industrial, and forest fires.",
    image: "/Fire Department.webp",
    icon: "🔥",
    tips: [
      "Alert if smoke or fire detected nearby.",
      "Clear area for fast rescue operations.",
    ],
  },
  {
    title: "Food & Water Supply",
    numbers: "1800-112-345",
    description: "Essential support for food and clean water distribution during emergencies and natural disasters.",
    image: "/Food & Water Supply.jpg",
    icon: "🍎💧",
    tips: [
      "Register for aid in affected zones.",
      "Report shortages immediately.",
    ],
  },
  {
    title: "Rescue Department",
    numbers: "108",
    description: "Specialized disaster rescue team available for accidents, floods, earthquakes, and other crises.",
    image: "/Rescue Department.webp",
    icon: "🚑",
    tips: [
      "Call for trapped or injured persons.",
      "Follow instructions from rescue personnel.",
    ],
  },
  {
    title: "Women Helpline",
    numbers: "1091",
    description: "Confidential support and emergency help for women facing violence or harassment.",
    image: "/Women Helpline.avif",
    icon: "♀️",
    tips: [
      "Immediate help for safety concerns.",
      "Counseling available 24/7.",
    ],
  },
  {
    title: "Child Helpline",
    numbers: "1098",
    description: "Support and protection for children in distress or facing abuse, exploitation, or emergencies.",
    image: "/Child Helpline.avif",
    icon: "👶",
    tips: [
      "Urgent assistance for child safety.",
      "Report abuse anonymously.",
    ],
  },
  {
    title: "Blood Bank",
    numbers: "1910",
    description: "Centralized blood donation and emergency blood supply for hospitals and critical patients.",
    image: "/Blood Bank.png",
    icon: "🩸",
    tips: [
      "Donate blood to save lives.",
      "Contact for urgent blood type needs.",
    ],
  },
  {
    title: "National Disaster Helpline",
    numbers: "+91 11 2309 3054",
    description: "Centralized helpline coordinating relief efforts for floods, earthquakes, and nationwide emergencies.",
    image: "/National Disaster Helpline.jpg",
    icon: "🌪️",
    tips: [
      "Report disaster situations with location.",
      "Request emergency aid and shelter.",
    ],
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
        backgroundColor: "#f7f9fc",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "40px",
          color: "#1a2935",
          fontSize: "2.5rem",
          fontWeight: "900",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textShadow: "1px 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        📞 Emergency Contacts & Support
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
        }}
      >
        {emergencyData.map((contact, index) => (
          <div
            key={index}
            style={{
              background: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
              overflow: "hidden",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              paddingBottom: "20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow = "0 14px 28px rgba(0,0,0,0.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
            }}
          >
            <img
              src={contact.image}
              alt={contact.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderBottom: "4px solid #007bff",
              }}
              loading="lazy"
            />
            <div style={{ padding: "20px 15px", flexGrow: 1 }}>
              <h3
                style={{
                  marginBottom: "12px",
                  color: "#007bff",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                }}
              >
                <span role="img" aria-label="icon" style={{ fontSize: '1.8rem' }}>
                  {contact.icon}
                </span>
                {contact.title}
              </h3>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  marginBottom: "14px",
                  color: "#2c3e50",
                }}
              >
                Contact: <span style={{ color: "#1a2935" }}>{contact.numbers}</span>
              </p>
              <p
                style={{
                  color: "#495c6c",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  marginBottom: "18px",
                  padding: "0 10px",
                }}
              >
                {contact.description}
              </p>
              <div
                style={{
                  backgroundColor: "#e9f0fc",
                  borderRadius: "12px",
                  padding: "10px",
                  fontSize: "0.9rem",
                  color: "#3261a8",
                  boxShadow: "inset 2px 2px 6px rgba(50,97,168,0.2)",
                  maxWidth: "90%",
                  margin: "0 auto",
                }}
              >
                <strong>Helpful Tips:</strong>
                <ul
                  style={{
                    textAlign: "left",
                    margin: "8px 0 0 16px",
                    padding: 0,
                    listStyle: "disc",
                    lineHeight: "1.4",
                  }}
                >
                  {contact.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p
        style={{
          marginTop: "40px",
          textAlign: "center",
          color: "#555",
          fontSize: "1rem",
          fontStyle: "italic",
        }}
      >
        Please save these numbers on your phone. Sharing this information can save lives during emergencies.
      </p>
    </div>
  );
};

export default EmergencyContacts;
