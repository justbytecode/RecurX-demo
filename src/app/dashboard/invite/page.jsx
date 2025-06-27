"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { ClipboardCopy, Share2 } from "lucide-react";

function Page() {
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const referralUrl = `https://www.recurx.xyz/signin?ref=${referralCode}`;

  const fetchReferralDetails = async () => {
    try {
      const res = await axios.get("/api/referral");
      if (res.data.message) {
        setReferralCode(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const generateReferralCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/referral");
      setReferralCode(res.data.referralCode);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Recurx",
          text: "Check this out and earn rewards!",
          url: referralUrl,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  useEffect(() => {
    fetchReferralDetails();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-4">
      <div className="max-w-xl mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          Invite & Earn
        </h2>

        <Suspense fallback={"Loading"}>
          {referralCode !== "Not Exists" ? (
            <div className="space-y-4">
              <div>
                <p className="text-gray-300">Your referral code:</p>
                <div className="bg-slate-700 text-purple-400 px-4 py-2 rounded-md font-mono text-lg mt-1 break-words">
                  {referralUrl}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-md"
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={shareLink}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400">
                You haven't generated your referral code yet.
              </p>
              <button
                onClick={generateReferralCode}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Generate Referral Code"}
              </button>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
