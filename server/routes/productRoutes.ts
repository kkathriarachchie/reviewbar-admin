import express from "express";
import { getDatabaseConnection } from "../config/db";
import { getProductModel } from "../models/productModels";

const router = express.Router();

// GET /api/products
router.get(
  "/reviews/:upc",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const conn = await getDatabaseConnection("reviewbar-products");
      const Product = getProductModel(conn);

      const { upc } = req.params;
      const product = await Product.findOne({ upc });

      if (!product) {
        res.status(404).json({ message: "Product not found" });

        return;
      }

      res.json(product.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// DELETE /api/products/reviews/:upc/:reviewId
router.delete(
  "/reviews/:upc/:review_id",
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const conn = await getDatabaseConnection("reviewbar-products");
      const Product = getProductModel(conn);

      const { upc, review_id } = req.params;

      // Validate input parameters
      if (!upc || !review_id) {
        res.status(400).json({
          success: false,
          message: "UPC and review_id are required",
        });
        return;
      }

      // Use findOneAndUpdate to match your document structure
      const updatedProduct = await Product.findOneAndUpdate(
        { upc, "reviews.review_id": review_id },
        { $pull: { reviews: { review_id } } },
        { new: true }
      );

      if (!updatedProduct) {
        res.status(404).json({
          success: false,
          message: "Product or review not found",
        });
        return;
      }

      res.json({
        success: true,
        message: "Review deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

router.get(
  "/count",
  async (_req: express.Request, res: express.Response): Promise<void> => {
    try {
      const conn = await getDatabaseConnection("reviewbar-products");
      const Product = getProductModel(conn);

      const count = await Product.countDocuments();

      res.json({ count });
    } catch (error) {
      console.error("Error fetching product count:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get(
  "/active-total-reviews",
  async (_req: express.Request, res: express.Response) => {
    try {
      const conn = await getDatabaseConnection("reviewbar-products");
      const Product = getProductModel(conn);

      // Aggregate to sum the length of reviews arrays for all products
      const result = await Product.aggregate([
        { $project: { reviewCount: { $size: "$reviews" } } },
        { $group: { _id: null, activeTotalReviews: { $sum: "$reviewCount" } } },
      ]);

      const total = result[0]?.activeTotalReviews || 0;

      res.json({ total });
    } catch (error) {
      console.error("Error fetching total reviews:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

router.get(
  "/top-reviewed",
  async (_req: express.Request, res: express.Response) => {
    try {
      const conn = await getDatabaseConnection("reviewbar-products");
      const Product = getProductModel(conn);

      const topProducts = await Product.aggregate([
        {
          $project: {
            upc: 1,
            reviewCount: { $size: "$reviews" },
            reviews: 1,
            _id: 0,
          },
        },
        { $sort: { reviewCount: -1, upc: 1 } },
        { $limit: 10 },
      ]);
      res.json(topProducts);
    } catch (err: unknown) {
      res.status(500).json({
        error: "Server Error",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }
);

export default router;
