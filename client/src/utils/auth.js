// Decode JWT payload
function decodeTokenPayload(token) {
  if (!token) {
    return null;
  }

  try {
    const payloadPart = token.split('.')[1];
    const decoded = atob(payloadPart.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
}

// Get decoded auth data from localStorage
export const getAuth = () => {
  const token = localStorage.getItem("Token");
  if (!token) {
    return null;
  }

  const decodedToken = decodeTokenPayload(token);
  if (!decodedToken){
     return null;
  }

  return {
    token,
    email: decodedToken.email,
    id: decodedToken.id,
    role: decodedToken.role,
    name: decodedToken.name
  };
}

console.log(getAuth());
