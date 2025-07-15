// run this only in backend root folder
const User = require("../models/User");
const Hierarchy = require("../models/Hierarchy");
const { faker } = require("@faker-js/faker");
const { bcryptPassword } = require("../utils/bcrypt");

const generateUsers = async () => {
  const usersData = [
    {
      username: "user1",
      email: "user1@test.com",
      password: bcryptPassword("12345678"),
      firstName: "Jacob",
      lastName: "Tham",
      role: "Supervisor",
    },
    ...Array.from({ length: 4 }, () => ({
      username: faker.internet.username().toLowerCase().replaceAll(".", ""),
      email: faker.internet.email(),
      password: bcryptPassword("12345678"),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: "IC",
    })),
  ];
  try {
    await User.deleteMany({});
    const newUsers = await User.create(usersData);
    console.log(newUsers);
    return newUsers;
  } catch (err) {
    console.log(err);
  }
};

const generateHierarchy = async (users) => {
  const data = users.filter((a) => a.role === "IC");
  const hierarchyData = data.map((user) => ({
    salesPersonId: user._id,
  }));

  try {
    await Hierarchy.deleteMany({});
    const newHierarchy = await Hierarchy.create(hierarchyData);
    console.log(newHierarchy);
    return newHierarchy;
  } catch (err) {
    console.log(err);
  }
};

const generateTransactions = async () => {};

// Run Queries
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  mongoose.set("debug", true);
  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  const users = await generateUsers();
  await generateHierarchy(users);

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
