const express = require("./node_modules/express");
const app = express();
const PORT = process.env.PORT || 8000;

//db
const connectDb = require("./config/db");
connectDb();

//Middle Ware
app.use(express.json({ extended: false }));

app.get("/api/customer", (req, res) => {
  const customer = [{ id: 1, check: "i am working from EXPRESS" }];

  res.json(customer);
});
app.get("/testing", (req, res) => {
  res.send("i am testing from Bacckend");
});

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

app.listen(PORT, () => console.log(`i am running port ${PORT}`));
