import dbConnect from "@/lib/db";
import CoutnerId from "@/models/counter";

export async function getNextAppointmentId() {
    await dbConnect()
    const countersCollection = CoutnerId.findOne({});
    const result = await countersCollection.findOneAndUpdate(
        { id: 'appointmentIdCounter' },
        { "$inc": { seq: 1 } },
        { upsert: true, new: true, returnDocument: 'after' }
    );
    return result.seq;
}