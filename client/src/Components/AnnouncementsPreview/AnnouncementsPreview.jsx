import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Modal, Button } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { getAuth } from "../../utils/auth";

export default function AnnouncementsPreview() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3; // Show only 3 per page
  const token = getAuth().token;

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/announcement", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const sorted = res.data.message.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setAnnouncements(sorted);
    } catch (error) {
      toast.error("Failed to load announcements!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const paginatedData = announcements.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(announcements.length / itemsPerPage);

  return (
    <>
      <Toaster />
      <div className="container pt-4">
        <h3 className="fw-bold mb-3 text-primary">Latest Announcements</h3>

        {/* LOADING SKELETON */}
        {loading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-3 mb-3 rounded"
              style={{
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                animation: "pulse 1.3s infinite",
              }}
            ></div>
          ))
        ) : announcements.length === 0 ? (
          <p className="text-muted">No announcements found.</p>
        ) : (
          <>
            {/* ANNOUNCEMENTS LIST */}
            {paginatedData.map((item) => (
              <div
                key={item._id}
                className="mb-3 bg-white rounded shadow-sm"
                style={{ borderLeft: "4px solid #007bff", padding : "13px 20px" }}
              >
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
                  {item.description}
                </p>

                {/* View Full Modal */}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setSelected(item)}
                >
                  View Full
                </Button>
              </div>
            ))}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center gap-3 mt-3 ">
                <Button
                  className="rounded"
                  style={{fontSize : "13px"}}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </Button>

                <span className=" py-2 fw-semiBold" style={{fontSize : "13px"}}>
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  className="rounded"
                  style={{fontSize : "13px"}}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* FULL MODAL */}
      <Modal show={selected !== null} onHide={() => setSelected(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-secondary" style={{ lineHeight: "1.6" }}>
            {selected?.description}
          </p>
          <hr />
          <small className="text-muted">
            Posted on:{" "}
            {selected &&
              new Date(selected.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
