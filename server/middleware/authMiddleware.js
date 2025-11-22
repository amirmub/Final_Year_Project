const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
function tokenVerify(req, res, next) {
  const authHeader = req.headers.authorization; // use lowercase 'authorization' header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ msg: "No token provided (expected Bearer <token>)" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(401).json({ message: "Token is invalid or expired" });
    }

    req.role = decoded.role; // Attach role to request
    req.user = decoded; // Attach entire decoded payload to request
    next();
  });
}

// Middleware to check if the user is an admin (role 3)
function isAdmin(req, res, next) {
  const role = req.role;

  if (role === "admin" ) {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
}

// Middleware to check if the user is an admin (role 3)
function isSuperAdmin(req, res, next) {
  const role = req.role;

  if (role === "superAdmin" ) {
    next();
  } else {
    return res.status(403).json({ msg: "Access denied: Super Admin only" });
  }
}

module.exports = { tokenVerify, isAdmin, isSuperAdmin };