import React from "react";
import { AINews } from "@chaingpt/ainews";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../components/ui/card";
import Link from "next/link";

async function Page() {
  try {
    const ainews = new AINews({
      apiKey: process.env.CHAINGPT_KEY,
    });
    const response = await ainews.getNews({});
    const data = await response.data;
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <>
        <div className=" px-3 lg:px-10 py-24 bg-[#000000] w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              AI News & Funding
            </h1>
            <p className="text-lg text-slate-100">
              Stay updated with the latest AI industry news and funding
              announcements
            </p>
          </div>

          <div className="grid  grid-cols-1 lg:grid-cols-2 items-center justify-between gap-10">
            {data.map((b, index) => {
              return (
                <Card
                  key={index}
                  className="bg-[#111111] border border-[#222222] text-white hover:shadow-lg hover:border-blue-600 transition-shadow duration-300 cursor-pointer"
                >
                  <CardHeader>
                    {/* Article Image */}
                    <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardTitle className="text-xl font-semibold line-clamp-2 mb-2 text-white">
                      {b.title}
                    </CardTitle>

                    <CardDescription className="text-gray-400 line-clamp-3 mb-4">
                      {b.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Article Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <span>{formatDate(b.createdAt)}</span>
                    </div>

                    {/* Read More Button */}
                    <Link href={`/news/${b.id}`}>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition-colors duration-200 font-medium">
                        Read More
                      </button>
                    </Link>

                    {/* Author */}
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-700">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-xs font-medium text-white mr-3">
                        {b.author?.charAt(0) ?? "A"}
                      </div>
                      <span className="text-sm text-gray-300">{b.author}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </>
    );
  } catch (error) {
    return (
      <>
        <div>Failed to load the blogs</div>
      </>
    );
  }
}

export default Page;
