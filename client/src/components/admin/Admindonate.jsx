import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Table, Badge } from "react-bootstrap";

const AdminDonate = () => {
  const [donors, setDonors] = useState([]);

  // Base URL for uploaded images
  const IMAGE_BASE_URL = "http://localhost:3002/uploads/";

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:3002/api/admin/donations");
        setDonors(res.data.donations || []);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">🙏 Donations Panel</h2>
      <div className="row">
        {donors.length === 0 ? (
          <p className="text-muted text-center">No Donations Yet</p>
        ) : (
          donors.map((donor) => (
            <div key={donor._id} className="col-md-6 mb-4">
              <Card className="shadow-lg p-4 rounded border-0 bg-white">
                <div className="text-center">
                  <img
                    src={donor.packagedPhoto ? IMAGE_BASE_URL + donor.packagedPhoto : "/placeholder.jpg"}
                    alt="Package"
                    className="rounded-circle border border-primary mb-2"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <h4 className="text-dark fw-bold">{donor.name}</h4>
                  <p className="text-muted"><strong>📍 Location:</strong> {donor.location}</p>
                  <Badge bg="info" className="mb-3">{donor.status || "Pending"}</Badge>
                </div>

                <Table bordered hover size="sm" className="mb-3">
                  <tbody>
                    <tr>
                      <td><strong>🎁 Donation Type:</strong></td>
                      <td>{donor.donationType}</td>
                    </tr>
                    <tr>
                      <td><strong>⚠️ Incident:</strong></td>
                      <td>{donor.incident}</td>
                    </tr>
                    <tr>
                      <td><strong>💬 Purpose:</strong></td>
                      <td>{donor.message}</td>
                    </tr>
                    <tr>
                      <td><strong>💲 Amount:</strong></td>
                      <td>{donor.amount}</td>
                    </tr>
                    <tr>
                      <td><strong>📦 Items:</strong></td>
                      <td>{donor.items?.join(", ")}</td>
                    </tr>
                  </tbody>
                </Table>

                <div className="row text-center mb-3">
                  <div className="col-12 col-md-4 mb-2">
                    <img
                      src={donor.packagedPhoto ? IMAGE_BASE_URL + donor.packagedPhoto : "/placeholder.jpg"}
                      alt="Package"
                      className="img-fluid rounded"
                      style={{ maxHeight: "120px" }}
                    />
                    <p className="text-muted mt-1">📦 Package</p>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <img
                      src={donor.repPhoto ? IMAGE_BASE_URL + donor.repPhoto : "/placeholder.jpg"}
                      alt="Recipient"
                      className="img-fluid rounded"
                      style={{ maxHeight: "120px" }}
                    />
                    <p className="text-muted mt-1">👤 Recipient</p>
                  </div>
                  <div className="col-12 col-md-4 mb-2">
                    <img
                      src={donor.donorWithRepPhoto ? IMAGE_BASE_URL + donor.donorWithRepPhoto : "/placeholder.jpg"}
                      alt="Donor"
                      className="img-fluid rounded"
                      style={{ maxHeight: "120px" }}
                    />
                    <p className="text-muted mt-1">🙋 Donor</p>
                  </div>
                </div>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDonate;
