import dbConnect from "@/lib/db";
import SystemRole, { SystemRoleSchema } from "@/models/system-role";

export async function PUT(req: Request) {
   const {searchParams} = new URL(req.url)
   const id = searchParams.get('id');
    try {
        dbConnect();
        const { name, lastname, email, contactnumber, address,age,gender }: SystemRoleSchema = await req.json();
        console.log(name, lastname, email, contactnumber, address,age,gender)
       
        if (!name || !lastname || !email || !contactnumber || !address||!age||!gender) {
            return Response.json({ error: 'All fields are required', status: 400 })
        }

        console.log(name, lastname, email, contactnumber, address,age,gender)
        const update = await SystemRole.findByIdAndUpdate(id, { name, lastname, email, contactnumber, address,age,gender }, { new: true });
        return Response.json({ message: 'Profile updated successfully', status: 200 })

    } catch (error) {
        return Response.json({ error: 'Failed to update profile', status: 500 })
    }
}

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) {
        return Response.json({ error: 'Id is required', status: 400 })
    }
    try {
        dbConnect();
        const profile = await SystemRole.findById({ _id: id}).select("-password -role -createdAt -updatedAt -__v ");
        return Response.json({ profile, status: 200 })
    } catch (error) {
        return Response.json({ error: 'Failed to fetch data', status: 500 })
    }
}