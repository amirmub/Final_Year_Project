import { Routes, Route } from "react-router-dom";
import SuperDashboard from "../../Pages/SuperDashboard/SuperDashboard/SuperDashboard"
import CreateAdmin from "../../Pages/SuperDashboard/CreateAdmin/CreateAdmin";

function SuperAdminRoute() {
  return (
    <>
      <Routes>
        <Route path="dashboard" element= {<SuperDashboard />} />
        <Route path="add-admin" element= {<CreateAdmin />} />
      </Routes>
    </>
  )
}

export default SuperAdminRoute;
