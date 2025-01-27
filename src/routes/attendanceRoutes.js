const express = require("express");
const { authenticate } = require('../middlewares/auth');
const { authorizeAdmin } = require('../middlewares/authorize');
const { getAttendances } = require("../controllers/attendanceController");

const router = express.Router();

router.get("/:id", authenticate, authorizeAdmin, getAttendances);

module.exports = router;
