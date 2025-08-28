import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import SystemRole from "@/models/system-role";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Id is required', status: 400 });
    }

    await dbConnect();

    const [Admin, managers, appointments, doctors, user] = await Promise.all([
        SystemRole.countDocuments({ role: 'Admin' }),
        SystemRole.countDocuments({ role: 'Manager' }),
        Appointment.countDocuments({}),
        SystemRole.countDocuments({ role: 'Doctor' }),
        SystemRole.countDocuments({ role: 'User' }),
    ]);

    console.log("counting all records");

    return NextResponse.json({
        Admin,
        managers,
        appointments,
        doctors,
        user,
        status: 200,
        message: "All records fetched successfully",
    });
}
