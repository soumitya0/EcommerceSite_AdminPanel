const express = require("./node_modules/express");
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/api/customer", (req, res) => {
  const customer = [{ id: 1, check: "i am working from EXPRESS" }];

  res.json(customer);
});
app.get("/testing", (req, res) => {
  res.send("i am testing from Bacckend");
});

app.listen(PORT, () => console.log(`i am running port ${PORT}`));
