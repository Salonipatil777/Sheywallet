const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
app.use(express.json());
require("./db/conn");
const router = require("./routes/auth");
const transactionRoute = require("./routes/transactionRoute");
const requestRoute = require("./routes/requestRoute");

app.use("/api/users", router);
app.use("/api/transactions", transactionRoute);
app.use("/api/requests", requestRoute);
const PORT = process.env.PORT;

//deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
