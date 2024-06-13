import { NextResponse as Response } from 'next/server';
import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";



export async function GET(req: Request, res: Response) {
    const {searchParams} = new URL(req.url)
    const name = searchParams.get('id');
    if (!name) {
        return Response.json({ error: 'name is required', status: 400 })
    }
  
    try {
        await dbConnect();

        // Calculate the start and end of the current day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Aggregate to get daily appointments in descending order
        const patients = await Appointment.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startOfDay,
                        $lt: endOfDay,
                    },

                    Doctor: name
                    
                    // $match: { name: name},
                    
                },
            },
            {
                $project: {
                    Name: 1,
                    Doctor: 1,
                    Phone: 1,
                    Gender: 1,
                    AppointmentId: 1,
                    Address: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 }, // Sort by createdAt in descending order
            },
        ]);

        return Response.json({
            patients,
            message: "Daily Appointment details fetched successfully",
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            error: 'Error fetching daily appointment details',
            status: 500,
        });
    }
}
