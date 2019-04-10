import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoordinatorsSchema = new Schema(
    {
        country: String,
        name: String,
        organization: String,
        phone: String,
        email: String,
        password: String,
    },
    {
        timestamps: true
    }
);

const Coordinators = mongoose.model('Coordinators', CoordinatorsSchema);

export default Coordinators