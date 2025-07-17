// run this only in backend root folder
const User = require("../models/User");
const Hierarchy = require("../models/Hierarchy");
const Transaction = require("../models/Transactions");
const Target = require("../models/Targets");
const { faker } = require("@faker-js/faker");
const { bcryptPassword } = require("../utils/bcrypt");
const { addMonths, lastDayOfMonth } = require("date-fns");

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
    {
      username: "user2",
      email: "user2@test.com",
      password: bcryptPassword("12345678"),
      firstName: "Elsa",
      lastName: "Tham",
      role: "IC",
    },
    ...Array.from({ length: 5 }, () => ({
      username: faker.internet.username().toLowerCase().replaceAll(".", ""),
      email: faker.internet.email(),
      password: bcryptPassword("12345678"),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      role: "Supervisor",
    })),
    ...Array.from({ length: 20 }, () => ({
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
  const superdata = users.filter((a) => a.role === "Supervisor");

  const hierarchyData = data.map((user) => {
    const supervisor = superdata[Math.floor(Math.random() * superdata.length)];

    return {
      salesPersonId: user._id,
      supervisorId: supervisor._id,
    };
  });

  try {
    await Hierarchy.deleteMany({});
    const newHierarchy = await Hierarchy.create(hierarchyData);
    console.log(newHierarchy);
    return newHierarchy;
  } catch (err) {
    console.log(err);
  }
};

const generateTransactions = async (users) => {
  const user2 = users.find((u) => u.username === "user2");
  const salesPersonIds = users.filter((u) => u.role === "IC").map((u) => u._id);
  const transactionData = [
    ...Array.from({ length: 10 }, () => ({
      salesPersonId: user2._id,
      transactionDate: faker.date
        .between({ from: "2023-01-01", to: "2025-01-01" })
        .toISOString()
        .split("T")[0],
      salesAmount: faker.number.int({ min: 100000, max: 500000 }),
      salesCharge: faker.number.float(),
    })),
    ...Array.from({ length: 100 }, () => ({
      salesPersonId: faker.helpers.arrayElement(salesPersonIds),
      transactionDate: faker.date
        .between({ from: "2025-01-01", to: "2025-06-30" }) // YYYY-MM-DD
        .toISOString()
        .split("T")[0],
      salesAmount: faker.number.int({ min: 100000, max: 500000 }),
      salesCharge: faker.number.float(),
    })),
  ];
  try {
    await Transaction.deleteMany({});
    const newTransaction = await Transaction.create(transactionData);
    console.log(newTransaction);
  } catch (err) {
    console.log(err);
  }
};

const generateTargets = async (users) => {
  const data = users.filter((a) => a.role === "IC");

  const startDate = new Date(2023, 0, 1);
  const targetData = [];

  for (let user of data) {
    for (let i = 0; i < 32; i++) {
      const monthDate = addMonths(startDate, i);
      const targetMonth = lastDayOfMonth(monthDate);

      targetData.push({
        salesPersonId: user._id,
        targetMonth,
        targetAmount: faker.number.int({ min: 50000, max: 200000 }),
      });
    }
  }

  try {
    await Target.deleteMany({});
    const newTarget = await Target.insertMany(targetData);
    console.log(newTarget);
    return newTarget;
  } catch (err) {
    console.error(err);
  }
};

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
  await generateTransactions(users);
  await generateTargets(users);

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

connect();
