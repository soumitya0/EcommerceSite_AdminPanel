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

app.use(
  "/api/addproduct",
  require("./Routes/adminPanle/Add_Product/AddProduct"),
);

app.use("/api/stock", require("./Routes/adminPanle/Stock/stock"));

app.listen(PORT, () => console.log(`i am running port ${PORT}`));
