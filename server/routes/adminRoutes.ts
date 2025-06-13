import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import { IAdminUser } from "../DTO/dto";
import { v4 as uuidv4 } from "uuid";
import { getDatabaseConnection } from "../config/db";
import { getAdminUserModel } from "../models/adminUserModels";

const router = express.Router();

interface AddAdminRequest extends Request {
  body: IAdminUser;
}

// POST endpoint for admin registration
router.post("/register", async (req: AddAdminRequest, res: Response) => {
  try {
    const conn = await getDatabaseConnection("reviewbar-admin");
    const AdminUser = getAdminUserModel(conn);

    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email });
    if (existingAdmin) {
      res.status(400).json({ message: "Admin already exists" });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin user
    const newAdmin = new AdminUser({
      user_id: uuidv4(), // Generate a simple user_id
      name,
      email,
      password: hashedPassword,
    });

    // Save admin to database
    await newAdmin.save();

    // Return success response (excluding password)
    const adminResponse = {
      user_id: newAdmin.user_id,
      name: newAdmin.name,
      email: newAdmin.email,
    };

    res.status(201).json({
      message: "Admin registered successfully",
      admin: adminResponse,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
});
export default router;
