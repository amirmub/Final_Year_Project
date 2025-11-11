import Facts from "../../Components/Facts/Facts";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";

export default function LandingPage() {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        className="text-center text-white d-flex align-items-center"
        style={{
          backgroundImage: "url('../../assets/img/ban copy.png')", // your image path here
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

      <section id="features" className="container text-center py-5">
        <h2 className="fw-bold mb-4 mt-4">Why Use Our System?</h2>
        <div className="row g-4 justify-content-center">
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-search fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Instant Detection</h5>
              <p className="text-muted">
                Check similarity in seconds with AI-powered analysis.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-archive fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Comprehensive Database</h5>
              <p className="text-muted">
                Access previous final-year research titles instantly.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-shield-check fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Prevent Duplication</h5>
              <p className="text-muted">
                Ensure your title is original and accepted.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-graph-up fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Similarity Score</h5>
              <p className="text-muted">
                Get a clear similarity percentage comparison.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-bell fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Real-Time Alerts</h5>
              <p className="text-muted">
                Receive updates when similar titles are detected.
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 rounded shadow border-0 h-100">
              <i className="bi bi-people fs-1 text-warning"></i>
              <h5 className="mt-3 fw-semibold">Easy Collaboration</h5>
              <p className="text-muted">
                Students and advisors work better together.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 text-center bg-light process-section" id="how-it-works">
        <div className="container-fluid py-5">
          <h2 className="fw-bold mb-5">Simple 3-Step Process</h2>

          <div className="d-flex justify-content-center align-items-center flex-wrap process-chain">
            {/* Step 1 */}
            <div className="col-12 col-md-3 position-relative mb-4 mb-md-0">
              <div className="step-item">
                <div className="step-circle">1</div>
                <h5 className="fw-semibold mt-3">Create Account</h5>
                <p className="text-muted small mb-0">Sign up using your email.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-12 col-md-3 position-relative mb-4 mb-md-0">
              <div className="step-item">
                <div className="step-circle">2</div>
                <h5 className="fw-semibold mt-3">Submit Title</h5>
                <p className="text-muted small mb-0">Enter your proposed research project title.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-12 col-md-3 position-relative">
              <div className="step-item">
                <div className="step-circle">3</div>
                <h5 className="fw-semibold mt-3">Get Results</h5>
                <p className="text-muted small mb-0">Receive similarity analysis instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Facts Section */}
      <div style={{marginTop: "90px"}}>
        <Facts />
      </div>

      {/* Testimonials */}
      <section className="container py-5 text-center my-5" id="about">
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
                <i className="bi bi-person-circle fs-1 text-warning"></i>
                <p className="mt-3 text-muted">"{s.text}"</p>
                <h6 className="fw-bold mt-3">{s.name}</h6>
                <p className="text-muted small">{s.dept}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center" style={{ background: "#F1F1F1",padding: "80px 0" }}>
        <h2 className="fw-bold">Ready to Check Your Title?</h2>
        <h6 className="my-3">Join hundreds of students ensuring their project titles are unique.</h6>
        <button className="btn px-5 py-2 bg-warning fw-semibold">Get Started Now</button>
        <h6 className="my-3">it's free for all private university students</h6>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
