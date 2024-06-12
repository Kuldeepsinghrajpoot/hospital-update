import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";


export async function GET() {
    dbConnect();

    const data = await Appointment.find({}).select("-password");
    return Response.json(data)
}