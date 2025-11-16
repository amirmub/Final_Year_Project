// src/components/Unauthorized.jsx

import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <section
        className="d-flex align-items-center justify-content-center bg-light text-center"
        style={{ minHeight: "87vh" }}
      >
        <Container>
          <div>
            <h1 className="display-1 fw-bold text-danger">401</h1>
            <h2 className="fw-semibold mb-3">Unauthorized Access</h2>
            <p className="text-muted mb-4">
              You don’t have permission to view this page. Please login or switch
              to an authorized account.
            </p>

            <Button
              variant="danger"
              className="fw-semibold me-2"
              onClick={() => navigate("/login")}
            >
              🔐 Go to Login
            </Button>

            <Button
              variant="warning"
              className="fw-semibold"
              onClick={() => navigate("/")}
            >
              ⬅ Back to Home
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Unauthorized;
