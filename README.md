<p align=center>

  <img width=300 src="https://i.imgur.com/oCp8j81.png"/>

  <br>
  <span><strong>twitch-bot-analysis</strong> It is a simple tool that allows us to analyze specific aspects of a twitch channel<br />
<img src="https://img.shields.io/badge/NodeJS-10.13.0-green"> 
<img src="https://img.shields.io/badge/License-MIT-blue">
<a href="http://girlazo.com"><img src="https://img.shields.io/badge/Website-up-green"></a>
<img src="https://img.shields.io/badge/Version-0.0.1-blue">
</p>


<p align="center">
     <a href="#installation">Installation</a>
     &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
     <a href="#configuration">Configuration</a>
     &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
     <a href="#usage">Usage</a>
     &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
     <a href="#how-does-it-work">How does it work</a>
</p>



## Installation

**NOTE**: NodeJS 10.13.0 or higher is required.

```bash
# clone the repo
$ git clone https://github.com/EsteveSegura/twitch-bot-analysis.git

# change the working directory to twitch-bot-analysis
$ cd twitch-bot-analysis

# install NodeJS & npm if they are not installed

# install the requirements
$ npm install
```


## Configuration 
The configuration is simple, there is a file with the name config.json, it is the file that we must edit so that our program works correctly

The file is located in the following path : ``./src/config.json``

``` JSON
{
     "target" : "GiRLaZo"
}
```

**target :** This is the property in which we must introduce the twitch channel of our target

## Usage
The use is easy, we just have to navigate to our **src folder** and launch the following command
``` bash
$ cd src && node index.js
```

## How does it work
The application has different mechanisms that are **triggered every 5 minutes**. Analyze the views that come from users registered on twitch and from "ghost" views not registered on the platform. It also takes screenshots and **collects the entire chat.**

**This data is collected when the streamer target transmission begins and is saved in json files once the transmission ends.**

_Captures are saved every 5 minutes *_

## License
MIT © twitch-bot-analysis
