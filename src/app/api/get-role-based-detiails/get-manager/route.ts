import dbConnect from "@/lib/db";
import admin from "@/models/admin";
import SystemRole from "@/models/system-role";
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await dbConnect();

        // Aggregation pipeline with $match and $project
        const manager = await SystemRole.aggregate([
            {
                $match: {
                    role: "Manager",
                },
            },
            {
                $project: {
                    name: 1,
                    lastname: 1,
                    email: 1,
                    contactnumber: 1,
                    gender: 1,
                    age: 1,
                    address: 1,

                },
            },
        ]);

        return NextResponse.json({ manager, message: "Manager details fetched successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching manager details', status: 500 });
    }
}
