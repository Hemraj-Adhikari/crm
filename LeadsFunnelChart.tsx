"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/Card";
import type { FunnelStageDatum } from "../types";

const STAGE_COLORS = ["#b3ccff", "#82abff", "#4f83f7", "#2c60e0", "#1a3990"];

export function LeadsFunnelChart({ data }: { data: FunnelStageDatum[] }) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Lead Conversion Funnel</CardTitle>
          <CardDescription>Leads by pipeline stage, current quarter</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical" margin={{ left: 12, right: 24 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-black/5 dark:stroke-white/10" />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="stage"
              tickLine={false}
              axisLine={false}
              fontSize={12}
              width={110}
              stroke="currentColor"
              opacity={0.75}
            />
            <Tooltip
              cursor={{ fill: "rgba(44,96,224,0.06)" }}
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 16px rgba(15,31,77,0.12)" }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={22}>
              {data.map((entry, index) => (
                <Cell key={entry.stage} fill={STAGE_COLORS[index % STAGE_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
