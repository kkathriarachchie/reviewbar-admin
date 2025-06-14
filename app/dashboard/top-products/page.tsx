"use client";
import React, { useEffect, useState } from "react";
import { getTopReviewedProducts } from "@/app/services/productApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { RatingDistribution } from "@/components/RatingDistribution";

interface TopProduct {
  upc: string;
  reviewCount: number;
  reviews: { rating: string }[];
}

const Page = () => {
  const [products, setProducts] = useState<TopProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTopProducts = async () => {
      const { data } = await getTopReviewedProducts();
      if (data) {
        setProducts(data);
      }
    };
    fetchTopProducts();
  }, []);

  const handleSearch = (upc: string) => {
    router.push(`/dashboard/quick-view?upc=${upc}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[oklch(75.56%_0.182_142.9)]">
        Top 10 Products
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card
            key={product.upc}
            className="hover:shadow-lg transition-shadow "
          >
            <CardHeader className="text-lg font-semibold text-center flex justify-between items-center">
              <span className="font-semibold text-lg">UPC: {product.upc}</span>

              <Button
                onClick={() => handleSearch(product.upc)}
                className="flex h-8 w-13 items-center gap-2 bg-[oklch(75.56%_0.182_142.9)] font-medium text-base"
              >
                <span className="mt-1">View</span>
              </Button>
            </CardHeader>
            <CardContent>
              <RatingDistribution reviews={product.reviews} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
