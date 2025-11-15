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

    // req.employee_role = decoded.employee_role; // Attach role to request
    req.user = decoded; // Attach entire decoded payload to request
    next();
  });
}

module.exports = { tokenVerify };