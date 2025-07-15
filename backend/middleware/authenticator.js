const {
  getTokenFromReq,
  decodeJWT,
  saveUserToRequest,
} = require("../utils/tokenHandler");

const authenticateUser = async (req, res, next) => {
  try {
    const token = getTokenFromReq(req);
    if (!token) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Unable to get token from Authorization Header",
      });
    }

    const decoded = await decodeJWT(token);

    if (!decoded.user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid token payload",
      });
    }

    saveUserToRequest(req, decoded.user);

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = authenticateUser;
