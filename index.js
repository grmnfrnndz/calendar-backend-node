const express = require('express');
const {dbConnection} = require("./database/config");
const cors = require('cors');
require('dotenv').config();

//create server express
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// read and parse body (params)
app.use(express.json());

// directory public - middleware (always ejecute)
app.use(express.static('public'));

//routes
// app.get('/', (request, response) => {
//
//     response.json({'ok': true})
//
// });

app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// listening request
app.listen(process.env.PORT, () => {
    console.log(`Server runing on port ${process.env.PORT}`);
});

