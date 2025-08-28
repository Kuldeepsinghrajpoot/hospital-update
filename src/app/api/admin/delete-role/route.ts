import dbConnect from "@/lib/db";
import SystemRole from "@/models/system-role";

export async function DELETE(req: Request) {

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id === null) {
        return Response.json({ error: 'id is required', status: 400 });
    }

    const page=id.split('/').filter(Boolean).pop() 
    const ids = id.split('/').filter(Boolean)[0]


    dbConnect();
    if (!id) {
        return Response.json({ error: 'id is required', status: 400 })
    }

    try {
        const role = await SystemRole.findByIdAndDelete(ids);
        
        if (!role) {
            return Response.json({ error: 'Role not found', status: 404 })
        }
        return Response.json({ message: `${page?.charAt(0).toUpperCase().concat(page?.slice(1)) } deleted successfully`, status: 200 })
    } catch (error) {
        return Response.json({ error: 'Failed to delete role', status: 500 })
    }
}