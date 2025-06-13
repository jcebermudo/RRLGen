"use client"

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-[400px] flex flex-col items-center justify-center space-y-5">
        <h1 className="text-2xl font-bold">Find RRLs in seconds, not hours.</h1>
        <form className="flex flex-col space-y-2 w-full" action="/search" method="get">
          <Textarea className="max-h-[1300px]" placeholder="What's your research about?" />
          <Button type="submit" className="w-full">Search</Button>
        </form>
        <hr className="w-full border-t border-gray-200" />
      </div>
    </div>
  );
}
