const axios = require('axios');

async function getApiData(userTwitch) {
    let getData = await axios.get(`https://tmi.twitch.tv/group/user/${userTwitch}/chatters`);
    return getData
}

async function streamerIsOnline(userTwitch) {
    let headers = {
        'headers': {
            'Client-ID': 'abe7gtyxbr7wfcdftwyi9i5kej3jnq',
            'Accept': 'application/vnd.twitchtv.v5+json'
        }
    }
    let getId = await axios.get(`https://api.twitch.tv/kraken/users/?login=${userTwitch}`, headers)
    let getViews = await axios.get(`https://api.twitch.tv/helix/streams?user_id=${getId.data.users[0]._id}`, headers)
    
    if(getViews.data.data.length == 0){
        return false
    }else{
        return true
    }
}


module.exports = { getApiData, streamerIsOnline }