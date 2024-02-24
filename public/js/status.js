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


//TEST ---- START
/*
bmp_status = 0;
gps_status = 0;
gyro_status = 0;
apc_status = 0;

if (bmp_status != 1 && gps_status != 1 && gyro_status != 1 && apc_status != 1) {
	system_status = 1;
    document.getElementById("errorBlock").style.display = "block";
} else {
	system_status = 0;
    document.getElementById("errorBlock").style.display = "none";
}


if (system_status != 1) {
	document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
} else {
	document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
}

if (bmp_status != 1) {
	document.getElementById("bmpBlock").style.backgroundColor = "#ff5c5c";
} else {
	document.getElementById("bmpBlock").style.backgroundColor = "#5cff5c";
}

if (gps_status != 1) {
	document.getElementById("gpsBlock").style.backgroundColor = "#ff5c5c";
} else {
	document.getElementById("gpsBlock").style.backgroundColor = "#5cff5c";
}

if (gyro_status != 1) {
	document.getElementById("gyroBlock").style.backgroundColor = "#ff5c5c";
} else {
	document.getElementById("gyroBlock").style.backgroundColor = "#5cff5c";
}

if (apc_status != 1) {
	document.getElementById("apcBlock").style.backgroundColor = "#ff5c5c";
} else {
	document.getElementById("apcBlock").style.backgroundColor = "#5cff5c";
}


if (bmp_status == 1 && gps_status == 1 && gyro_status == 1 && apc_status == 1) {
	document.getElementById("sysStatusText").innerHTML = "Online";
	document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
} else if (bmp_status == 1 || gps_status == 1 || gyro_status == 1 || apc_status == 1) {
	document.getElementById("sysStatusText").innerHTML = "Partially Online";
	document.getElementById("sysBlock").style.backgroundColor = "#ffd85c";
} else {
	document.getElementById("sysStatusText").innerHTML = "Offline";
	document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
}

*/
//TEST ---- END



//Websocket connection ---- END

ws.onmessage = (event) => {
        const csvData = parseCSV(event.data);
        const latestData = csvData[csvData.length - 1];
    
        gps_sats = latestData[7];
        bmp_status = latestData[9];
        gps_status = latestData[10];
        gyro_status = latestData[11];
        apc_status = latestData[12];
        
        document.getElementById("gpsSats").innerHTML = "Satallites: " + gps_sats;

        if (bmp_status != 1 && gps_status != 1 && gyro_status != 1 && apc_status != 1) {
        	system_status = 1;
            document.getElementById("errorBlock").style.display = "block";
        } else {
        	system_status = 0;
            document.getElementById("errorBlock").style.display = "none";
        }
        

        if(system_status != 1){
            document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (bmp_status != 1){
            document.getElementById("bmpBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("bmpBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (gps_status != 1){
            document.getElementById("gpsBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("gpsBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (gyro_status != 1){
            document.getElementById("gyroBlock").style.backgroundColor = "#ff5c5c";
        }else{
            document.getElementById("gyroBlock").style.backgroundColor = "#5cff5c";
        }
        
        if (apc_status != 1){
            document.getElementById("apcBlock").style.backgroundColor = "#ff5c5c";
        }else {
            document.getElementById("apcBlock").style.backgroundColor = "#5cff5c";
        }


        if(bmp_status == 1 && gps_status == 1 && gyro_status == 1 && apc_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Online";
            document.getElementById("sysBlock").style.backgroundColor = "#5cff5c";
        } else if (bmp_status == 1 || gps_status == 1 || gyro_status == 1 || apc_status == 1){
            document.getElementById("sysStatusText").innerHTML = "Partially Online";
            document.getElementById("sysBlock").style.backgroundColor = "#ffd85c";
        } else {
            document.getElementById("sysStatusText").innerHTML = "Offline";
            document.getElementById("sysBlock").style.backgroundColor = "#ff5c5c";
        }

};

//Function to parse the CSV & tirm the values. This should work both on windows and linux.
function parseCSV(csvString) {
	const rows = csvString.trim().split(/\r?\n/);
	return rows.map(row => row.split(',').map(cell => cell.trim()));
}
