const dotenv = require('dotenv');
const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
dotenv.config();
console.log('Getting started with Node Slack SDK');
const web = new WebClient(process.env.SLACK_TOKEN);
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const currentTime = new Date().toTimeString();
const slackEvents = createEventAdapter(slackSigningSecret);
const port = 3000;
// sendMessage('bot',`The current time is ${currentTime}`);
startEvents();


slackEvents.on('app_mention', (event) => {
  let mention = event.text.slice(15);
  mention = mention.split(' ');
  mention.slice(0,1);
  switch (mention[0]){
    case 'hi':
      sendMessage('bot', `Thanks for saying hi.`);
      break;
    case 'help':
      sendMessage('bot', `Need help?`);
      break;
    default:
      sendMessage('bot', `I repeat, ${mention.join(' ')}`);
      break;
  }
});
slackEvents.on('error', (error) => {
  console.log(error.name); // TypeError
});

function onHi(){

}

async function startEvents(){
  // Start the built-in server
  const server = await slackEvents.start(port);

  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
};

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
