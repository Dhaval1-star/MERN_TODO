const mongoose = require("mongoose")

async function dbconnection (params) {
    console.log(process.env.DATABASE)
    // "mongodb://localhost:27017/todo"
    const dbconnect = await mongoose.connect(process.env.DATABASE , { useNewUrlParser: true }).catch((err) => {
        console.log(err)
    })
    
    if (dbconnect) {
        console.log("db connectedd")
    }    
}
mongoose.set("strictQuery", false);

dbconnection()