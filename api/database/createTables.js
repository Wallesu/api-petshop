const tableModels = require("../models/Provider");

tableModels
  .sync()
  .then(() => console.log("Tabela criada com sucesso!"))
  .catch(console.log());
