// Setting up Imports
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const title = require("./routes/title");

// Declared server port i.e localhost 2000 or proovided by hosting
const PORT = process.env.PORT || 2000;

const path = require("path");
var cors = require("cors");

// securing ENV
dotenv.config();

// database connection
connectDB();

// initialising our app
const app = express();

// getting rid of access control policy
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader(
    "Access-Control-Allow-Method",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  next();
});
app.use(express.json()); // to accept json data

// Initialising routes
app.use("/api/user", userRoutes);
app.use("/api/titles", title);

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname1, "/frontend/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// --------------------------deployment------------------------------

// Listen server at PORT
app.get("/", (req, res) => {
  res.send("API Running!");
});
app.listen(PORT, console.log(`Server running on PORT ${PORT}...`));
