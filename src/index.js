require('dotenv').config();
const tmi = require('tmi.js');
const _ = require('lodash')

const config = require('./config.json');

const utils = require('./utils/utils');

const handleFile = require('./utils/handleFiles');
const browserActions = require('./scrapingActions/browserActions');
const apiActions = require('./scrapingActions/apiActions');


let twitchUserTarget = config.target.toLowerCase();

let messagesOnMemory = []
let viewsOnMemory = []

let lastStatus = false;

const client = new tmi.Client({
    options: { debug: false },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: 'fasterchatter',
        password: process.env.TOKEN_IRC
    },
    channels: [`${twitchUserTarget}`]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    let actualDate = new Date()
    let channelMsg = channel.substr(1)
    messagesOnMemory.push({"channel": channelMsg, "username": tags.username, "message": message, "timeStamp": actualDate });
});

async function getActualPeople(userTwitch) {
    try {
        let browserViews = await browserActions.takeScreenshotAndGetCounter(userTwitch)
        let apiViews = await apiActions.getApiData(userTwitch)
        console.log(`views totales : ${browserViews} - views reales :${apiViews.data.chatter_count}`)
    
        return {
            'browserViews' : browserViews,
            'apiViews' : apiViews.data.chatter_count,
            'ratioApiBrowser' : utils.getRatioApiViewsBrowserViews(apiViews.data.chatter_count,browserViews),
            'apiData' : apiViews.data
        }
    } catch (error) {
        console.log('fail, but we keep online')        
    }
}

function getLastStatus(){
    return lastStatus
}

function setStatus(status){
    lastStatus = status;
}

setInterval(async () => {
    let statusUser = await apiActions.streamerIsOnline(twitchUserTarget);
    
    
    if(!getLastStatus()){
        setStatus(false)
    }
    
    if (statusUser && !getLastStatus()) {
        console.log("Start Recording")
        viewsOnMemory = []
        messagesOnMemory = []
        let data = await getActualPeople(twitchUserTarget)
        viewsOnMemory.push(data)
        console.log(data)
        setStatus(true)
    }

    if (statusUser && getLastStatus()) {
        console.log("Keep Recording")
        let data = await getActualPeople(twitchUserTarget)
        viewsOnMemory.push(data)
        console.log(data)
    }
    
    if(!statusUser && getLastStatus()){
        console.log("Stream OFF, SaveFiles")
        let actualDate = new Date().getTime();
        let chatSave = await handleFile.writeJsonFile(`./data/chat_${twitchUserTarget}_${actualDate}.json`, messagesOnMemory);
        let viewsSave = await handleFile.writeJsonFile(`./data/viewers_${twitchUserTarget}_${actualDate}.json`,viewsOnMemory)
        viewsOnMemory = []
        messagesOnMemory = []
        setStatus(false)
    }

}, 1000 * 60 * 5); 