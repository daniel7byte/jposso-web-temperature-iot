const express = require("express");
const app = express();
const morgan = require("morgan");

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require("./routes/index"));
app.use("/", express.static(__dirname + "/public"));
app.use("/api", require("./routes/api"));
app.use("/api/iot", require("./routes/iot"));

// Start server
app.listen(app.get("port"), () => {
  console.info(`Server on http://localhost:${app.get("port")}`);
});
