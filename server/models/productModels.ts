import { Connection, Document, Model, Schema } from "mongoose";

export interface IReview {
  review_id: string;
  rating: string;
  email: string;
  comment: string;
  createdAt?: Date;
}

export interface IProduct extends Document {
  upc: string;
  reviews: IReview[];
}

const reviewSchema = new Schema<IReview>({
  review_id: { type: String, required: true },
  rating: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ProductSchema = new Schema<IProduct>(
  {
    upc: { type: String, required: true, unique: true },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

export function getProductModel(conn: Connection): Model<IProduct> {
  return conn.models.Product || conn.model<IProduct>("products", ProductSchema);
}
