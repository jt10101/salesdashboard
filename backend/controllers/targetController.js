const Target = require("../models/Targets");

const indexTarget = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const data = await Target.find({ salesPersonId: userId });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { indexTarget };
