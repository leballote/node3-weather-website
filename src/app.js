const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast.js");
const geocode = require("./utils/geocode.js");

const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsDirectoryPath = path.join(__dirname, "..", "viewTemplates", "views");
const partialsPath = path.join(__dirname, "..", "viewTemplates", "partials");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicDirectoryPath));
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Luis Ballote",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Luis Ballote",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "I hope I helped you!",
    title: "Help",
    name: "Luis Ballote",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecast) => {
      if (error) {
        return console.log(error);
      }
      res.send({
        forecast,
        location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "Help article not found",
    name: "Luis",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    message: "Page not found",
    name: "Luis",
  });
});

app.listen(port, () => {
  console.log(`The server is up on port ${port}.`);
});
