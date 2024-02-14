//Websocket connection ---- START
const ws = new WebSocket('ws://localhost:3000');

ws.onopen = function() {
    console.log('WebSocket connection established');
};

ws.onerror = function(error) {
    console.error('WebSocket Error:', error);
};

ws.onclose = function(event) {
    console.log('WebSocket connection closed', event.code, event.reason);
};


/*TEST ---- START

        system_status_data = 1;
        bmp_status_data = 1;
        gps_status_data = 0;
        gyro_status_data = 0;
        apc_status_data = 1;
        

        if(system_status_data != 1){
            document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (bmp_status_data != 1){
            document.getElementById("bmpBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("bmpBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (gps_status_data != 1){
            document.getElementById("gpsBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("gpsBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (gyro_status_data != 1){
            document.getElementById("gyroBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("gyroBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (apc_status_data != 1){
            document.getElementById("apcBlock").style.backgroundColor = "#ff5c5c";
        }else {
            document.getElementById("apcBlock").style.backgroundColor = "#5cff5c";
        }


        if(system_status_data == 1 && bmp_status_data == 1 && gps_status_data == 1 && gyro_status_data == 1 && apc_status_data == 1){
            document.getElementById("sysStatusText").innerHTML = "Online";
            document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
        } else if (system_status_data == 1 || bmp_status_data == 1 || gps_status_data == 1 || gyro_status_data == 1 || apc_status_data == 1){
            document.getElementById("sysStatusText").innerHTML = "Partially Online";
            document.getElementById("sysBlock").style.backgroundColor = "#ffd85c";
        } else {
            document.getElementById("sysStatusText").innerHTML = "Offline";
            document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
        }


TEST ---- END
*/



//Websocket connection ---- END

ws.onmessage = (event) => {
        const csvData = parseCSV(event.data);
        const latestData = csvData[csvData.length - 1];
    
        system_status_data = latestData[9];
        bmp_status_data = latestData[10];
        gps_status_data = latestData[11];
        gyro_status_data = latestData[12];
        apc_status_data = latestData[13];
        

        if(system_status_data != 1){
            document.getElementById("sysBlock").style.display = "background-color: #ff5c5c";
        }else{
            document.getElementById("sysBlock").style.display = "background-color: #5cff5c";
        }
        
        if (bmp_status_data != 1){
            document.getElementById("bmpBlock").style.display = "background-color: #ff5c5c";
        }else{
            document.getElementById("bmpBlock").style.display = "background-color: #5cff5c";
        }
        
        if (gps_status_data != 1){
            document.getElementById("gpsBlock").style.display = "background-color: #ff5c5c";
        }else{
            document.getElementById("gpsBlock").style.display = "background-color: #5cff5c";
        }
        
        if (gyro_status_data != 1){
            document.getElementById("gyroBlock").style.display = "background-color: #ff5c5c";
        }else{
            document.getElementById("gyroBlock").style.display = "background-color: #5cff5c";
        }
        
        if (apc_status_data != 1){
            document.getElementById("apcBlock").style.display = "background-color: #ff5c5c";
        }else {
            document.getElementById("apcBlock").style.display = "background-color: #5cff5c";
        }


        if(system_status_data == 1 && bmp_status_data == 1 && gps_status_data == 1 && gyro_status_data == 1 && apc_status_data == 1){
            document.getElementById("sysBlock").innerHTML = "Online";
            document.getElementById("sysBlock").style.display = "background-color: #5cff5c";
        } else if (system_status_data != 1 || bmp_status_data != 1 || gps_status_data != 1 || gyro_status_data != 1 || apc_status_data != 1){
            document.getElementById("sysBlock").style.display = "Partially Online";
            document.getElementById("sysBlock").style.display = "background-color: #ffd85c";
        } else{
            document.getElementById("sysBlock").style.display = "Offline";
            document.getElementById("sysBlock").style.display = "background-color: #ff5c5c";
        }
        

};


//Function to parse the CSV & tirm the values. This should work both on windows and linux.
function parseCSV(csvString) {
    const rows = csvString.trim().split(/\r?\n/);
    return rows.map(row => row.split(',').map(cell => cell.trim()));
}
