import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="text-center text-white d-flex align-items-center"
        style={{
          backgroundImage: "url('../../assets/img/banners.png')", // your image path here
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "515px",
        }}
      >
        <div className="container">
          <h1 className="fw-bold">Ensure Your Project Title is Unique</h1>
          <p>
            Advanced AI-powered similarity detection for final year projects at
            Jimma University
          </p>
          <div className="mt-4">
            <button className="btn btn-warning px-4 me-3">
              Check Your Title Now
            </button>
            <button className="btn btn-outline-light px-4">Learn More</button>
          </div>
        </div>
      </section>

      <section className="container text-center py-5">
        <h2 className="fw-bold mb-4">Why Use Our System?</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-search fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Instant Detection</h5>
              <p className="text-muted">
                Check similarity in seconds with AI-powered analysis.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-archive fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Comprehensive Database</h5>
              <p className="text-muted">
                Access previous final-year research titles instantly.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-shield-check fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Prevent Duplication</h5>
              <p className="text-muted">
                Ensure your title is original and accepted.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-graph-up fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Similarity Score</h5>
              <p className="text-muted">
                Get a clear similarity percentage comparison.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-bell fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Real-Time Alerts</h5>
              <p className="text-muted">
                Receive updates when similar titles are detected.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-people fs-1 text-primary"></i>
              <h5 className="mt-3 fw-semibold">Easy Collaboration</h5>
              <p className="text-muted">
                Students and advisors work better together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center bg-light">
        <h2 className="fw-bold mb-4">Simple 3-Step Process</h2>
        <div className="container">
          <div className="d-flex justify-content-center align-items-center gap-5 flex-wrap">
            <div className="text-center">
              <div
                className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                1
              </div>
              <h6 className="fw-semibold mt-3">Create Account</h6>
              <p className="text-muted small">
                Sign up using your university email.
              </p>
            </div>
            <div
              className="border-top border-3 flex-grow-1"
              style={{ maxWidth: "120px" }}
            ></div>
            <div className="text-center">
              <div
                className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                2
              </div>
              <h6 className="fw-semibold mt-3">Submit Title</h6>
              <p className="text-muted small">
                Enter your proposed research project title.
              </p>
            </div>
            <div
              className="border-top border-3 flex-grow-1"
              style={{ maxWidth: "120px" }}
            ></div>
            <div className="text-center">
              <div
                className="rounded-circle bg-warning text-dark d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                3
              </div>
              <h6 className="fw-semibold mt-3">Get Results</h6>
              <p className="text-muted small">
                Receive similarity analysis instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="text-white text-center py-5"
        style={{ background: "#1976d2" }}
      >
        <div className="container d-flex justify-content-around">
          <div>
            <h3>290+</h3>
            <p>Projects Analyzed</p>
          </div>
          <div>
            <h3>55%</h3>
            <p>Reduced Duplication</p>
          </div>
          <div>
            <h3>580+</h3>
            <p>Active Users</p>
          </div>
          <div>
            <h3>5+</h3>
            <p>Departments</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold mb-4">What Students Say</h2>
        <div className="row g-4 justify-content-center">
          {[
            {
              name: "Abebe Tesfa",
              dept: "Computer Science, 4th Year",
              text: "This system helped me ensure my project title was completely unique. The process was simple and the results were instant!",
            },
            {
              name: "Maria Abate",
              dept: "Information Technology, 3rd Year",
              text: "I can now feel confident that my project title is original. This gave me peace of mind before submitting my proposal.",
            },
            {
              name: "Samuel Arada",
              dept: "Software Engineering, 4th Year",
              text: "The similarity detection is incredibly accurate. I got detailed feedback that helped me refine my final project title perfectly.",
            },
          ].map((s, i) => (
            <div className="col-md-4" key={i}>
              <div className="p-3 rounded shadow border-0 h-100 bg-white">
                <i className="bi bi-person-circle fs-1 text-primary"></i>
                <p className="mt-3 text-muted">"{s.text}"</p>
                <h6 className="fw-bold mt-3">{s.name}</h6>
                <p className="text-muted small">{s.dept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center py-5" style={{ background: "#fbc02d" }}>
        <h2 className="fw-bold">Ready to Check Your Title?</h2>
        <button className="btn btn-dark mt-3 px-4">Get Started Now</button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
