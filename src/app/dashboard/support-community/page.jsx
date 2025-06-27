import React from "react";
import { Twitter, Send } from "lucide-react";

function CommunitySupportPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-purple-400 mb-4 text-center">
        Community Support
      </h1>
      <p className="text-slate-300 mb-10 text-center max-w-xl">
        Stay connected and get support from our community on your favorite platforms. Join us on Twitter or Telegram to receive updates, share feedback, or ask for help.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Twitter Card */}
        <a
          href="https://x.com/RecurXPay"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="p-3 bg-slate-800 rounded-full">
            <Twitter className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Join us on Twitter</h2>
            <p className="text-sm text-slate-300">Follow us for the latest updates and announcements.</p>
          </div>
        </a>

        {/* Telegram Card */}
        <a
          href="https://t.me/RecurXPay_Community"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 bg-gradient-to-r from-purple-800 to-indigo-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <div className="p-3 bg-slate-800 rounded-full">
            <Send className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Join our Telegram</h2>
            <p className="text-sm text-slate-300">Chat with the community and ask questions in real time.</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default CommunitySupportPage;
