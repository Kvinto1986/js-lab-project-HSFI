import express from 'express';
import bodyParser from 'body-parser';

import * as db from './utils/DataBaseUtils';


const app = express();

db.setUpConnection();


app.use( bodyParser.json() );

app.post('/coordinators', (req, res) => {
    db.createCoordinatorModel(req.body).then(data => res.send(data));
});

const server = app.listen(3001, function() {
    console.log(`Server is up and running on port 3001`)});