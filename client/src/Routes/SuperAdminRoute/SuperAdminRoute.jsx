import { Routes, Route } from "react-router-dom";
import SuperDashboard from "../../Pages/SuperDashboard/SuperDashboard/SuperDashboard"
import CreateAdmin from "../../Pages/SuperDashboard/CreateAdmin/CreateAdmin";
import Setting from "../../Pages/SuperDashboard/Setting/Setting";

function SuperAdminRoute() {
  return (
    <>
      <Routes>
        <Route path="dashboard" element= {<SuperDashboard />} />
        <Route path="add-admin" element= {<CreateAdmin />} />
        <Route path='setting' element={<Setting />}/>
      </Routes>
    </>
  )
}

export default SuperAdminRoute;
