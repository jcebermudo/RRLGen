"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const query = formData.get("query");

      const response = await fetch("/api/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch research results");
      }

      setResults(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-[600px] flex flex-col items-center justify-center space-y-5">
        <h1 className="text-2xl font-bold">Find RRLs in seconds, not hours.</h1>
        <form
          className="flex flex-col space-y-2 w-full"
          onSubmit={handleSubmit}
        >
          <Textarea
            name="query"
            className="max-h-[1300px]"
            placeholder="What's your research about?"
            disabled={isLoading}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
        <hr className="w-full border-t border-gray-200" />
      </div>

      <div className="w-full max-w-[600px] flex flex-col items-center justify-center space-y-5 mt-8">
        <h2 className="text-2xl font-bold">Results</h2>
        {isLoading && <p>Searching for relevant research papers...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {results && (
          <div className="w-full space-y-4">
            {results.data.map((paper: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-bold">{paper.researchTitle}</h3>
                <p className="mt-2">{paper.introduction}</p>
                <div className="mt-2">
                  <h4 className="font-semibold">Key Findings:</h4>
                  <ul className="list-disc pl-5">
                    {paper.keyFindings.map((finding: string, i: number) => (
                      <li key={i}>{finding}</li>
                    ))}
                  </ul>
                </div>
                <p className="mt-2 text-sm text-gray-600 break-all">
                  {paper.apaCitation}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
