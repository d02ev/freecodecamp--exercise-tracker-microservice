const Express = require('express');
const Mongoose = require('mongoose');
const BodyParser = require('body-parser');
const CORS = require('cors');
// dotenv config import
require('dotenv/config')

const App = Express();

// middlewares
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(CORS());

// static assets
App.use(Express.static('public'))

// route import
const api_user_route = require('./routes/api-user');

// defining the custom routes
App.use('/api/users', api_user_route);

// form page
App.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// mongodb connection
Mongoose.connect(process.env.DB_URI, () => console.log('Connected to DB!'));

const listener = App.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is running on http://localhost:${process.env.PORT}`);
})
