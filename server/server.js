const express = require('express');
const colors = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from MERN API Login Register Server!'
    })
})

// Handler errors
app.use(errorHandler);

// PORT
app.listen(port, () => console.log(`Server started on port ${port}`))