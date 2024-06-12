import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/appointment';



export async function GET(req: NextRequest) {

    const { searchParams } = new URL(req.url)
    const name = searchParams.get('id')
    console.log(name)
    try {
        await dbConnect();
        const patients = await Appointment.aggregate([
            {
                $match: {
                    Doctor: name,
                }
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
        ]);


        return NextResponse.json({
            patients,

            message: 'Patient details fetched successfully',
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching patient data:', error);
        return NextResponse.json(
            {
                message: 'Internal server error',
            },
            { status: 500 }
        );
    }
}
