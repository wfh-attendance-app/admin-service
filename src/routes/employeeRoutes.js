const express = require("express");
const { authenticate } = require('../middlewares/auth');
const { authorizeAdmin } = require('../middlewares/authorize');
const { getEmployees, addEmployee, updateEmployee, getEmployeeById } = require("../controllers/employeeController");

const router = express.Router();

router.post("/", addEmployee);
router.get("/", authenticate, authorizeAdmin, getEmployees);
router.get("/:id", authenticate, authorizeAdmin, getEmployeeById);
router.put("/:id", authenticate, authorizeAdmin, updateEmployee);

module.exports = router;
