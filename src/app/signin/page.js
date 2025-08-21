"use client";

// import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { ShoppingBag, UserPlus, ExternalLink, HelpCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleRole = (role) => {
    if (role === "user") {
      Cookies.set("role", JSON.stringify("user"), { expires: 2 });
      return;
    }
  };

  useEffect(() => {
    setMounted(true);
    const ref = searchParams.get("ref");
    if (ref) {
      Cookies.set("ref", JSON.stringify(ref), { expires: 7 });
    }
  }, [router.query]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-800">
      <div className="hidden md:flex md:w-1/2 p-8 flex-col justify-center items-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 via-slate-800/20 to-purple-900/40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.3),transparent_70%)]" />
        <div className="relative z-10 max-w-xl text-center md:text-left px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-purple-300">
              RecurX
            </span>
            <br />
            <span className="text-slate-200">
              Decentralized Payment Solution
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Secure, fast, and transparent payments on the Polygon network.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl border border-purple-500/30 bg-slate-800/70 backdrop-blur-sm">
          <CardHeader className="text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-slate-800/50 p-2 rounded-full border border-purple-400/30">
                <ShoppingBag className="h-8 w-8 text-purple-200" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">
              RecurX Sign In
            </CardTitle>
            <CardDescription className="text-purple-100">
              Access your merchant or user dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-slate-800/80">
            {error === "OAuthAccountNotLinked" && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                This Google account is not linked to a RecurX account. Please
                use a different account or contact support.
              </p>
            )}
            <Button
              onClick={() => {
                router.replace('https://www.users.recurx.xyz/')
              }}
              className="w-full bg-slate-700  text-white border border-purple-500/40 flex items-center justify-center gap-2 transition-all duration-200 hover:border-purple-400/60"
              variant="outline"
            >
              
              Sign in as a user
            </Button>
            {/* <Button
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/dashboard",
                });
              }}
              className="w-full bg-slate-700  text-white border border-purple-500/40 flex items-center justify-center gap-2 transition-all duration-200 hover:border-purple-400/60"
              variant="outline"
            >
              <Image
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Sign in as a Merchant
            </Button> */}
           
          </CardContent>
          <div className="px-6 py-3 bg-slate-900/60 border-t border-purple-500/20 text-xs text-center text-slate-400">
            By signing in, you agree to our
            <a
              href="/termsofservice"
              className="text-purple-400 hover:text-purple-300 hover:underline mx-1 inline-flex items-center transition-colors duration-200"
            >
              Terms of Service <ExternalLink size={10} className="ml-1" />
            </a>
            and
            <a
              href="/privacy-policy"
              className="text-purple-400 hover:text-purple-300 hover:underline mx-1 inline-flex items-center transition-colors duration-200"
            >
              Privacy Policy <ExternalLink size={10} className="ml-1" />
            </a>
          </div>
          <p className="mt-4 text-sm text-center text-slate-400 px-6 pb-6">
            Need help?{" "}
            <a
              href="/contact"
              className="text-purple-400 hover:text-purple-300 hover:underline inline-flex items-center transition-colors duration-200"
            >
              Contact support <HelpCircle size={12} className="ml-1" />
            </a>
          </p>
        </Card>
      </div>
    </div>
  );
}
