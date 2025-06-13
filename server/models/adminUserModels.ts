import { Connection, Document, Model, Schema } from "mongoose";

export interface IAdminUser extends Document {
  user_id: string;
  name: string;
  email: string;
  password: string;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    user_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

/**
 * On the provided mongoose.Connection, get or create the AdminUser model.
 */
export function getAdminUserModel(conn: Connection): Model<IAdminUser> {
  return (
    conn.models.AdminUser ||
    conn.model<IAdminUser>("admin-users", AdminUserSchema)
  );
}
