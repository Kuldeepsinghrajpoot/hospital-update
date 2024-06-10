import dbConnect from "@/lib/db";
import admin from "@/models/admin";


export async function GET() {
    dbConnect();

    const data = await admin.find({}).select("-password");
    return Response.json(data)
}