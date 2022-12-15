require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const PORT = process.env.PORT || 8000

const connectDB = require('./config/dbConnection');

connectDB()

//* configurations
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(cors())

const clientRoutes = require('./routes/client');
const generalRoutes = require('./routes/general');
const managementRoutes = require('./routes/management');
const salesRoutes = require('./routes/sales');

//* routes
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
})