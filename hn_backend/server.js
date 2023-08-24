const express = require("express")
const cors = require('cors'); 
const router = require("./routes/router")

const app = express()

app.use(cors());

const port = 5000

app.use("/api", router)

app.listen(port, () => {
    console.log("server is started");
})