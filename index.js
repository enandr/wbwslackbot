const dotenv = require('dotenv');
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
dotenv.config();
console.log('Getting started with Node Slack SDK');
const web = new WebClient(process.env.SLACK_TOKEN);
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const currentTime = new Date().toTimeString();
const slackEvents = createEventAdapter(slackSigningSecret);
// sendMessage('bot',`The current time is ${currentTime}`);

async function sendMessage(channel, message){

  try {
    // Use the `chat.postMessage` method to send a message from this app
    await web.chat.postMessage({
      channel: `#${channel}`,
      text: message,
    });
  } catch (error) {
    console.log(error);
  }

  console.log('Message posted!');
}
