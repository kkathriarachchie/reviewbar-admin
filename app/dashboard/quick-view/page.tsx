"use client";

import { ReviewsTable } from "@/components/Tables/ReviewsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { deleteReview, getReviews } from "../../services/productApi";
import { Review } from "../../DTO/productDto";

const Page = () => {
  const [upc, setUpc] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUpc, setCurrentUpc] = useState("");
  const handleSearch = async () => {
    if (!upc.trim()) {
      toast.error("Please enter a UPC code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await getReviews(upc.trim());

      if (response.error) {
        toast.error(response.error);
        setReviews([]);
      } else if (response.data) {
        setReviews(response.data);
        setCurrentUpc(upc.trim());
        toast.success(`Found ${response.data.length} reviews`);
      }
    } catch (error) {
      toast.error("Failed to fetch reviews: " + error);
      setReviews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!currentUpc) {
      toast.error("No UPC selected");
      return;
    }

    try {
      const response = await deleteReview(currentUpc, reviewId);

      if (response.error) {
        toast.error(response.error);
      } else if (response.data?.success) {
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
        toast.success("Review deleted successfully");
      }
    } catch (error) {
      toast.error(`Failed to delete review` + error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Product Reviews</h1>
          <p className="text-muted-foreground">
            Search for product reviews by UPC code
          </p>
        </div>

        <div className="flex flex-row gap-2 max-w-sm">
          <Input
            placeholder="Enter UPC code..."
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button onClick={handleSearch} disabled={isLoading || !upc.trim()}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>

        {currentUpc && (
          <div className="text-sm text-muted-foreground">
            Showing reviews for UPC:{" "}
            <span className="font-mono font-medium">{currentUpc}</span>
          </div>
        )}

        <ReviewsTable
          reviews={reviews}
          isLoading={isLoading}
          onDeleteReview={handleDeleteReview}
        />
      </div>
    </div>
  );
};

export default Page;
