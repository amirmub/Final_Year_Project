import { Card, Table, Badge } from "react-bootstrap";
import { FaBookOpen, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const MySubmissions = () => {
  // Example static data — you’ll later replace this with dynamic data from backend or Firestore
  const submissions = [
    {
      id: 1,
      leader: "Amir Mubarek",
      department: "Computer Science",
      title1: "AI-Based Health Monitoring System",
      title2: "Web-Based Student Attendance Tracker",
      title3: "Cloud Storage Optimization with Machine Learning",
      date: "2025-11-10",
      status: "Pending Review",
    },
  ];

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Approved":
//         return <Badge bg="success"><FaCheckCircle className="me-1" /> Approved</Badge>;
//       case "Rejected":
//         return <Badge bg="danger"><FaTimesCircle className="me-1" /> Rejected</Badge>;
//       default:
//         return <Badge bg="warning" text="dark"><FaClock className="me-1" /> Pending Review</Badge>;
//     }
//   };

  return (
    <Card className="border-0 shadow mt-5 p-3 rounded-4">
      <div className="d-flex align-items-center mb-3">
        <FaBookOpen className="text-primary me-2 fs-4" />
        <h5 className="fw-bold text-primary m-0">My Submissions</h5>
      </div>

      <Table hover responsive bordered className="align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Leader Name</th>
            <th>Department</th>
            <th>Project Titles</th>
            <th>Date Submitted</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
        <tbody>
          {submissions.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.leader}</td>
              <td>{s.department}</td>
              <td>
                <ul className="mb-0 ps-3">
                  <li>{s.title1}</li>
                  <li>{s.title2}</li>
                  <li>{s.title3}</li>
                </ul>
              </td>
              <td>{new Date(s.date).toLocaleDateString()}</td>
              {/* <td>{getStatusBadge(s.status)}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default MySubmissions;
