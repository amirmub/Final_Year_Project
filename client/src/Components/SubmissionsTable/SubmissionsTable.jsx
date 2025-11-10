import React from "react";
import { Table, Badge } from "react-bootstrap";

const SubmissionsTable = ({ submissions }) => (
  <div className="mt-4">
    <h6 className="fw-bold mb-3">My Recent Submissions</h6>
    <Table responsive bordered hover className="align-middle">
      <thead className="table-light">
        <tr>
          <th>Title</th>
          <th>Department</th>
          <th>Date Submitted</th>
          <th>Status</th>
          <th>Similarity Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((item, i) => (
          <tr key={i}>
            <td>{item.title}</td>
            <td>{item.department}</td>
            <td>{item.date}</td>
            <td>
              <Badge bg={
                item.status === "Approved" ? "success" :
                item.status === "Needs Review" ? "warning" : "secondary"
              }>
                {item.status}
              </Badge>
            </td>
            <td>
              <span className="fw-bold" style={{ color: item.score > 70 ? "red" : item.score > 40 ? "orange" : "green" }}>
                {item.score}%
              </span>
            </td>
            <td><a href="#" className="text-primary text-decoration-none">View Details</a></td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default SubmissionsTable;
