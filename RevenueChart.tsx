"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import { formatCurrency, formatCompactNumber } from "@/core/lib/utils";
import type { RevenueTrendPoint } from "../types";

export function RevenueChart({ data }: { data: RevenueTrendPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Revenue vs Target</CardTitle>
          <CardDescription>Consultancy fee + commission revenue, last 12 months</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ left: -12, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2c60e0" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#2c60e0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-black/5 dark:stroke-white/10" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="currentColor" opacity={0.6} />
            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={12}
              stroke="currentColor"
              opacity={0.6}
              tickFormatter={(v) => formatCompactNumber(v)}
            />
            <Tooltip
              formatter={(value: number, name: string) => [formatCurrency(value), name === "revenue" ? "Revenue" : "Target"]}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(15,31,77,0.12)" }}
            />
            <Area type="monotone" dataKey="target" stroke="#8993a8" strokeDasharray="4 4" fill="none" strokeWidth={2} />
            <Area type="monotone" dataKey="revenue" stroke="#2c60e0" strokeWidth={2.5} fill="url(#revenueFill)" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
