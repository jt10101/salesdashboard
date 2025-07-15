const Hierarchy = require("../models/Hierarchy");

const indexHierarchy = async (req, res, next) => {
  try {
    const data = await Hierarchy.find({});
    return res.status(200).json({ data });
  } catch (err) {
    return res.json(err.message);
  }
};

module.exports = { indexHierarchy };
