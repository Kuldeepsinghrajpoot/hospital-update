import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        return new Response(JSON.stringify({ error: 'Id is required', status: 400 }), { status: 400 });
    }

    await dbConnect();

    const chartData = await Appointment.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year and month
                patients: { $sum: 1 }, // Count the number of patients (appointments) in each month
            },
        },
        {
            $sort: { _id: 1 }, // Sort by month (ascending order)
        },
    ]);

    return  Response.json(chartData, { status: 200 });
}
