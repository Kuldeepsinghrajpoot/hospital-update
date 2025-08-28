import dbConnect from "@/lib/db";
import SystemRole from "@/models/system-role";
import bcrypt from 'bcryptjs'
export async function PUT(req: Request) {
    try {
        dbConnect();
        const { password, newPassword, id } = await req.json();
        if (!password || !newPassword || !id) {
            return Response.json({ error: 'All fields are required', status: 400 })
        }

        const findId = await SystemRole.findById({ _id: id }).select('password');
        if (!findId) {
            return Response.json({ error: 'User not found', status: 404 })
        }

        const isMatch = await bcrypt.compare(password, findId.password);

        if (!isMatch) {
            return Response.json({ error: 'Invalid credentials', status: 400 })
        }

        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const update = await SystemRole.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        return Response.json({ message: 'Password updated successfully', status: 200 })

    } catch (error) {
        return Response.json({ error: 'Failed to update password', status: 500 })
    }
}