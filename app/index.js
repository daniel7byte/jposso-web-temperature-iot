const express = require("express");
const app = express();
const morgan = require("morgan");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Templates
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Routes
app.use("/", express.static(__dirname + "/public"));
app.use("/web", require("./routes/index"));
app.use("/api", require("./routes/api"));
app.use("/api/iot", require("./routes/iot"));

// Start server
app.listen(app.get("port"), () => {
  console.info(`Server on http://localhost:${app.get("port")}`);
});
