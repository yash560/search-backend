// Setting up Imports
const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const title = require("./routes/title");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const auth = require("./middleware/verifyToken");

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

app.use(express.json()); // to accept json data

// app.get("/", (req, res) => {
//   res.send("API Running!");
// });

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

// Error Handling and auth middlewares
app.use(notFound);
app.use(errorHandler);
app.use(auth);

// Declared server port i.e localhost 2000 or proovided by hosting

const PORT = process.env.PORT;

// Listen server at PORT
app.get("/", (req, res) => {
  res.send("Hello World!");
});
const server = app.listen(
  PORT,
  console.log(`Server running on PORT ${PORT}...`)
);
