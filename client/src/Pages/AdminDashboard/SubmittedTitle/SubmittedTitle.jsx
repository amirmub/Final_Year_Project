import { Col, Container, Row, Button } from "react-bootstrap";
import Header from "../../../Components/Header/Header";
import AdminSidebar from "../../../Components/AdminSidebar/AdminSidebar";
import { useState, useMemo, useEffect } from "react";
import { FaFilter, FaSort } from "react-icons/fa";
import "./SubmittedTitle.css";
import { getAuth } from "../../../utils/auth";
import axios from "../../../utils/axios";
import toast, { Toaster } from "react-hot-toast";
import ReactMarkdown from "react-markdown";

function SubmittedTitle() {
  const authData = getAuth();
  const token = authData?.token;
  const userId = authData?.id;
  console.log("Authenticated user ID:", userId);

  const [submittedData, setSubmittedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 2;

  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [notes, setNotes] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  // ✅ ADD HERE
  const getBadge = (value) => {
    if (value > 70) {
      return { text: "High", color: "red" };
    } else if (value >= 40) {
      return { text: "Medium", color: "orange" };
    } else {
      return { text: "Low", color: "green" };
    }
  };

  const handleNoteChange = (index, value) => {
    setNotes((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleView = (row, mode = "full") => {
    setSelectedRow({ ...row, viewMode: mode });
    setShowModal(true);
  };

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users/${userId}/titles`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Raw submitted titles data:", res);

        if (res.data.status === "success") {
          const transformed = res.data.message.map((item) => {
            // ✅ normalize titles safely
            const titles = [item.title_1, item.title_2, item.title_3]
              .filter(Boolean)
              .map((t) => ({
                text: t?.text || "No title",
                status: t?.status || "pending",
                note: t?.note || "",
                similarity: t?.similarity_percent || 0, // ✅ ADD
                report: t?.ai_report || "", // ✅ ADD
              }));
            const getBadge = (value) => {
              if (value > 70) {
                return { text: "High", color: "red" };
              } else if (value >= 40) {
                return { text: "Medium", color: "orange" };
              } else {
                return { text: "Low", color: "green" };
              }
            };

            return {
              id: item._id,
              name: item.name,
              dept: item.department,
              createdAt: item.createdAt,
              time: new Date(item.createdAt).toLocaleDateString(),

              // ✅ initials
              short: item.name
                ? item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                : "NA",

              titles, // ✅ FIXED STRUCTURE
            };
          });

          setSubmittedData(transformed);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchData();
    }
  }, [userId, token]);

  // ================= FILTER + SORT =================
  const filteredData = useMemo(() => {
    let data = [...submittedData];

    if (filterDept && filterDept !== "All") {
      data = data.filter((d) => d.dept === filterDept);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();

      data = data.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.dept.toLowerCase().includes(q) ||
          d.titles.some((t) => (t.text || "").toLowerCase().includes(q)),
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
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "mostRecent":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    return data;
  }, [submittedData, searchQuery, sortOption, filterDept]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIdx, startIdx + rowsPerPage);

  const updateTitleStatus = (id, field, status, note) => {
    setSubmittedData((prev) =>
      prev.map((user) => {
        if (user.id !== id) return user;

        return {
          ...user,
          titles: user.titles.map((t, idx) => {
            const key = `title_${idx + 1}`;
            if (key !== field) return t;

            return {
              ...t,
              status,
              note: note || t.note,
            };
          }),
        };
      }),
    );

    // ALSO update modal state
    setSelectedRow((prev) => {
      if (!prev || prev.id !== id) return prev;

      return {
        ...prev,
        titles: prev.titles.map((t, idx) => {
          const key = `title_${idx + 1}`;
          if (key !== field) return t;

          return {
            ...t,
            status,
            note: note || t.note,
          };
        }),
      };
    });
  };

  // ================= APPROVE =================
 const handleApprove = async (id, field, index) => {
  try {
    setActionLoading(field);

    await axios.patch(
      `/users/${userId}/titles/${id}/${field}/approve`,
      { note: notes[index] || "" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    updateTitleStatus(id, field, "approved", notes[index] || "");

    toast.success("Title approved successfully ✅");

  } catch (err) {
    const message =
      err.response?.data?.message || "Failed to approve title";

    toast.error(message);

  } finally {
    setActionLoading(null);
  }
};

  // ================= REJECT =================
  const handleReject = (id, field, index) => {
    toast((t) => (
      <div>
        <p className="mb-2 fw-semibold">
          Are you sure you want to reject this title?
        </p>

        <div className="d-flex gap-2">
          <button
            className="btn btn-danger btn-sm"
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                setActionLoading(field);

                await axios.patch(
                  `/users/${userId}/titles/${id}/${field}/reject`,
                  { note: notes[index] || "" },
                  { headers: { Authorization: `Bearer ${token}` } },
                );

                updateTitleStatus(id, field, "rejected", notes[index] || "");

                toast.success("Title rejected successfully");
              } catch (err) {
                toast.error("Failed to reject title");
              } finally {
                setActionLoading(null);
              }
            }}
          >
            Yes, Reject
          </button>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${userId}/titles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted");

      // ✅ THIS IS THE KEY FIX
      setSubmittedData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const allowedDepartments = [
    "Computer Science",
    "Information Science",
    "Software Engineering",
    "Information Technology",
  ];

  const departments = ["All", ...allowedDepartments];

  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const cleanReport = (text = "") => {
    return text
      .replace(/\*\*/g, "") // remove **
      .replace(/\*/g, "") // remove *
      .replace(/__/g, "") // remove __
      .replace(/#/g, "") // remove #
      .replace(/`/g, "") // remove `
      .replace(/-\s/g, "• ") // convert - to bullet
      .trim();
  };

  return (
    <>
      <Toaster position="top-center" />
      <Header />
      <Container fluid>
        <Row>
          <Col md={3} lg={2} className="p-0">
            <AdminSidebar />
          </Col>

          {loading ? (
            <div
              className="d-flex flex-wrap align-items-center justify-content-center "
              style={{ height: "70vh" }}
            >
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

              {/* SEARCH + SORT + FILTER */}
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
                        AI Report
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
                              const text = t?.text || "";

                              const words = text.split(" ");
                              const isLong = words.length > 6;

                              const shortTitle = isLong
                                ? words.slice(0, 6).join(" ") + "..."
                                : text;

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
                                  title={text} // ✅ FIXED
                                >
                                  <span
                                    className="fw-bold"
                                    style={{
                                      fontSize: "14px",
                                      display: "block",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {shortTitle}
                                  </span>

                                  {/* ✅ OPTIONAL: show status */}
                                  {/* <small
          style={{
            color:
              t.status === "approved"
                ? "green"
                : t.status === "rejected"
                ? "red"
                : "orange",
            fontSize: "11px",
          }}
        >
          {t.status}
        </small> */}

                                  {/* ✅ OPTIONAL: show note */}
                                  {t.note && (
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        color: "#555",
                                      }}
                                    >
                                      Note: {t.note}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </td>

                          {/* Similarity */}
                          <td style={{ border: "1.5px solid #dee2e6" }}>
                            <div className="d-flex flex-column gap-2">
                              {row.titles.map((t, i) => {
                                const value = t.similarity || 0;

                                let color = "#28a745"; // green
                                if (value > 70)
                                  color = "#dc3545"; // red
                                else if (value >= 40) color = "#fd7e14"; // orange

                                return (
                                  <div key={i}>
                                    {/* % TEXT */}
                                    <div
                                      style={{
                                        fontSize: "11px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {value.toFixed(1)}%
                                    </div>

                                    {/* PROGRESS BAR */}
                                    <div
                                      style={{
                                        height: "6px",
                                        background: "#eee",
                                        borderRadius: "5px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: `${value}%`,
                                          height: "100%",
                                          background: color,
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </td>

                          {/*  AI Report */}
                          <td style={{ border: "1.5px solid #dee2e6" }}>
                            <button
                              className="btn btn-sm btn-outline-primary w-100"
                              style={{ fontSize: "11px" }}
                              onClick={() =>
                                handleView(
                                  {
                                    ...row,
                                    combinedReport: row.titles
                                      .map((t) => t.report)
                                      .filter(Boolean)
                                      .join("\n\n----------------------\n\n"),
                                    avgSimilarity:
                                      row.titles.reduce(
                                        (acc, t) => acc + (t.similarity || 0),
                                        0,
                                      ) / row.titles.length,
                                  },
                                  "report",
                                )
                              }
                            >
                              View
                            </button>
                          </td>

                          {/* Actions */}
                          <td
                            style={{
                              border: "1.5px solid #dee2e6",
                              verticalAlign: "middle",
                            }}
                          >
                            <button
                              className="btn btn-primary btn-sm w-100"
                              style={{ fontSize: "11px", fontWeight: 700 }}
                              onClick={() => handleView(row, "full")}
                            >
                              View
                            </button>
                          </td>
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
                    variant="primary"
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

      {showModal && selectedRow && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }} // ✅ FIX
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div
              className="modal-content"
              style={{ backgroundColor: "#F4F6F9" }}
            >
              <div className="modal-header">
                <h5 className="modal-title">Project Details</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <strong>Student:</strong> {selectedRow.name}
                </div>

                {selectedRow.titles.map((t, i) => {
                  const field = `title_${i + 1}`;

                  return (
                    <div key={i} className="border rounded p-3 mt-3">
                      {/* TITLE */}
                      <div className="fw-bold mb-1">{t.text}</div>

                      {/* ✅ SHOW AI REPORT ONLY in REPORT MODE */}
                      {selectedRow.viewMode === "report" && (
                        <div>
                          {/* RESULT */}
                          <div className="mb-3">
                            <h6 className="fw-bold">📊 Result</h6>

                            <div style={{ fontSize: "14px" }}>
                              <strong>Similarity:</strong>{" "}
                              {selectedRow.avgSimilarity?.toFixed(2)}%
                            </div>

                            <div
                              style={{
                                fontWeight: "bold",
                                color:
                                  selectedRow.avgSimilarity > 70
                                    ? "red"
                                    : selectedRow.avgSimilarity >= 40
                                      ? "orange"
                                      : "green",
                              }}
                            >
                              {selectedRow.avgSimilarity > 70
                                ? "HIGH"
                                : selectedRow.avgSimilarity >= 40
                                  ? "MEDIUM"
                                  : "LOW"}
                            </div>
                          </div>

                          {/* AI REPORT */}
                          <div>
                            <h6 className="fw-bold">🤖 AI Report</h6>

                            <div
                              style={{
                                background: "#f0f0f0",
                                padding: "15px",
                                borderRadius: "8px",
                                maxHeight: "400px",
                                overflowY: "auto",
                                fontSize: "13px",
                                lineHeight: "1.6",
                              }}
                            >
                              <ReactMarkdown
                                components={{
                                  h1: ({ children }) => (
                                    <h5 className="fw-bold mt-3">{children}</h5>
                                  ),
                                  h2: ({ children }) => (
                                    <h6 className="fw-bold mt-2">{children}</h6>
                                  ),
                                  p: ({ children }) => (
                                    <p style={{ marginBottom: "8px" }}>
                                      {children}
                                    </p>
                                  ),
                                  li: ({ children }) => (
                                    <li style={{ marginBottom: "4px" }}>
                                      {children}
                                    </li>
                                  ),
                                }}
                              >
                                {selectedRow.combinedReport ||
                                  "No AI report available"}
                              </ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ✅ SHOW NORMAL DETAILS ONLY in FULL MODE */}
                      {selectedRow.viewMode === "full" && (
                        <>
                          <div className="mt-2">
                            <strong>Similarity:</strong>{" "}
                            {t.similarity?.toFixed(1)}%
                          </div>

                          <small
                            style={{
                              color:
                                t.status === "approved"
                                  ? "green"
                                  : t.status === "rejected"
                                    ? "red"
                                    : "orange",
                            }}
                          >
                            Status: {t.status}
                          </small>

                          <textarea
                            className="form-control mt-2"
                            placeholder="Add comment (optional)..."
                            rows={2}
                            value={notes[i] || ""}
                            onChange={(e) =>
                              handleNoteChange(i, e.target.value)
                            }
                          />

                          <div className="d-flex gap-2 mt-2">
                            <button
                              className="btn btn-success btn-sm w-50"
                              disabled={actionLoading === field}
                              onClick={() =>
                                handleApprove(selectedRow.id, field, i)
                              }
                            >
                              {actionLoading === field
                                ? "Processing..."
                                : "Approve"}
                            </button>

                            <button
                              className="btn btn-danger btn-sm w-50"
                              disabled={actionLoading === field}
                              onClick={() =>
                                handleReject(selectedRow.id, field, i)
                              }
                            >
                              {actionLoading === field
                                ? "Processing..."
                                : "Reject"}
                            </button>
                          </div>

                          {t.note && (
                            <div
                              className="mt-2 text-muted"
                              style={{ fontSize: "12px" }}
                            >
                              <strong>Admin Note:</strong> {t.note}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubmittedTitle;
