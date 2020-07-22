const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "/client/build")));
app.use(express.json());
app.use("/api", require("./src/routes"));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
);
app.listen(process.env.PORT || 5000, "0.0.0.0");
