const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const supervillains = require("supervillains");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us6.api.mailchimp.com/3.0/lists/831eaa1775";
  const options = {
    method: "POST",
    auth: "praneetk77:e5cdfb6a2865b226d64a01d4f7fe190b-us6",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      var nickname = supervillains.random();
      res.send(
        "You have been admitted into the akatsuki. From now on, you will go by the name " +
          nickname +
          "."
      );
    } else {
      res.send("You are not worthy of joining the akatsuki.");
    }
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server running on port 3000.");
});

//api key = e5cdfb6a2865b226d64a01d4f7fe190b-us6
//audience id = 831eaa1775
