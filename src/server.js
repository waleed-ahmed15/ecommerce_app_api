const express = require("express");
var mongoose = require("mongoose");
const app = express();
const port = 3003;
const bodyparser = require("body-parser");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("uploads"));

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
    const productRoutes = require("./routes/product_routes");
    app.use("/api/product", productRoutes);

    const categoryRoutes = require("./routes/category_routes");
    app.use("/api/category", categoryRoutes);

    const fileRoutes = require("./routes/file_routes");
    app.use("/api/fileupload", fileRoutes);

    const orderRoutes = require("./routes/order_routes");
    app.use("/api/order", orderRoutes);
  });

app.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
