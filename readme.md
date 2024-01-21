# Cansat Vila2sat Dashboard
Dashboard for monitoring Vila2Sat's CanSat data.

## How does it work?
This web application uses websockets to fetch data from a .csv file and uses chart.js to create graphs for data sent by Vila2Sat's CanSat. It uses node.js and the express websocket package.

### Why does it use WebSockets?
This can be easily achieved using just JS, but it uses websockets as using websockets is much more efficient.

## What does it offer?
### Graphs: 
- Tempreature
- Altitude
- Atmospheric Pressure
- Humidity
- Velocity
All these graphs get updated real time as the data we recieve from the CanSat is stored in the csv file directly.

### Map:
- A real time map that tracks the position of the CanSat & shows the device's location.

## Screenshots
![alt text](https://cdn.discordapp.com/attachments/937704145828331521/1198773138394202242/image.png)

## Setup

1. Make sure you have `node.js` installed. 
2. Run `npm install express ws` to install express websocket
3. You can either use the `start.bat` if you use windows, or run `node server.js` to run the server
4. The server will be hosted on `localhost:3000`