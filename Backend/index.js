const express = require("./node_modules/express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8080;

var fs = require("fs");

//cors
//var cors = require("cors");

//
const corsMiddleware = require("./middleWare/corsMiddleware");

//db
const connectDb = require("./config/db");
connectDb();

//cors MiddleWare
app.use(corsMiddleware.preventCROS);

app.use(express.static(__dirname)); //******** */

//Middle Ware
app.use(express.json({ extended: false }));

//app.use(express.static(__dirname));

app.get("/api/customer", (req, res) => {
  const customer = [{ id: 1, check: "i am working from EXPRESS" }];

  res.json(customer);
});
app.get("/testing", (req, res) => {
  res.send("i am testing from Bacckend");
});

// const corsOpption = {
//   origin: "*",
//   allowedHeaders: "*",
// };
// // CORS
// app.use(cors(corsOpption));

// Dinfine Route
// @des   admin
app.use("/api/admin", require("./Routes/adminPanle/Admin_API/adminApi"));

//@des    category
app.use(
  "/api/category",
  require("./Routes/adminPanle/AddCategory/categoryApi"),
);

//@des    product
app.use(
  "/api/addproduct",
  require("./Routes/adminPanle/Add_Product/AddProduct"),
);

//@des    stock
app.use("/api/stock", require("./Routes/adminPanle/Stock/stock")); //Not working currently

//@des    UserApi
app.use("/api/user", require("./Routes/client/User_Api/userApi"));

//@des  InstaMojo paymentgatway
app.use("/api/bid", require("./Routes/InstaMojo/bid"));

//@des  Order
app.use("/api/order", require("./Routes/client/Order/Order"));

//@des  Seacrh Bar Product
app.use("/api/search", require("./Routes/client/SearchBarAPi/Search"));

//@dec  Product
app.use("/api/product", require("./Routes/adminPanle/Product/Product"));

app.listen(PORT, () => console.log(`i am running port ${PORT}`));
