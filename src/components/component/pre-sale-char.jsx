"use client";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

export const description = "A line chart showing increasing pre-sales stages";

const chartData = [
  { stage: "Stage 1", price: 0.1, fill: "var(--color-stage1)" },
  { stage: "Stage 2", price: 0.4, fill: "var(--color-stage2)" },
  { stage: "Stage 3", price: 0.5, fill: "var(--color-stage3)" },
  { stage: "Stage 4", price: 0.8, fill: "var(--color-stage4)" },
];

const chartConfig = {
  price: {
    label: "Price ($)",
    color: "var(--chart-1)",
  },
  stage1: {
    label: "Stage 1",
    color: "var(--chart-1)",
  },
  stage2: {
    label: "Stage 2",
    color: "var(--chart-2)",
  },
  stage3: {
    label: "Stage 3",
    color: "var(--chart-3)",
  },
  stage4: {
    label: "Stage 4",
    color: "var(--chart-4)",
  },
};

export function PreSalesChart() {
  return (
    <div className="bg-white p-4 rounded-lg">
      <Card className="bg-white border-gray-200">
        <CardHeader className="bg-white">
          <CardTitle className="text-gray-900">Pre-Sales Stage Chart</CardTitle>
          <CardDescription className="text-gray-600">
            Progressive pricing across stages
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 24,
                left: 24,
                right: 24,
                bottom: 24,
              }}
            >
              <CartesianGrid vertical={false} stroke="#e5e7eb" />
              <XAxis
                dataKey="stage"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-700"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                className="text-gray-700"
                tickFormatter={(value) => `$${value}`}
                domain={[0, 1]}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="price"
                    hideLabel
                    formatter={(value) => [`$${value}`, "Price"]}
                  />
                }
              />
              <Line
                dataKey="price"
                type="monotone"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{
                  fill: "#8b5cf6",
                  strokeWidth: 2,
                  r: 6,
                }}
                activeDot={{
                  r: 8,
                  fill: "#7c3aed",
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-gray-700"
                  fontSize={12}
                  dataKey="price"
                  formatter={(value) => `$${value}`}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm bg-white">
          <div className="flex gap-2 leading-none font-medium text-gray-900">
            Increasing trend across stages <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-gray-600 leading-none">
            Showing price progression through pre-sales stages
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
