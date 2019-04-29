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
const countries = require('./routes/country');
const food = require('./routes/food');
const cards = require('./routes/sellerCards');
const calls = require('./routes/call');


mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/static', express.static('public'));
app.use('/api/users', users);
app.use('/api/sellers', sellers);
app.use('/api/organizations', organizations);
app.use('/api/uploads', uploads);
app.use('/api/countries', countries);
app.use('/api/foodGroup', food);
app.use('/api/sellerCard', cards);
app.use('/api/calls', calls);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});