"use client";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-4">
        Decentralized Payment Gateway
      </h1>
      <p className="text-lg text-white mb-8">
        Accept MON payments and subscriptions seamlessly.
      </p>
      <Button
        onClick={() => router.push("/sign-in")}
        size="lg"
        className="bg-white text-black hover:bg-gray-200"
      >
        Get Started
      </Button>
    </div>
  );
}
