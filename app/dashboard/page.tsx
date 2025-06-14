"use client";

import { Card } from "@/components/ui/card";
import {
  IconChartBar,
  IconFileDescription,
  IconListCheck,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { getActiveTotalReviews, getProductCount } from "../services/productApi";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState<number>(0);
  const [activeReviews, setActiveReviews] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const [productResponse, activeReviewsResponse] = await Promise.all([
        getProductCount(),
        getActiveTotalReviews(),
      ]);

      if (productResponse.data) {
        setProductCount(productResponse.data.count);
      }

      if (activeReviewsResponse.data) {
        setActiveReviews(activeReviewsResponse.data);
      }
    };

    fetchCounts();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[oklch(75.56%_0.182_142.9)]">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <IconListCheck className="h-8 w-8 text-[oklch(75.56%_0.182_142.9)]" />
            <div>
              <p className="text-lg font-semibold">Total Products</p>
              <h3 className="text-2xl font-bold">{productCount}</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <IconChartBar className="h-8 w-8 text-[oklch(75.56%_0.182_142.9)]" />
            <div>
              <p className="text-lg font-semibold">Active Reviews</p>
              <h3 className="text-2xl font-bold">{activeReviews}</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <section className="mt-8">
        <ChartAreaInteractive />
      </section>

      {/* Additional dashboard widgets can be added here */}
    </div>
  );
}
