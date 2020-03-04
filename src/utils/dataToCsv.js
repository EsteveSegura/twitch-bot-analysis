const handleFiles = require('./handleFiles.js');

function convertViewsToCSV(viewsJson){
     let headers = ["time","totalViews","realViews","fakeViews"]
     let headerString = headers.toString()
     let bodyString = headerString + "\n"
     let time = []

     for(let i = 0 ; i < viewsJson.length; i++){
          if(i == 0){
               time.push(0)
          }
          time.push(time[time.length-1] + 5)
          bodyString = `${bodyString}${time[i]},${viewsJson[i].browserViews},${viewsJson[i].apiViews},${viewsJson[i].browserViews - viewsJson[i].apiViews}\n`
     }

     return bodyString
}


/*
(async () => {
     let data = await handleFiles.readJsonFile('../data/viewers_danirippah_1582562869128.json')
     let viewsToCsv = convertViewsToCSV(data)
     handleFiles.writeCsvFile('../data/viewers_danirippah_1582562869128.csv',viewsToCsv)
     console.log(viewsToCsv)
})();
*/

module.exports = { convertViewsToCSV }