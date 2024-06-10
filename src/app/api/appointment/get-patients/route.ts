import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Appointment from '@/models/appointment';

interface PaginateOptions {
  page: number;
  limit: number;
}

export async function GET(req: NextRequest) {
  try {
 
    await dbConnect();
    const patients = await Appointment.find({}).exec();

  
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
        status: 500,
      },
      { status: 500 }
    );
  }
}
