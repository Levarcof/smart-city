import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";
import { Report } from "@/app/models/reportModel";
import { GarbageReport } from "@/app/models/garbadgeReport";

export async function PUT(req) {
    try {
        const { email, name, image } = await req.json()
        if (!email) {
            return NextResponse.json(
                { message: "ALl fields are requre" },
                { status: 400 }
            )
        }
        await connectDB()

        const user = await User.findOneAndUpdate(
            { email },
            {
                name,
                image
            },
            { new: true }
        )
        const reports = await Report.updateMany(
            { email },
            { $set: { name } }
        )

        const garbageReport = await GarbageReport.updateMany(
            {email},
            {$set : {name}}
        )

        return NextResponse.json(
            { message: "Update profile successfully",
                success : true,
                user
             },
            { status: 200 }
        )
    }
    catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        )
    }
}