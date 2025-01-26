require("dotenv").config();
const express = require("express");
const sequelize = require("./config/database");
const employeeRoutes = require("./routes/employeeRoutes.js");

const app = express();
app.use(express.json());
app.use("/api/admin", employeeRoutes);

const PORT = process.env.PORT || 4001;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Employee Service running on port ${PORT}`));
});
