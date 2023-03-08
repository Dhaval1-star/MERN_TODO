const mongoose = require("mongoose")

async function dbconnection (params) {
    const dbconnect = await mongoose.connect("mongodb://localhost:27017/todo" , { useNewUrlParser: true }).catch((err) => {
        console.log(err)
    })
    
    if (dbconnect) {
        console.log("db connectedd")
    }    
}
mongoose.set("strictQuery", false);

dbconnection()