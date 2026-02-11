const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET not defined");
    }

    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "60d",
    });
};

// @desc Register new user
exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar, role } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email and password are required" });
        }

        // Role validation
        const allowedRoles = ["jobseeker", "employer"];
        const finalRole = role || "jobseeker";
        if (!allowedRoles.includes(finalRole)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Check existing user
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            role: finalRole,
            avatar,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar || "",
            companyName: user.companyName || "",
            companyDescription: user.companyDescription || "",
            companyLogo: user.companyLogo || "",
            resume: user.resume || "",
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar || "",
            companyName: user.companyName || "",
            companyDescription: user.companyDescription || "",
            companyLogo: user.companyLogo || "",
            resume: user.resume || "",
            token: generateToken(user._id),
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Get logged-in user
exports.getMe = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.json(req.user);
};
