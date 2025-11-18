import { Routes, Route } from "react-router-dom";
import Announcement from '../../Pages/StudDashboard/Announcement/Announcement'
import FAQPage from '../../Pages/FAQPage/FAQPage'
import SubmitTitle from '../../Pages/StudDashboard/SubmitTitle/SubmitTitle'
import SubmittedTitles from '../../Pages/StudDashboard/SubmittedTitles/SubmittedTitles'
import Dashboard from '../../Pages/StudDashboard/Dashboard/Dashboard'
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import AnnouncementCard from "../../Components/AnnouncementCard/AnnouncementCard";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/:id" element={<Dashboard />} />
      <Route path="submit-title" element={<SubmitTitle />  } />
      <Route path="my-submissions/:id" element={<SubmittedTitles />} />
      <Route path="announcements" element={<Announcement />} />
      <Route path="announcements/view" element={<AnnouncementCard />} />
      <Route path="faq" element={<FAQPage />} />
    </Routes>
  );
}
