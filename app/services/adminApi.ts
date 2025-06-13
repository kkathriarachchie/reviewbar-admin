import { RegisterData, RegisterResponse } from "../DTO/adminDto";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export const registerAdmin = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const result: RegisterResponse = await response.json();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Registration failed: ${error.message}`);
    }
    throw new Error("Registration failed");
  }
};
