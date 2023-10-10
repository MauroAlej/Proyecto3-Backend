const mongoose = require("mongoose");
dbConnect = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://emiduarte643:0njA7CxyiTlCO2yT@cluster0.ktizopi.mongodb.net/"
      )
      .then(() => console.log("base de datos Conectado"));
  } catch (error) {
    throw new Error("se podrujo un error", error);
  }
};
module.exports = dbConnect;
