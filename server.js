const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const csvFilePath = path.join(__dirname, 'sheet.csv');

app.use(express.static(path.join(__dirname, 'public')));


// Variable to store the data that's already in the csv
let initialCsvData = '';

// Function to send data to all connected clients
function sendDataToClients(data) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        initialCsvData = data;
        sendDataToClients(data);
    }
});

wss.on('connection', (ws) => {
    console.log('Client connected');

    if (initialCsvData) {
        ws.send(initialCsvData); //Send the data that's already in the csv to the client
    }

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Watch the CSV data file for new data or any changes
fs.watch(csvFilePath, (filename) => {
    if (filename) {
        fs.readFile('sheet.csv', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            sendDataToClients(data); // Send the new data through the WebSocket to update the dashboard
        });
    }
});

server.listen(3000, () => {
    console.log('Running server on http://localhost:3000');
});