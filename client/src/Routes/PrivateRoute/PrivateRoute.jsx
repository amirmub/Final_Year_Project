import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "../../utils/auth";

export const PrivateRoute = ({ role, children }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthorized, setIsAuthorize] = useState(false);

  useEffect(() => {
    const loggedUser = getAuth(); // sync function

    if (loggedUser?.token) {
      setIsLogin(true);

      if (role?.length && role.includes(loggedUser.role)) {
        setIsAuthorize(true);
      }
    }

    setIsCheck(true); // complete the auth check
  }, [role]);

  // Show nothing or loader while checking
  if (!isCheck) return null;

  // Redirect if not logged in
  if (!isLogin) return <Navigate to="/login" />;

  // Redirect if not authorized
  if (!isAuthorized) return <Navigate to="/unAuthorized" />;

  // If all checks pass, render the protected content
  return children;
};
