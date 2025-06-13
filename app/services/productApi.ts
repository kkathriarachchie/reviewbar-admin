import { Review, ApiResponse, DeleteResponse } from "../DTO/productDto";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/products";

export const getReviews = async (
  upc: string
): Promise<ApiResponse<Review[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${upc}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return { error: "Failed to fetch reviews" };
  }
};

export const deleteReview = async (
  upc: string,
  reviewId: string
): Promise<ApiResponse<DeleteResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${upc}/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("Error deleting review:", error);
    return { error: "Failed to delete review" };
  }
};
