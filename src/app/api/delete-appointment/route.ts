import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";

export async function DELETE(req: Request) {
    dbConnect();
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')
    try {
        const record = await Appointment.findByIdAndDelete(id);
        if (!record) {
            return Response.json({ success: false, message: 'Record not found' })
        }
        return Response.json({ success: true, message: 'Record deleted successfully' })
    } catch (error) {
        Response.json({ success: false, message: 'Record not found' })
    }
}