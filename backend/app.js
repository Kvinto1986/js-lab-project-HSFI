const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const cors = require('cors');


const users = require('./routes/user');
const sellers = require('./routes/seller');
const organizations = require('./routes/organization');
const uploads = require('./routes/uploadImage');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use('/api/users', users);
app.use('/api/sellers', sellers);
app.use('/api/organizations', organizations);
app.use('/api/organizations', organizations);
app.use('/api/uploads', uploads);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});