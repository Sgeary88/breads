const express = require("express");
const mongoose = require("mongoose");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();

// MONGOOSE
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}, () => {
  console.log( `connected to mongo: ${MONGO_URI}`);
});

// DEPENDENCIES
const methodOverride = require("method-override");

// MIDDLEWARE
app.use(express.static("public")); // Exposing the public folder to the client
app.use(express.urlencoded({ extended: true })); // Encoding your requests so they are Javascript formatted
app.use(methodOverride('_method'))
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine()); // Allowing your server to read your views folder and the jsx files inside of them

// Routes
app.get("/", (req, res) => {
  res.send("<h1>BreadCrud</h1>");
});

// Breads
const breadsController = require("./controllers/breads_controller.js");
app.use("/breads", breadsController);

// 404 Page
app.get("*", (req, res) => {
  res.render("404");
});

app.listen(PORT, () => {
  console.log("nomming at port", PORT);
});
