
import dbConnect from '@/lib/db';
import Appointment, { AppointmentSchema } from '@/models/appointment';

interface PaginateOptions {
  page: number;
  limit: number;
}


export async function GET(req: Request) {
  const {searchParams} = new URL(req.url)
  const id = searchParams.get('id');
  if (!id) {
      return Response.json({ error: 'Id is required', status: 400 })
  }
  try {

    await dbConnect();
    const patients: AppointmentSchema[] = await Appointment.find().exec();


    return Response.json({
      patients,

      message: 'Patient details fetched successfully',
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return Response.json(
      {
        message: 'Internal server error',
        status: 500,
      },
      { status: 500 }
    );
  }
}
