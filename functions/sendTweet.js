const { TwitterApi } = require("twitter-api-v2");
const getTweet = require("./gptTweet.js");
require("dotenv").config();

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_KEY_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

console.log(client);

const rwClient = client.readWrite;

async function sendTweet() {
  try {
    let tweet = await getTweet();
    tweet = tweet.trim().replace(/^"|"$/g, "");
    tweet = tweet.replace(/\./g, ".\n");
    tweet = tweet.replace(/  +/g, ' ');
    tweet = tweet.replace(/\.\s+/g, '.\n');
    await rwClient.v2.tweet(tweet);
  } catch (e) {
    console.log(e, e.message);
  }
}

module.exports = sendTweet;
