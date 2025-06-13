export interface AdminUser {
  user_id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface RegisterResponse {
  message: string;
  admin: AdminUser;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
