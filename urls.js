const fs = require("fs");
const process = require("process");
const axios = require("axios");
const { url } = require("inspector");
const { webcrypto } = require("crypto");

const fileName = process.argv[2];

const getUrlsArray = (text) => {
  const urlsArray = text.split("\n");
  urlsArray.pop();
  return urlsArray;
};

const shortenUrl = (urlsArray) => {
  const shortenedUrlArray = [];
  for (let url of urlsArray) {
    const shortenedUrl = url.split("/")[2];
    shortenedUrlArray.push(shortenedUrl);
  }
  return shortenedUrlArray;
};

function writeAFile(outFile, text) {
  fs.writeFile(outFile, text, "utf8", function (err) {
    if (err) {
      console.error(`Couldn't write ${outFile}: ${err}`);
      process.exit(1);
    }
  });
  console.log(`Wrote to ${outFile}`);
}

function createShortenedUrlObject(keys, values) {
  var result = {};
  keys.forEach((key, i) => (result[key] = values[i]));
  return result;
}

fs.readFile(fileName, "utf8", (err, data) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const urlsArray = getUrlsArray(data);
  const shortenedUrlArray = shortenUrl(urlsArray);
  const shortenedUrlObject = createShortenedUrlObject(
    shortenedUrlArray,
    urlsArray
  );
  for (let key in shortenedUrlObject) {
    webCat(key, shortenedUrlObject[key]);
  }
});

async function webCat(outFile, url) {
  try {
    let resp = await axios.get(url);
    writeAFile(outFile, resp.data);
  } catch (err) {
    console.error(`Couldn't download ${url}`);
  }
}
