import dbConnect from "@/lib/db";
import SystemRole from "@/models/system-role";



export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) {
        return Response.json({ error: 'Id is required', status: 400 })
    }
    try {
        await dbConnect();

        // Aggregation pipeline with $match and $project
        const manager = await SystemRole.aggregate([
            {
                $match: {
                    role: "Manager",
                },
            },
            {
                $project: {
                    name: 1,
                    lastname: 1,
                    email: 1,
                    contactnumber: 1,
                    gender: 1,
                    age: 1,
                    address: 1,

                },
            },
        ]);

        return Response.json({ manager, message: "Manager details fetched successfully", status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ error: 'Error fetching manager details', status: 500 });
    }
}
