# Cansat Vila2sat Dashboard
Dashboard for monitoring Vila2Sat's CanSat data using graphs and a map for the geolocation of the cansat & the device running this application.

## What is CanSat?

- https://www.esa.int/Education/CanSat/What_is_a_CanSat

## How does it work?
This web application uses websockets to fetch data from a .csv file and uses chart.js to create graphs for data sent by Vila2Sat's CanSat & a map for geolocation, the map uses the GPS coordinates sent by the Vila2Sat CanSat. It uses node.js and requires the express and websocket packages to run.

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
- A real time map created using leaflet maps that tracks the position of the CanSat & shows the device's location.

## Screenshots
![alt text](https://cdn.discordapp.com/attachments/937704145828331521/1199454828275978362/image.png)

## Serial to CSV Converter
You can find the Serial to CSV converter that was made for this dashboard here -> https://github.com/abyssxd/serial_csv/

## Setup

1. Make sure you have `node.js` installed. 
2. Run `npm install express` to install express
3. Run `npm install ws` to install websocket
4. You can either use the `start.bat` if you use windows, or run `node server.js` to run the server
5. The server will be hosted on `localhost:3000`
