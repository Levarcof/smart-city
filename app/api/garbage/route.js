import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import { GarbageReport } from "@/app/models/garbadgeReport";

export async function POST(req) {
  try {
    const { name, email, message, address, location, images } = await req.json();

    if (!name || !email || !address || !location?.lat || !location?.lng || !images?.length) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const report = await GarbageReport.create({
      name,
      email,
      message: message || "Garbage report",
      address,
      location,
      images, 
    });

    return NextResponse.json(
      { success: true, message: "Report sent successfully", report },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
