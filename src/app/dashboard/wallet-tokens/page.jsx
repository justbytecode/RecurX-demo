"use client";
import React, { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import SendToken from "../../../components/SendToken";
import RecieveTokens from "../../../components/RecieveToken";
import { Skeleton } from "../../../components/ui/skeleton";
import { useTheme } from "../../../context/themeContext";

export default function Page() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const { themeClasses } = useTheme(); // ✅ use theme context

  const findInfo = async () => {
    try {
      if (!info) return;
      setLoading(true);

      const res = await fetch("/api/findwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          info.includes("@")
            ? { option: "email", email: info }
            : { option: "address", address: info }
        ),
      });

      const result = await res.json();
      setData(result.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto p-4 space-y-6 `}>
      <Card
        className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}
      >
        <CardHeader>
          <CardTitle className={themeClasses.textPrimary}>
            🔍 Search Wallet Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Search by email or wallet address"
              className={themeClasses.input + " flex-1"}
            />
            <Button onClick={findInfo} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <SendToken address={""} />
            <RecieveTokens />
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card
          className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}
        >
          <CardContent className="space-y-4 py-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </CardContent>
        </Card>
      )}

      {data && (
        <Card
          className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}
        >
          <CardHeader>
            <CardTitle className={themeClasses.textPrimary}>
              👤 User Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={themeClasses.textSecondary}>
              <strong>Email:</strong> {data.email}
            </div>
            <div className={themeClasses.textSecondary}>
              <strong>Wallet:</strong> {data.wallet}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SendToken address={data.wallet} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
