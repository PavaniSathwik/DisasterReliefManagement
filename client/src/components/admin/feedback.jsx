import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Feedback = () => {
  // Sample feedbacks from users
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      userName: "John Doe",
      locality: "Downtown Street",
      incident: "Fireblast",
      message:
        "Your help has been great in the situation, and we are safe now. Thanks for the service and immediate response from your end and department.",
      photo: "https://via.placeholder.com/150",
      resolved: false,
    },
    {
      id: 2,
      userName: "Emma Watson",
      locality: "City Mall",
      incident: "Gas Leak",
      message:
        "A huge thanks to the team for their quick response. We appreciate the efforts taken to control the situation!",
      photo: "https://via.placeholder.com/150",
      resolved: false,
    },
  ]);

  // Mark feedback as resolved
  const markResolved = (id) => {
    setFeedbacks(
      feedbacks.map((feedback) =>
        feedback.id === id ? { ...feedback, resolved: true } : feedback
      )
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">📩 User Feedback - Incident Resolved</h2>
      <div className="row">
        {feedbacks.length === 0 ? (
          <p className="text-muted text-center">No feedback available</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className="col-md-6">
              <div className={`card p-3 mb-4 shadow-lg ${feedback.resolved ? "border-success" : "border-warning"}`}>
                <div className="card-body">
                  <h5 className="card-title text-danger">{feedback.incident} in {feedback.locality}</h5>
                  <p className="card-text"><strong>{feedback.userName}</strong>: {feedback.message}</p>
                  <img src={feedback.photo} alt="Feedback" className="img-fluid rounded mb-2" width="150" />
                  <p className="text-muted">📍 {feedback.locality}</p>
                  {!feedback.resolved ? (
                    <button className="btn btn-success btn-sm" onClick={() => markResolved(feedback.id)}>
                      Mark as Resolved ✅
                    </button>
                  ) : (
                    <p className="text-success">✅ Resolved</p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feedback;