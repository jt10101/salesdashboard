const User = require("../models/User");
const {
  bcryptPassword,
  isPasswordBCryptValidated,
} = require("../utils/bcrypt");
const { createJWT } = require("../utils/tokenHandler");
const { signInSchema, validate } = require("../utils/validator");

const signIn = async (req, res, next) => {
  try {
    const { username, password } = validate(signInSchema, req.body);

    const user = await User.findOne({ username }).select(
      "_id username password firstName"
    );

    if (!user || !(await isPasswordBCryptValidated(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await createJWT({ user });

    if (!token) {
      return res.status(503).json({ error: "Server unable to issue token" });
    }

    const { _id, email, createdAt, firstName } = user;

    return res.status(200).json({
      user: { _id, username, email, firstName, createdAt },
      token,
    });
  } catch (err) {
    if (err.statusCode === 400) {
      return res.status(400).json({ errors: err.details });
    }
    next(err);
  }
};

module.exports = { signIn };
