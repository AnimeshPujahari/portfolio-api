//Core modules
const express = require('express');
require('./database/db');

//Router modules
const userRouter = require('./routes/user');
const eduRouter = require('./routes/education');
const projRouter = require('./routes/projects');

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(eduRouter);
app.use(projRouter);

app.listen(port , () => {
    console.log(`Server is up and running on ${port}`);
});

