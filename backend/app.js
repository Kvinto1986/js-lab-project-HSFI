const express = require('express');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./dbConfig');
const cors = require('cors');


const users = require('./routes/userRoute');
const sellers = require('./routes/sellerRoute');
const organizations = require('./routes/organizationRoute');
const uploads = require('./routes/uploadImageRoute');
const countries = require('./routes/countryRoute');
const food = require('./routes/foodGroupRoute');
const cards = require('./routes/cardRoute');
const calls = require('./routes/callRoute');
const inspections = require('./routes/inspectionRoute');
const inspectionQuestions = require('./routes/inspectionQuestionRoute');


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
app.use('/api/foodGroups', food);
app.use('/api/sellerCards', cards);
app.use('/api/calls', calls);
app.use('/api/inspections', inspections);
app.use('/api/inspectionQuestions', inspectionQuestions);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});