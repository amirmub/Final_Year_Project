import { Col, Container, Row, Button } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import { useState, useMemo } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import "./SubmittedTitle.css";

function SubmittedTitle() {
  const submittedData = [
    {
      id: 1,
      short: "SM",
      name: "Sarah Mohammed",
      time: "Submitted 2 days ago",
      dept: "Computer Science",
      titles: [
        "AI-Powered Student Performance Prediction System",
        "Machine Learning Based Academic Analytics Platform",
        "Predictive Model for Student Success Using AI",
      ],
    },
    {
      id: 2,
      short: "AY",
      name: "Ahmed Yusuf",
      time: "Submitted 3 days ago",
      dept: "Information Science",
      titles: [
        "Blockchain-Based Supply Chain Management System",
        "Decentralized Logistics Tracking Using Blockchain",
        "Smart Contract System for Supply Chain Transparency",
      ],
    },
    {
      id: 3,
      short: "AM",
      name: "Amir Mubarek",
      time: "Submitted 5 days ago",
      dept: "Software Engineering",
      titles: [
        "IoT Fleet Vehicle Monitoring System",
        "Smart Transport Analytics Dashboard",
        "AI Traffic Congestion Predictor",
      ],
    },
    {
      id: 4,
      short: "HB",
      name: "Hana Bekele",
      time: "Submitted 1 day ago",
      dept: "Information Technology",
      titles: [
        "E-Learning Recommendation Engine",
        "Adaptive Course Personalization System",
        "AI Tutor Chatbot for Students",
      ],
    },
  ];

  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterDept, setFilterDept] = useState("");

  const rowsPerPage = 2;

  // Filter, search, sort logic
  const filteredData = useMemo(() => {
    let data = [...submittedData];

    if (filterDept) data = data.filter((d) => d.dept === filterDept);

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.dept.toLowerCase().includes(q) ||
          d.titles.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortOption) {
      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
        data.sort((a, b) => a.id - b.id);
        break;
      case "mostRecent":
        data.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return data;
  }, [searchQuery, sortOption, filterDept]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIdx, startIdx + rowsPerPage);

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const departments = ["All", ...new Set(submittedData.map((d) => d.dept))];

  return (
    <>
      <Header />

      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <AdminSidebar />
          </Col>

          <Col
            md={9}
            lg={10}
            className="px-5 py-4"
            style={{ backgroundColor: "#f4f6f9", minHeight: "100vh" }}
          >
            <h4 className="fw-bold mb-2 text-primary">Submitted Titles</h4>

            {/* --- SEARCH + SORT + FILTER BAR --- */}
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 submitted-search-box gap-2">
              {/* Search Input (keep original) */}
              <div
                className="search-input-wrapper d-flex align-items-center"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "50px",
                  padding: "0.2rem 0.5rem",
                  minWidth: 250,
                }}
              >
                <i className="bi bi-search ms-2 me-2"></i>
                <input
                  type="text"
                  placeholder="Search members..."
                  className="search-input-field"
                  style={{
                    border: "none",
                    backgroundColor: "#fff",
                    color: "#000",
                    outline: "none",
                  }}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* Sort & Filter */}
              <div className="d-flex align-items-center gap-2 flex-wrap">
                {/* Sort Dropdown */}
                <div className="position-relative" style={{ minWidth: 180 }}>
                  <select
                    className="form-select rounded-pill shadow-sm"
                    style={{
                      padding: "0.35rem 1rem",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      appearance: "none",
                      background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center`,
                      backgroundSize: "12px",
                    }}
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="">
                      {
                        <>
                          <FaSort className="me-1" /> Sort
                        </>
                      }
                    </option>
                    <option value="mostRecent">Most Recent</option>
                    <option value="oldest">Oldest</option>
                    <option value="az">A → Z</option>
                    <option value="za">Z → A</option>
                  </select>
                </div>

                {/* Filter Dropdown */}
                <div className="position-relative" style={{ minWidth: 180 }}>
                  <select
                    className="form-select rounded-pill shadow-sm"
                    style={{
                      padding: "0.35rem 1rem",
                      fontSize: "14px",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      appearance: "none",
                      background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center`,
                      backgroundSize: "12px",
                    }}
                    value={filterDept}
                    onChange={(e) => {
                      setFilterDept(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">
                      {
                        <>
                          <FaFilter className="me-1" /> Filter
                        </>
                      }
                    </option>
                    {departments.map((d, i) => (
                      <option key={i} value={d === "All" ? "" : d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="table-responsive shadow-sm rounded-0 bg-white p-0 m-0">
              <table className="table table-hover align-middle">
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ border: "1.5px solid #dee2e6" }}>#</th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>Student</th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>
                      Department
                    </th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>
                      Project Titles
                    </th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>
                      Similarity
                    </th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>Priority</th>
                    <th style={{ border: "1.5px solid #dee2e6" }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRows.map((row, index) => (
                    <tr key={row.id}>
                      <td style={{ border: "1.5px solid #dee2e6" }}>
                        {startIdx + index + 1}
                      </td>
                      <td
                        style={{
                          border: "1.5px solid #dee2e6",
                          fontSize: "14.5px",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            className="rounded-circle bg-primary text-white fw-bold d-flex justify-content-center align-items-center"
                            style={{
                              width: 30,
                              height: 30,
                              fontSize: "12.5px",
                            }}
                          >
                            {row.short}
                          </div>
                          <div>
                            <div className="fw-semibold">{row.name}</div>
                            <div className="small text-muted">{row.time}</div>
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          border: "1.5px solid #dee2e6",
                          fontSize: "14.5px",
                        }}
                      >
                        {row.dept}
                      </td>
                      <td style={{ border: "1.5px solid #dee2e6" }}>
                        {row.titles.map((t, i) => (
                          <div
                            key={i}
                            className="pb-2 mb-2"
                            style={{ borderBottom: "1.5px solid #e0e0e0" }}
                          >
                            <span
                              className="fw-bold"
                              style={{ fontSize: "13px" }}
                            >
                              {t}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td style={{ border: "1.5px solid #dee2e6" }}></td>
                      <td style={{ border: "1.5px solid #dee2e6" }}></td>
                      <td style={{ border: "1.5px solid #dee2e6" }}></td>
                    </tr>
                  ))}

                  {currentRows.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted py-4">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
              <Button
                variant="warning"
                className="fw-semibold rounded-lg" 
                disabled={currentPage === 1}
                onClick={prevPage}
                style={{ fontSize: "14px" }}
              >
                Previous
              </Button>
              <div className="fw-semibold" style={{ fontSize: "14px" }}>
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="primary"
                className="rounded-lg"
                disabled={currentPage === totalPages}
                onClick={nextPage}
                style={{ fontSize: "14.5px" }}
              >
                Next →
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SubmittedTitle;
