const User = require("../models/userModel");
const bcrypt = require('bcrypt');

exports.addEmployee = async (req, res) => {
    try {
        const { name, email, password, position, department, joined_at, status, address, phone, profile_photo_url } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'employee',
            position,
            department,
            joined_at,
            status: status || 'active',
            address,
            phone,
            profile_photo_url
        });

        // Exclude sensitive fields
        const { password: _, ...safeEmployee } = newEmployee.get({ plain: true });

        res.status(201).json({ message: 'Employee created successfully', employee: safeEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getEmployees = async (req, res) => {
    try {
        const employees = await User.findAll({
            where: { role: 'employee' },
            attributes: { exclude: ['password'] },
        });
        res.status(200).json({ employees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, department, joined_at, status, address, phone, profile_photo_url } = req.body;

        const employee = await User.findByPk(id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });

        await employee.update({ name, position, department, joined_at, status, address, phone, profile_photo_url });

        // Exclude sensitive fields
        const { password, ...updatedEmployee } = employee.get({ plain: true });

        res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};