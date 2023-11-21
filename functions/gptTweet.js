require("dotenv").config();
const fs = require("fs");
const openai = require("openai");
const getWeather = require("./todayWeather.js");
const apiKey = process.env.OPENAI_API_KEY;
const path = require("path");
const filePath = path.join(__dirname, "assets", "preprompt.txt");
const prompt = fs.readFileSync(filePath, "utf8");

const gpt = new openai(apiKey);

async function getTweet() {
  try {
    const weather = await getWeather();
    const gptResponse = await gpt.chat.completions.create({
      messages: [
        {
          role: "system",
          content: prompt + weather,
        },
        { role: "user", content: weather },
      ],
      model: "gpt-4",
    });

    const botReply = gptResponse.choices[0].message.content;

    console.log(botReply)
    return botReply;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API OpenAI :", error);
  }
}

module.exports = getTweet;