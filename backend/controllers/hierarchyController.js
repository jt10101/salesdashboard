const Hierarchy = require("../models/Hierarchy");
const User = require("../models/User");

const getFullName = (user) =>
  `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

const formatHierarchyItem = (item) => ({
  salesPersonId: item.salesPersonId?._id,
  salesPersonName: getFullName(item.salesPersonId),
  supervisorId: item.supervisorId?._id,
  supervisorName: getFullName(item.supervisorId),
});

const formatEmployeeItem = (item) => {
  const salesPerson = item.salesPersonId;
  return {
    ...item.toObject(),
    salesPersonId: salesPerson?._id,
    salesPersonName: getFullName(salesPerson),
  };
};

const indexHierarchy = async (req, res) => {
  try {
    const data = await Hierarchy.find()
      .populate("salesPersonId", "firstName lastName")
      .populate("supervisorId", "firstName lastName");

    const flattened = data.map(formatHierarchyItem);

    res.status(200).json({ data: flattened });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const changeHierarchy = async (req, res) => {
  const { salesPersonId, newSupervisorId } = req.body;
  try {
    const data = await Hierarchy.findOneAndUpdate(
      { salesPersonId },
      { supervisorId: newSupervisorId },
      { new: true }
    );

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const indexSupervisors = async (req, res) => {
  try {
    const data = await User.find({ role: "Supervisor" });
    const names = data.map(getFullName);
    res.status(200).json({ data: names });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const indexEmployees = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ error: "Unauthorized: Unauthorized User" });
    }
    let data = await Hierarchy.find({ supervisorId: user._id }).populate(
      "salesPersonId",
      "firstName lastName"
    );

    data = data.map(formatEmployeeItem);

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  indexHierarchy,
  indexSupervisors,
  indexEmployees,
  changeHierarchy,
};
