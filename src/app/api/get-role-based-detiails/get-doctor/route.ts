import dbConnect from "@/lib/db";
import Doctor from "@/models/doctor";
import SystemRole from "@/models/system-role";

export async function GET() {

    try {
        dbConnect();
        const doctor = await SystemRole.aggregate([
            {
                $match: {
                    role: "Doctor",
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
            }
        ]);



        return Response.json({ doctor, message: "Doctor details fetched successfully", status: 200 })
    } catch (error) {
        console.log(error);
    }
}