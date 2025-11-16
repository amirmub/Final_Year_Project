import { Routes, Route } from "react-router-dom";
import Announcement from '../../Pages/StudDashboard/Announcement/Announcement'
import FAQPage from '../../Pages/FAQPage/FAQPage'
import SubmitTitle from '../../Pages/StudDashboard/SubmitTitle/SubmitTitle'
import SubmittedTitles from '../../Pages/StudDashboard/SubmittedTitles/SubmittedTitles'
import StudDashboard from '../../Pages/StudDashboard/Dashboard/Dashboard'
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<StudDashboard />} />
      <Route path="submit-title" element={
        <PrivateRoute role={["admin"]}>
          <SubmitTitle />
        </PrivateRoute>
        } />
      <Route path="my-submissions" element={<SubmittedTitles />} />
      <Route path="announcements" element={<Announcement />} />
      <Route path="faq" element={<FAQPage />} />
    </Routes>
  );
}
