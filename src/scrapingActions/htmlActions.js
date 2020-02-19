const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')


async function getHtmlFromUrl(userTwitch) {
    let request = await axios.get(`https://twitch.tv/${userTwitch}`)
    const html = request.data

    return html
}

async function getViewsApi(userTwitch) {
    let getId = await axios.get(`https://api.twitch.tv/kraken/users/?login=${userTwitch}`, {
        'headers': {
            'Client-ID': 'abe7gtyxbr7wfcdftwyi9i5kej3jnq',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    })
    //getData.data.users[0]._id

    let getViews = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${getId.data.users[0]._id}`,{
        'headers': {
            'Client-ID': 'abe7gtyxbr7wfcdftwyi9i5kej3jnq',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    })
    console.log(getViews.data)

}

function scrapeViews(html) {
    fs.writeFile('./hey.html',html,()=>{
        console.log("DONE")
    })
    const $ = cheerio.load(html)
    //const getViews = $('div.tw-stat__value');
    const getViews = $('div.tw-stat__value');
    console.log(getViews.text())

    return getViews
}
