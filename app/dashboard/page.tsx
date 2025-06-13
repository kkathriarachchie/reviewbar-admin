"use client";

import { Card } from "@/components/ui/card";
import {
  IconUsers,
  IconChartBar,
  IconFileDescription,
} from "@tabler/icons-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <IconUsers className="h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <IconChartBar className="h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Active Reviews</p>
              <h3 className="text-2xl font-bold">856</h3>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <IconFileDescription className="h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Total Proposals</p>
              <h3 className="text-2xl font-bold">432</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Card className="p-6">
          {/* Add your activity list or table here */}
        </Card>
      </section>

      {/* Additional dashboard widgets can be added here */}
    </div>
  );
}
