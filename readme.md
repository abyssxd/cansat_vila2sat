# Cansat Vila2sat Dashboard
Dashboard for monitoring Vila2Sat's CanSat data.

# How does it work?
This web application uses data from a .csv file and uses chart.js to create graphs for data sent by Vila2Sat's CanSat.

# What does it offer?
This currently shows graphs for Tempreature, Alititue and atmospheric pressure with real time updates.

# Screenshots
![alt text](https://cdn.discordapp.com/attachments/937704145828331521/1198620303916552232/image.png)

# Setup

1. Make sure you have nodejs installed. 
2. Run `npm install express ws` to install express websocket
3. You can either use the `start.bat` if you use windows, or run `node server.js` to run the server
4. The server will be hosted on `localhost:3000`