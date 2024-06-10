import dbConnect from "@/lib/db";
import SystemRole, { SystemRoleSchema } from "@/models/system-role";
import bcrypt from 'bcryptjs'
export async function POST(req: Request) {
    try {
        dbConnect();
        const { name, lastname, email, password, role,contactnumber,address }:SystemRoleSchema = await req.json();
        const hasPassword = await bcrypt.hash(password, 10);
        const saveystemRole = new SystemRole({
            name,
            lastname,
            email,
            password: hasPassword,
            role,
            contactnumber,
            address
        });
        const data = await saveystemRole.save();
        return Response.json({ data, message: "Role has been created successfully", status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json({ message: error, status: 400 })

    }
}

