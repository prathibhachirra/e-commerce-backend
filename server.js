// create http server
import exp from 'express'
import UserRoute from './API/Userapi.js'
import ProductRoute from './API/Productapi.js'
import { connect } from 'mongoose'


const app = exp()
const port = 2000

// middleware
app.use(exp.json())

// routes
app.use("/user-api", UserRoute)
app.use("/product-api", ProductRoute)

// connect to mongo db 
async function connectDB() {
    try {
        await connect("mongodb://localhost:27017/ecommercedb")
        console.log("database is connected successfully")

        app.listen(port, () =>
            console.log("server is listening on port", port)
        )
    } catch (err) {
        console.log("Error in DB connection", err)
    }
}

connectDB()
