import { NextRequest, NextResponse } from "next/server";
import Exa, { JSONSchema } from "exa-js";

const exa = new Exa(process.env.EXA_API_KEY);

const rrlSchema = {
  type: "object",
  properties: {
    papers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          researchTitle: { type: "string" },
          introduction: { type: "string" },
          keyFindings: { 
            type: "array",
            items: { type: "string" }
          },
          apaCitation: { type: "string" }
        },
        required: ["researchTitle", "introduction", "keyFindings", "apaCitation"]
      }
    }
  },
  required: ["papers"]
};

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: "Query is required" },
        { status: 400 }
      );
    }

    // Create the research task
    const task = await exa.research.createTask({
      instructions: `Find and analyze 3-5 relevant research papers about ${query}. For each paper, provide: 1) The research title, 2) A brief introduction/summary, 3) Key findings related to ${query}, and 4) The APA citation format.`,
      output: { 
        schema: rrlSchema as JSONSchema
      }
    });

    // Poll until the task is complete
    const result = await exa.research.pollTask(task.id);
    
    if (result.status === "completed") {
      return NextResponse.json({
        data: result.data?.papers || [],
        citations: result.citations
      });
    } else {
      return NextResponse.json(
        { error: "Research task failed to complete" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Research error:", error);
    return NextResponse.json(
      { error: "Failed to process research request" },
      { status: 500 }
    );
  }
}