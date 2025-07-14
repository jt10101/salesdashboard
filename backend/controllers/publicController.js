const User = require("../models/User");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");
const { createJWT } = require("../utils/tokenHandler");

const signIn = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const oneUser = await User.findOne({ username: username }).select(
      "username password"
    );

    // Password Checker
    if (!oneUser || !isPasswordBCryptValidated(password, oneUser.password)) {
      throw new ApiError({
        status: 400,
        source: { pointer: "publicController.js" },
        title: "Bad Request: Wrong Login Details",
        detail: "Login Failed with wrong login details.",
      });
    }

    // Login user - with id, username, and email, createdAt
    const userToken = await createJWT({ user: oneUser });

    // if (!userToken) {
    //   throw new ApiError({
    //     status: 503,
    //     source: { pointer: "publicController.js" },
    //     title: "Service Unavailable: Token Generation",
    //     detail: "Server having issue generating token.",
    //   });
    // }

    res.status(200).json({ user: oneUser, token: userToken });
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn };
