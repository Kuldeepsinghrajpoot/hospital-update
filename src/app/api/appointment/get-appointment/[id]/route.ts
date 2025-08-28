import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Id is required', status: 400 });
        }

        await dbConnect();

        // Fetch appointment by ID, exclude __v
        const appointment = await Appointment.findById(id).select("-__v");

        if (!appointment) {
            return NextResponse.json({ message: "Appointment not found", status: 404 }, { status: 404 });
        }

        return NextResponse.json({ appointment, message: "Appointment fetched successfully", status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error", status: 500 }, { status: 500 });
    }
}
