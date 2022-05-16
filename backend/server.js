const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5001
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

// json body-parser
app.use(express.json())
app.use(cors())
// url encoded
app.use(express.urlencoded({extended : false}))

app.use('/api/',require('./routes/donationRoutes'))
app.use('/api/user/',require('./routes/userRoutes'))
app.use('/api/medical-centre/',require('./routes/medicalCentreRoutes'))


app.use(errorHandler)
app.listen(port, ()=>{
    console.log("server started on " + port)
})


