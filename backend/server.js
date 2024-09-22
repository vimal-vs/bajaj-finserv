const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});

module.exports = app;