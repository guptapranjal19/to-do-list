const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = [];
let workItem = [];
// creating get route and sends hello when user tries to access the home page
// we are sending data from our server app.js to the browser via send method
app.get("/", function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleString("en-US", options);
    res.render("list", { listTitle: day, newListItem: items });
    // if (today.getDay() === 3) {
    //     day = "mon";
    //     // res.send("<h1>yay! its weekend.</h1>");
    //     res.render("list", { dow: day });
    // } else {
    //     // res.write("<h1>Boo! I have to work.</h1>");
    //     // res.write("<p>There is lot of piled work I need to complete.</p>");
    //     // res.send();
    //     day = "mon";
    //     res.render("list", { dow: day });
    // res.sendFile(__dirname + "/index.html");
    // }
})

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItem.push(item);
        res.redirect("/work");
    }
    else {
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItem: workItem });
})

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItem.push(item);
    res.redirect("/work");
})

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Server started on port 3000");
})