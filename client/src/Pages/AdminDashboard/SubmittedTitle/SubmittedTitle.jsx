import { Col, Container, Row, Button } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import { useState, useMemo, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import "./SubmittedTitle.css";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";

function SubmittedTitle() {
  const authData = getAuth();
  const token = authData?.token;
  const userId = authData?.id;

  // States
  const [submittedData, setSubmittedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 2;

  // ---------- FETCH DATA ----------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${userId}/titles`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status === "success") {
          const transformed = res.data.message.map((item) => ({
            id: item._id,
            name: item.name,
            dept: item.department,
            createdAt: item.createdAt,
            time: new Date(item.createdAt).toLocaleDateString(),
            short: item.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase(),
            titles: [item.title_1, item.title_2, item.title_3].filter(Boolean),
          }));
          setSubmittedData(transformed);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  // Filter, search, sort logic
  const filteredData = useMemo(() => {
    let data = [...submittedData];

    // Department filter
    if (filterDept && filterDept !== "All") {
      data = data.filter((d) => d.dept === filterDept);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.dept.toLowerCase().includes(q) ||
          d.titles.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortOption) {
      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "mostRecent":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return data;
  }, [searchQuery, sortOption, filterDept, submittedData]);

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

          {loading ? (
            <div className="d-flex flex-wrap align-items-center justify-content-center " style={{height: "70vh"}}>
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <Col
              md={9}
              lg={10}
              className="px-5 py-3"
              style={{ backgroundColor: "#f4f6f9", minHeight: "88vh" }}
            >
              <h4 className="fw-bold mb-2 mt-2 text-primary">
                Submitted Titles
              </h4>

              {/* --- SEARCH + SORT + FILTER --- */}
              <div className="d-flex flex-wrap align-items-center justify-content-between mb-2 submitted-search-box gap-2">
                {/* Search */}
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
                        appearance: "none",
                        background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center`,
                        backgroundSize: "12px",
                        cursor: "pointer",
                      }}
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                      <option value="">
                        <FaSort className="me-1" /> Sort
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
                        appearance: "none",
                        background: `#fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236c757d' viewBox='0 0 16 16'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E") no-repeat right 12px center`,
                        backgroundSize: "12px",
                        cursor: "pointer",
                      }}
                      value={filterDept}
                      onChange={(e) => {
                        setFilterDept(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="">
                        <FaFilter className="me-1" /> Filter
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
                      <th style={{ border: "1.5px solid #dee2e6" }}>
                        Priority
                      </th>
                      <th style={{ border: "1.5px solid #dee2e6" }}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentRows.length > 0 ? (
                      currentRows.map((row, index) => (
                        <tr key={row.id}>
                          {/* # */}
                          <td style={{ border: "1.5px solid #dee2e6" }}>
                            {startIdx + index + 1}
                          </td>

                          {/* Student */}
                          <td style={{ border: "1.5px solid #dee2e6" }}>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded-circle bg-primary text-white text-center fw-bold d-flex justify-content-center align-items-center"
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
                                <div className="small text-muted">
                                  {row.time}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Department */}
                          <td style={{ border: "1.5px solid #dee2e6 " }}>
                            <div className="text-center">{row.dept}</div>
                          </td>

                          {/* Project Titles (constant height + scroll) */}
                          <td
                            style={{
                              border: "1.5px solid #dee2e6",
                              padding: 0,
                              height: "135px",
                              maxHeight: "135px",
                              overflowY: "auto",
                            }}
                          >
                            {row.titles.map((t, i) => {
                              const words = t.split(" ");
                              const isLong = words.length > 6;
                              const shortTitle = isLong
                                ? words.slice(0, 6).join(" ") + "..."
                                : t;

                              return (
                                <div
                                  key={i}
                                  style={{
                                    borderBottom:
                                      i === row.titles.length - 1
                                        ? "none"
                                        : "1.5px solid #dee2e6",
                                    padding: "0.5rem 1rem",
                                    width: "100%",
                                    boxSizing: "border-box",
                                  }}
                                  className="project-title-item"
                                  title={t}
                                >
                                  <span
                                    className="fw-bold"
                                    style={{
                                      fontSize: "13px",
                                      display: "block",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {shortTitle}
                                  </span>
                                </div>
                              );
                            })}
                          </td>

                          {/* Similarity */}
                          <td style={{ border: "1.5px solid #dee2e6" }}></td>

                          {/* Priority */}
                          <td style={{ border: "1.5px solid #dee2e6" }}></td>

                          {/* Actions */}
                          <td style={{ border: "1.5px solid #dee2e6" }}></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center text-muted py-4"
                          style={{ border: "1.5px solid #dee2e6" }}
                        >
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              {currentRows.length > 0 && (
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
              )}
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}

export default SubmittedTitle;
