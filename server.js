const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync("server.log", log + "\n", (error) => {
        if (error) {
            console.log("Unable to write to file");
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", (text) => text.toUpperCase());

app.get("/", (req, res) => {
    res.render( "home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to the web site",
        currentYear: new Date().getFullYear()
    })
});

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    });
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {
        pageTitle: "Projects page",
    })
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});