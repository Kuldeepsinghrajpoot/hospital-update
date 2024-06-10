import mongoose, { Schema } from 'mongoose'
const coutnerId = new Schema({
    // Your other schema fields...
    id: { type: String },
    seq: { type: Number }
});



const CoutnerId = mongoose.models.Index || mongoose.model("Index", coutnerId);
export default CoutnerId