import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CoordinatorsSchema = new Schema({
    country: { type: String },
    name: { type: String },
    organization: { type: String },
    phone: { type: String },
    email:{ type: String },
    password:{ type: String },
});

const Coordinators = mongoose.model('Coordinators', CoordinatorsSchema);