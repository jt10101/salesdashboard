const Target = require("../models/Targets");

const indexTarget = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const data = await Target.find({
      salesPersonId: userId,
      targetMonth: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { indexTarget };
