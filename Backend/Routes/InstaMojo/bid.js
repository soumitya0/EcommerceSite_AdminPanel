const express = require("express");
const router = express.Router();

const Insta = require("instamojo-nodejs");

const url = require("url");

// schema
const SchemaOrder = require("../../Models/client/Order/SchemaOrder");

//@API          POST /api/bid/pay
//@Desc         getting the Payment Gateway by Instmojo
router.post("/pay", (req, res) => {
  Insta.setKeys(
    "test_6fbac065c8c1c4bb20bab77af49",
    "test_a0ae41cc74982a60a2643811d0a",
  );

  const data = new Insta.PaymentData();
  Insta.isSandboxMode(true); // if your are using testing ENV then make is ture

  data.purpose = req.body.purpose;
  data.amount = req.body.amount;
  data.buyer_name = req.body.buyer_name;

  data.email = req.body.email;
  data.redirect_url = req.body.redirect_url;
  data.send_email = false;
  data.weebhook = "http://www.example.com/webhook/";
  data.send_sms = false;
  data.allow_repeated_payment = false;

  Insta.createPayment(data, function (error, response) {
    if (error) {
      // some error
    } else {
      // Payment redirection link at response.payment_request.longurl
      console.log(response);

      const responseData = JSON.parse(response);
      const redirectUrl = responseData.payment_request.longurl;
      console.log(redirectUrl, "longurl");
      //res.status(200).json(response);
      res.status(200).json(redirectUrl);
    }
  });
});

// @API         GET /api/bid/callback
// @Desc         when the paymet successful then it redirect to thi api
//npm i url
router.get("/callback", async (req, res) => {
  let url_parts = url.parse(req.url, true);
  console.log(url_parts.query);
  let responseData = url_parts.query;

  if (responseData.payment_id) {
    let userId = responseData.user_id;
    console.log(userId);
    var dataInstaMojo = JSON.stringify(responseData);

    var responseInstaMojo = encodeURIComponent(dataInstaMojo); //pass
    console.log(responseInstaMojo, "STRINGIFY");

    return res.redirect(
      "http://localhost:3000/payment-complete/?valid=" + dataInstaMojo,
    );
  }
});

module.exports = router;
