import dbConnect from "@/lib/db";
import Appointment from "@/models/appointment";
import SystemRole from "@/models/system-role";


export async function GET() {

    dbConnect();
    const Admin = await SystemRole.countDocuments({role: 'Admin'});
    // const managers = await Manager.countDocuments({role: 'manager'});
    // todo: uncomment the above line after creating the manager model

    const managers = await SystemRole.countDocuments({role: 'Manager'});
    const appointments = await Appointment.countDocuments({});
    const doctors = await SystemRole.countDocuments({role: 'Doctor'});
    const user = await SystemRole.countDocuments({role: 'User'});
 
    return Response.json({Admin, managers, appointments, doctors, user, status: 200 , message: "All records fetched successfully"});

  
}