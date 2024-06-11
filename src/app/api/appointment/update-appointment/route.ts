import dbConnect from "@/lib/db"
import Appointment, { AppointmentSchema } from "@/models/appointment";
import { AppointmentVerified } from "@/schema/appointment";
import { stat } from "fs"
import { Schema, Types } from "mongoose";

export async function GET(req: Request, res: Response) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id'); 
console.log('server-id',id)
   

    try {
        dbConnect();
        const appointment = await Appointment.findById({_id:id});
       
        if (!appointment) {
            return Response.json({ error: 'Appointment not found', success: false, status: 404 })
        }
        return Response.json({ appointment, success: true, status: 200 })
    } catch (error) {
        return Response.json({ error: error, success: false, status: 500 })
    }
}

export async function PUT(req: Request, res: Response) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return  Response.json({ error: 'Appointment ID is required', success: false, status: 400 });
        }
// console.log('hi data',req.json())
//         const json = await req.json();
//         const result = AppointmentVerified.safeParse(json); // Validate with Zod

//         if (!result.success) {
//             return  Response.json({ error: result.error.errors, success: false, status: 400 });
//         }

        const { Name, Age, Gender, Phone, Address, Doctor }:any = await req.json();
        
        await dbConnect();
        const objectId = new Schema.Types.ObjectId(id);

        const appointment = await Appointment.findByIdAndUpdate(id, {
            Name, Age, Gender, Phone, Address, Doctor
        }, { new: true }).exec();

        if (!appointment) {
            return  Response.json({ error: 'Appointment not found', success: false, status: 404 });
        }

        return  Response.json({ appointment, success: true, status: 200 });
    } catch (error: any) {
        console.error('Error updating appointment:', error);
        return  Response.json({ error: error.message || 'Internal Server Error', success: false, status: 500 });
    }
}
