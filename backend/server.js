const express = require("express");
const app = express();

app.get("/api/health", (req,res) => {
    res.json({status: "ok"});
})

const port = 5000;

app.listen(port, () => {
    console.log(`app is listening to port  ${port}`)
})