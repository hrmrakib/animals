import { animalCollection, connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const data = await animalCollection.find().toArray();
    return NextResponse.json({
      message: "Data received successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to parse request" },
      { status: 400 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // Parse JSON body if content type is JSON
    const body = await req.json();

    const inserted = await animalCollection.insertOne(body);

    // Respond back with a success message
    return NextResponse.json({
      message: "Data received successfully",
      receivedData: inserted,
    });
  } catch (error) {
    console.error("Error parsing request:", error);
    return NextResponse.json(
      { error: "Failed to parse request" },
      { status: 400 }
    );
  }
}
