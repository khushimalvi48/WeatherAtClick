const express = require("express");
const app = express();
const path = require("path");
const ejs = require('ejs');
const port = process.env.PORT || 8000; //process.env.PORT is used when we are hosting it somewhere

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "../templates/views"));


//public static path
app.use(express.static(path.join(__dirname, "../public")))



//routing
app.get("/", (req,res) =>{

    res.render("index");
})
app.get("/about", (req,res) =>{
    res.render("about");
})
app.get("/weather", (req,res) =>{
    res.render("weather");
})
app.get("*", (req,res) =>{
    res.render("404error", {
        errmsg: "Opps! Page Not Found"
    });
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})