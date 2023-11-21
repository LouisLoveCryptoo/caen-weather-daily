const sendTweet = require("./functions/sendTweet.js");
const cron = require("node-cron");

cron.schedule(
  "0 6 * * *",
  () => {
    console.log("Envoi d'un tweet programmé à 6h00 du matin");
    sendTweet();
  },
  {
    scheduled: true,
    timezone: "Europe/Paris",
  }
);
