"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import type { StatusBreakdownDatum } from "../types";

export function ApplicationsStatusChart({ data }: { data: StatusBreakdownDatum[] }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Applications by Status</CardTitle>
          <CardDescription>{total} active applications across all universities</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.status} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(15,31,77,0.12)" }} />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-xs text-status-neutral">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
