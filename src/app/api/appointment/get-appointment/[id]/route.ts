import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";

export async function GET(req: Request, { params }: { params: { id: any } }) {
    try {
        await dbConnect();
        const { id } = params;
        console.log(id)
        const appointment = await Appointment.findById({_id:id}).select("-__v");
        return Response.json({ appointment, message: "Appointment fetched successfully", status: 200 })
    } catch (error) {
        console.log(error)
    }
}