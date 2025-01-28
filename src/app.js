require("dotenv").config();
const express = require("express");
const { sequelize, sequelize1 } = require("./config/database");
const attendanceRoutes = require("./routes/attendanceRoutes.js");
const employeeRoutes = require("./routes/employeeRoutes.js");
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json());

app.use("/api/admin/attendance", attendanceRoutes);
app.use("/api/admin/employee", employeeRoutes);

const PORT = process.env.PORT || 4001;

Promise.all([
  sequelize.sync(),
  sequelize1.sync(),
])
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Employee Service running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error("Error syncing databases:", error);
  });
