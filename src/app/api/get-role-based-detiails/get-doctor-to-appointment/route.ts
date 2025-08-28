import dbConnect from "@/lib/db";
import SystemRole from "@/models/system-role";
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) {
        return Response.json({ error: 'Id is required', status: 400 })
    }
    try {
        await dbConnect();

        // Aggregation pipeline with $match and $project
        const doctor = await SystemRole.aggregate([
            {
                $match: {
                    role: "Doctor",
                },
            },
            {
                $project: {
                    name: 1,
                    lastname: 1,
                    

                },
            },
        ]);

        return NextResponse.json({doctor, message: " doctor fetched", status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Error fetching manager details', status: 500 });
    }
}
