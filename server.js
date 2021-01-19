var express = require("express");
var morgan = require("morgan");
var compression = require("compression");
var helmet = require("helmet");

var app = express();
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

app.use(express.static(__dirname + "/build"));
app.get("*", function (req, res) {
  res.sendFile(__dirname + "/build/index.html");
});
app.listen(process.env.PORT || 3000);
