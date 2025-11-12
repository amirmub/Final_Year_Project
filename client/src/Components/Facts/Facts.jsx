import { useEffect } from "react";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import { useInView } from "react-intersection-observer";

function Facts() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
    });
  }, []);

  const facts = [
    { icon: "fa-chart-line", end: 190, label: "Projects Analyzed", delay: 0 },
    { icon: "fa-compress-arrows-alt", end: 55, label: "Reduced Duplication", delay: 100 },
    { icon: "fa-users", end: 650, label: "Active Users", delay: 200 },
    { icon: "fa-building", end: 4, label: "Departments", delay: 300 },
  ];

  return (
    <div className="container-fluid my-5 py-5" style={{ backgroundColor: "#5A8BC5" }}>
      <div className="container">
        <div className="row g-4">
          {facts.map(({ icon, end, label, delay }, index) => {
            const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.5 });

            return (
              <div
                key={index}
                ref={ref}
                className="col-md-6 col-lg-3 text-center"
                data-aos="fade-up"
                data-aos-delay={delay}
              >
                {/* ICON */}
                <i
                  className={`fas ${icon} mb-3`}
                  style={{ fontSize: "35px", color: "#FFC107" }}
                ></i>

                {/* NUMBER */}
                <h2 className="text-white mb-2">
                  {inView ? <CountUp end={end} duration={3} /> : 0}+
                </h2>

                {/* LABEL */}
                <p className="text-white mb-0">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Facts;
