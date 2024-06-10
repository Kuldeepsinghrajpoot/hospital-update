import mongoose, { Schema } from "mongoose";


export interface AppointmentSchema extends Document {
    Name: string;
    Doctor: string;
    Phone: number;
    Age: number;
    Address: string;
    Gender: string;
    AppointmentId: string;

}


const Appointmentschema: Schema<AppointmentSchema> = new Schema({
    Name: {
        type: String,
        required: true
    },
   
    Address: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true
    },
    Age: {
        type: Number,
        required: true
        
    },
    Gender:{
        type: String,
        required: true
    },
    Doctor: {
        type: String,
        required: true
    },
    AppointmentId: {
        type: String,
        required: true
    }
    

}, { timestamps: true }
)

const Appointment = (mongoose.models.appointment as mongoose.Model<AppointmentSchema>) || (mongoose.model<AppointmentSchema>('appointment', Appointmentschema))

export default Appointment;