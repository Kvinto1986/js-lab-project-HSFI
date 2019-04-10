import mongoose from "mongoose";

import '../models/coordinatorModel';

const coordinatorModel = mongoose.model('Coordinators');

export function setUpConnection() {
    mongoose.connect(`mongodb://HSFImanager:HSFImanager1111@ds042417.mlab.com:42417/hsfi`);
}

export function createCoordinatorModel(data) {
    const newCoordinator = new coordinatorModel({
        country: data.country,
        name: data.name,
        organization: data.organization,
        phone: data.phone,
        email:data.email,
        password:data.password,
        createdAt: new Date()
    });

    return newCoordinator.save();
}
