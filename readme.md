# Cansat Vila2sat Dashboard
Dashboard for monitoring Vila2Sat's CanSat data using graphs and a map for the geolocation of the cansat & the device running this application.

## What is CanSat?

- https://www.esa.int/Education/CanSat/What_is_a_CanSat

## How does it work?
This web application uses node.js and requires the express and websocket packages to run. 

- It uses websockets to fetch data from a .csv file and update information on the page right when the .csv file is modified.
- It uses chart.js to create graphs for using the data in the .csv file.
- It uses leaflet to create a map for geolocation, the map uses the GPS coordinates in the .csv file.
- It uses three.js to create a 3d model of the Cansat and show its real time location using the data in the .csv file.
(The csv file is updated using the information sent by Vila2Sat's Cansat & uses the Serial to CSV converter linked near the end of the readme.)

### Why does it use WebSockets?
This can be easily achieved using just JS, but it uses websockets as using websockets is much more efficient.

## What does it offer?

### System Status
- A system status page that shows:
  - Wether the system is online or offline
  - Wether the seeds have been deloyed or not
  - System of various components of the Vila2Sat system such as BMP280, APC220, Gyroscope, GPS...etc

### Gyroscope 3d Model
- A real time view of the Vila2Sat's Cansat rotation using a gyroscope 3d model.

### Graphs: 
- Tempreature
- Altitude
- Atmospheric Pressure
- Humidity
- Velocity
All these graphs get updated real time as the data we recieve from the CanSat is stored in the csv file directly.

### Map:
- A real time map created using leaflet maps that tracks the position of the CanSat & shows the device's location.

# Screenshots

## System Status
![Screenshot 2024-02-27 9 42 35 AM](https://github.com/abyssxd/cansat_vila2sat/assets/57658642/0db5b0e0-8f2e-4ee4-a7f5-4a381a9b6c20)

## Overview
![Screenshot 2024-02-27 9 48 13 AM](https://github.com/abyssxd/cansat_vila2sat/assets/57658642/6925b747-43c8-4263-be4d-f9602abd5e04)


## Graphs
![68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3737333832323439383731373639363033302f313230313235353039373634353135383431302f696d6167652e706e67](https://github.com/abyssxd/cansat_vila2sat/assets/57658642/e8283c3a-25b3-4aa4-aea8-ba88e48ed40a)


## Vila2Sat Gyroscope Integration
![Screenshot 2024-02-27 9 41 35 AM](https://github.com/abyssxd/cansat_vila2sat/assets/57658642/5c415991-3e7e-4bd0-82c1-c283bcf9c478)

## Serial to CSV Converter
You can find the Serial to CSV converter that was made for this dashboard here -> https://github.com/abyssxd/serial_csv/


## Setup

1. Make sure you have `node.js` installed. 
2. Run `npm install express` to install express
3. Run `npm install ws` to install websocket
4. You can either use the `start.bat` if you use windows, or run `node server.js` to run the server
5. The server will be hosted on `localhost:3000`
