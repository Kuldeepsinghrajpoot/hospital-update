"use server"

import dbConnect from "@/lib/db";
import Appointment, { AppointmentSchema } from "@/models/appointment";
import { getNextAppointmentId } from "./appointment-counter";

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { Name, Age, Gender, Doctor, Phone, Address }: AppointmentSchema = await req.json();

        const AppointmentId = await getNextAppointmentId();
        console.log(Name, Age, Gender, Doctor, Phone, Address, AppointmentId)

        const appointment = new Appointment({
            Name,
            Age,
            Gender,
            Doctor,
            Phone,
            Address,
            AppointmentId,

        })

        const data = await appointment.save();
        return Response.json({ data, message: "Appointment created successfully", status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error creating appointment', status: 500 });
    }
}