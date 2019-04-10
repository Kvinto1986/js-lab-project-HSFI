import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import mongoose from 'mongoose'
import logger from 'morgan'
import Coordinators from './coordinatorsData'


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = "mongodb://localhost:27017/hsfi";

mongoose.connect(
    dbRoute,
    { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/getData", (req, res) => {
    Coordinators.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Coordinators.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Coordinators.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post("/putData", (req, res) => {
    let data = new Coordinators();

    const { country, name,organization, phone,email,password} = req.body;
    data.country = country;
    data.name = name;
    data.organization = organization;
    data.phone = phone;
    data.email = email;
    data.password = password;

    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

app.use("/server", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));