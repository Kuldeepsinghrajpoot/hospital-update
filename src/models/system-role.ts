import mongoose, { Document, Schema } from "mongoose";

export interface SystemRoleSchema extends Document {

    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    contactnumber: number;
    address:string;
    gender: string;
    age: number;

}

const ManagerModel: Schema<SystemRoleSchema> = new Schema({
    name: {
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
    contactnumber: {
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: false
    
    },
    age:{
        type: Number,
        required: false
    },
    gender:{
        type: String,
        required: false
    }
    

}, { timestamps: true }
)

const SystemRole = (mongoose.models.user as mongoose.Model<SystemRoleSchema>) || (mongoose.model<SystemRoleSchema>('user', ManagerModel))
export default SystemRole;