import mongoose, { Document, Model, Schema } from "mongoose";

interface IAdminUser extends Document {
  user_id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema: Schema<IAdminUser> = new Schema(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ||
  mongoose.model<IAdminUser>("admin-users", AdminUserSchema);

export default AdminUser;
