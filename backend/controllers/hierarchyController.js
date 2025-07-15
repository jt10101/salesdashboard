const Hierarchy = require("../models/Hierarchy");
const User = require("../models/User");

const indexHierarchy = async (req, res) => {
  try {
    const data = await Hierarchy.find()
      .populate("salesPersonId", "firstName lastName")
      .populate("supervisorId", "firstName lastName");

    const flattened = data.map((item) => ({
      salesPersonId: item.salesPersonId?._id,
      salesPersonName: `${item.salesPersonId?.firstName ?? ""} ${
        item.salesPersonId?.lastName ?? ""
      }`.trim(),
      supervisorId: item.supervisorId?._id,
      supervisorName: `${item.supervisorId?.firstName ?? ""} ${
        item.supervisorId?.lastName ?? ""
      }`.trim(),
    }));

    res.status(200).json({ data: flattened });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const indexSupervisors = async (req, res) => {
  try {
    const data = await User.find({ role: "Supervisor" });
    const names = data.map((item) =>
      `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim()
    );

    res.status(200).json({ data: names });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { indexHierarchy, indexSupervisors };
