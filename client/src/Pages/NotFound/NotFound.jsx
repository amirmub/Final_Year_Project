// src/components/NotFound.jsx

import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
   <>
   <Header />
    <section className="d-flex align-items-center justify-content-center bg-light text-center" style={{ minHeight: "87vh" }}>
      <Container>
        <div>
          <h1 className="display-1 fw-bold text-warning">404</h1>
          <h2 className="fw-semibold mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Button variant="warning" className="fw-semibold" onClick={() => navigate("/")}>
            ⬅ Back to Home
          </Button>
        </div>
      </Container>
    </section>
    </>
  );
};

export default NotFound;
