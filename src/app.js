const express = require('express');
require('./database/db');

//routes
const userRoute = require('./routes/user');
const projectRoute = require('./routes/project');
const educationRoute = require('./routes/education');
const certificateRoute = require('./routes/certificate');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(userRoute);
app.use(projectRoute);
app.use(educationRoute);
app.use(certificateRoute);

app.listen(port, () => {
    console.log('Server is up and running');
}) 