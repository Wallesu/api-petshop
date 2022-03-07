const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");

const app = express();
app.use(bodyParser.json());

const router = require("./routes/providers");
app.use("/api/fornecedores", router);

app.listen(config.get("api.port"), () => {
  console.log("Working!");
});
