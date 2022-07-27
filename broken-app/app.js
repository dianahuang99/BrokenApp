const express = require("express");
const axios = require("axios");
const ExpressError = require("./expressError");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", function (req, res, next) {
  try {
    try {
      const results = req.body.developers.map(async (d) => {
        return await axios.get(`https://api.github.com/users/${d}`);
      });
    } catch (e) {
      return next(e);
    }

    Promise.all(results).then((data) => {
      res.send(JSON.stringify(getNameAndBio(data)));
    });
  } catch (err) {
    return next(err);
  }
});

function getNameAndBio(arr) {
  return arr.map((r) => ({
    name: r.data.name,
    bio: r.data.bio,
  }));
}

/** 404 handler */

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

/** general error handler */

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err.message,
  });
});

app.listen(3000);
