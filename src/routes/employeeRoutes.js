const express = require("express");
const { authenticate } = require('../middlewares/auth');
const { authorizeAdmin } = require('../middlewares/authorize');
const { getEmployees, addEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.get("/employee", authenticate, authorizeAdmin, getEmployees);
router.post("/employee", addEmployee);

module.exports = router;
