import React from "react";
import Link from "next/link";

async function Page({ params }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatContent = (content) => {
    return content.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-semibold mt-4 mb-2">
            {paragraph.replace("## ", "")}
          </h2>
        );
      }

      if (paragraph.startsWith("- ")) {
        const listItems = paragraph
          .split("\n- ")
          .map((item) => item.replace("- ", ""));
        return (
          <ul key={index} className="list-disc list-inside mb-4">
            {listItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={index} className="mb-4 text-gray-700 leading-relaxed">
          {paragraph}
        </p>
      );
    });
  };

  const { handle } = await params;

  try {
    const response = await fetch(`https://webapi.chaingpt.org/news/${handle}`);
    const data = await response.json();
    const article = data.data;

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mt-10">
          <Link href="/news">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              ← Go Back
            </button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-2 mt-8">{article.title}</h1>
        <div>
          <img src={article.imageUrl} alt={article.title} />
        </div>
        <div className="text-sm text-gray-500 mb-4">
          {formatDate(article.createdAt)}
        </div>

        <div className="flex gap-2 mb-6">
          {article.category?.name && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
              {article.category.name}
            </span>
          )}
          {article.token?.name && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
              {article.token.name}
            </span>
          )}
        </div>

        {article.description && (
          <p className="mb-6 text-gray-800">{article.description}</p>
        )}

        {article.content && (
          <div className="prose max-w-none">
            {formatContent(article.content)}
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="max-w-2xl mx-auto p-6 text-center text-red-500">
        Failed to fetch the blog.
      </div>
    );
  }
}

export default Page;
