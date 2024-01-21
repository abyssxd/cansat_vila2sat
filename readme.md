# Cansat Vila2sat Dashboard
Dashboard for monitoring Vila2Sat's CanSat data.

## How does it work?
This web application uses websockets to fetch data from a .csv file and uses chart.js to create graphs for data sent by Vila2Sat's CanSat. It uses node.js and the express websocket package.

### Why does it use WebSockets?
This can be easily achieved using just JS, but it uses websockets as using websockets is much more efficient.

## What does it offer?
This currently shows graphs for Tempreature, Alititue and atmospheric pressure with real time updates.

## Screenshots
![alt text](https://cdn.discordapp.com/attachments/937704145828331521/1198635256761286746/image.png?ex=65bf9f12&is=65ad2a12&hm=e637b8950631aabcf8c39b27ea24524c9d8532373a7e5f7548a31be6d92269cb&)

## Setup

1. Make sure you have nodejs installed. 
2. Run `npm install express ws` to install express websocket
3. You can either use the `start.bat` if you use windows, or run `node server.js` to run the server
4. The server will be hosted on `localhost:3000`