const express = require("express");
var mongoose = require("mongoose");
const app = express();
const port = 3003;
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
mongoose
  .connect("mongodb://localhost:27017/ecommerce_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, //make this also true
  })
  .then(() => {
    console.log("Connected to database!");
    
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    const userRoutes = require("./routes/user_routes");
    app.use("/api/user", userRoutes);
  });

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
