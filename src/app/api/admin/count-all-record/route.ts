import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import SystemRole from "@/models/system-role";
import { NextResponse } from "next/server";



export async function GET(req: Request, res: Response) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) {
        return Response.json({ error: 'Id is required', status: 400 })
    }

    dbConnect();
    const Admin = await SystemRole.countDocuments({role: 'Admin'});
    // const managers = await Manager.countDocuments({role: 'manager'});
    // todo: uncomment the above line after creating the manager model

    const managers = await SystemRole.countDocuments({role: 'Manager'});
    const appointments = await Appointment.countDocuments({});
    const doctors = await SystemRole.countDocuments({role: 'Doctor'});
    const user = await SystemRole.countDocuments({role: 'User'});

    console.log("counting all records")
 
    return NextResponse.json({Admin, managers, appointments, doctors, user, status: 200 , message: "All records fetched successfully"});

  
}