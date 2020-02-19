require('dotenv').config();
const tmi = require('tmi.js');
const _ = require('lodash')

const utils = require('./utils/utils');
const asyncUtils = require('./utils/async');

const handleFile = require('./utils/handleFiles');
const browserActions = require('./scrapingActions/browserActions');
const apiActions = require('./scrapingActions/apiActions');

const pathData = './data/'

let userToTest = 'electrokidi'

let messagesOnMemory = []

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
    channels: [`${userToTest}`]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
    if (self) return;
    let actualDate = new Date()
    let channelMsg = channel.substr(1)
    messagesOnMemory.push({"channel": channelMsg, "username": tags.username, "message": message, "timeStamp": actualDate });

    if (messagesOnMemory.length == 10) {
        logChat(pathData, channelMsg, messagesOnMemory);
        messagesOnMemory = [];
    }
});

async function logChat(path, userTwitch, content) {
    let actualTimeStamp = new Date().getTime()
    let saveLog = await handleFile.writeJsonFile(`${path}chat_${userTwitch}_${actualTimeStamp}.json`, content);
    return saveLog;
}

async function getActualPeople(userTwitch) {
    let browserViews = await browserActions.takeScreenshotAndGetCounter(userTwitch)
    let apiViews = await apiActions.getApiData(userTwitch)
    console.log(`views totales : ${browserViews} - views reales :${apiViews.data.chatter_count}`)

    return {
        'browserViews' : browserViews,
        'apiViews' : apiViews.data.chatter_count,
        'ratioApiBrowser' : utils.getRatioApiViewsBrowserViews(apiViews.data.chatter_count,browserViews),
        'apiData' : apiViews.data
    }
}

(async() => {
    let statusUser = await apiActions.streamerIsOnline(userToTest);

    if (statusUser) {
        let actualDate = new Date().getTime();
        let data = await getActualPeople(userToTest)
        handleFile.writeJsonFile(`./data/viewers_${userToTest}_${actualDate}.json`,data)
        console.log(data)
    }

})();


setInterval(async () => {
    let statusUser = await apiActions.streamerIsOnline(userToTest);

    if (statusUser) {
        let actualDate = new Date().getTime();
        let data = await getActualPeople(userToTest)
        handleFile.writeJsonFile(`./data/viewers_${userToTest}_${actualDate}.json`,data)
        console.log(data)
    }

}, 1000 * 60 * 5); //1000 * 60 * 5

setInterval(() => {
    //console.log(messagesOnMemory)
}, 4000);