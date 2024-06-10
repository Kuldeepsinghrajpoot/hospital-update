import mongoose, { Schema, Document } from "mongoose";


export interface DoctorSchema extends Document {
    firstname:  string;
    lastname:   string;
    email: string;
    password: string;
    role: string;
    age: number;
    gender: string;
    phone: number;
}

const DoctorSchema: Schema<DoctorSchema> = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }

}, { timestamps: true }
)

const Doctor = (mongoose.models.doctor as mongoose.Model<DoctorSchema>) || (mongoose.model<DoctorSchema>('doctor', DoctorSchema))
export default Doctor;