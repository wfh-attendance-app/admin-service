const express = require("express");
const { authenticate } = require('../middlewares/auth');
const { authorizeAdmin } = require('../middlewares/authorize');
const { getEmployees, addEmployee, updateEmployee } = require("../controllers/employeeController");

const router = express.Router();

router.post("/", addEmployee);
router.get("/", authenticate, authorizeAdmin, getEmployees);
router.put("/:id", authenticate, authorizeAdmin, updateEmployee);

module.exports = router;
