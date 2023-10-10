// module.exports = Server
const express = require("express");
const contactRoutes = require("./routes/contactRoutes");
const dbConnect = require("./database/config");
const cors = require("cors");
const app = express();

// dotenv.config();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/contact", contactRoutes);

app.listen(2020);

console.log("estoy listo");
dbConnect();
