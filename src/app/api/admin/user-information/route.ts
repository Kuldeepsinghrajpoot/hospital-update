import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";



export async function GET(req: Request, res: Response) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) {
        return Response.json({ error: 'Id is required', status: 400 })
    }
    dbConnect();

    const data = await Appointment.find({}).select("-password");
    return Response.json(data)
}