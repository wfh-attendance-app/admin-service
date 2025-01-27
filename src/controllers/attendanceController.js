const Attendance = require("../models/attendanceModel");
const User = require("../models/userModel");

exports.getAttendances = async (req, res) => {
    try {
        const { id } = req.params;
        const attendanceRecords = await Attendance.findAll({
            where: { user_id: id },
        });
        
        if (!attendanceRecords.length) {
            return res.status(404).json({ error: "No attendance records found for this user" });
        }
        
        const user = await User.findOne({
            where: { id },
            attributes: ['name', 'position', 'department'],
        });

        const result = attendanceRecords.map((attendance) => ({
            ...attendance.toJSON(),
            user: user.toJSON(),
        }));

        res.status(200).json({ attendance: result });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
