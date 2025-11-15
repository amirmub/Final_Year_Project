import { Navigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

export default function ProtectedRoute({ children }) {
  const auth = getAuth();

  // If no token → redirect to login
  if (!auth || !auth.token) {
    return <Navigate to="/login" replace />;
  }

  return children; // allow access
}
