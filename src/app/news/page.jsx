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
        <div className="container mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              AI News & Funding
            </h1>
            <p className="text-lg text-gray-600">
              Stay updated with the latest AI industry news and funding
              announcements
            </p>
          </div>

          <div className="grid grid-cols-2 items-center justify-between gap-10">
            {data.map((b, index) => {
              return (
                <Card
                  key={index + "-" + index}
                  className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <CardHeader>
                    {/* Article Image */}
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={b.imageUrl}
                        alt={b.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CardTitle className="text-xl font-semibold line-clamp-2 mb-2">
                      {b.title}
                    </CardTitle>

                    <CardDescription className="text-gray-600 line-clamp-3 mb-4">
                      {b.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {/* Article Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      {/* <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {b.category}
                    </span> */}
                      <span>{formatDate(b.createdAt)}</span>
                    </div>

                    {/* Article Content Preview */}
                    {/* <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {b.content}
                  </p> */}

                    {/* Read More Button */}
                    <Link href={`/news/${b.id}`}>
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                        Read More
                      </button>
                    </Link>

                    {/* Author */}
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3">
                        {b.author.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{b.author}</span>
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
