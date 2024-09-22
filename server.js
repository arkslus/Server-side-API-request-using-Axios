const axios = require("axios");
const express = require("express");
const app = express();
const path = require("path");

// set path to views
app.set("views", path.join(__dirname, "views"));
// Set the view engine for the ejs file
app.set("view engine", "ejs");
// for post request, we will need url encoded
app.use(express.urlencoded({ extended: true }));
// link css, javascript, images file with express file as a form of
// middleware in a form of public directory
app.use(express.static(path.join(__dirname, "public")));

// Step 1: Make sure that when a user visits the home page,
//   it shows a random activity.You will need to check the format of the
//   JSON data from response.data and edit the index.ejs file accordingly.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    // console.log(req.body);
    const type = req.body.type;
    const participants = req.body.participants;
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`
    );
    const result = response.data;
    // console.log(result);
    res.render("index.ejs", {
      data: result[Math.floor(Math.random() * result.length)],
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
