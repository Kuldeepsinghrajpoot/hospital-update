import mongoose, { Document, Schema } from "mongoose";


export interface ManagerSchema extends Document {

    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: string;
    age: number;

}

const ManagerModel: Schema<ManagerSchema> = new Schema({
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

const Manager = (mongoose.models.manager as mongoose.Model<ManagerSchema>) || (mongoose.model<ManagerSchema>('manager', ManagerModel))
export default Manager;