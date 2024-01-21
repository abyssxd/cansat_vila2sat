console.log("hi");


const tempChartElement = document.getElementById('temperature').getContext('2d');
const tempChart = new Chart(tempChartElement, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Temperature',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const altitudeChartElement = document.getElementById('altitude').getContext('2d');
const altitudeChart = new Chart(altitudeChartElement, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Altitude',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const pressureChartElement = document.getElementById('pressure').getContext('2d');
const pressureChart = new Chart(pressureChartElement, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Pressure',
            data: [],
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


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

ws.onmessage = (event) => {

    const csvData = parseCSV(event.data);
    console.log(csvData)

    const time = csvData.map(row => row[0]);

    //Update temperature chart
    const tempData = csvData.map(row => parseFloat(row[1]));
    updateChartData(tempChart, time, tempData);

    //Update pressure chart
    const pressureData = csvData.map(row => parseFloat(row[2]));
    updateChartData(pressureChart, time, pressureData);

    //Update altitude chart
    const altitudeData = csvData.map(row => parseFloat(row[3]));
    updateChartData(altitudeChart, time, altitudeData);


};

function parseCSV(csvString) {
    const rows = csvString.split('\n');
    return rows.map(row => row.split(','));
}

console.log(Chart)

function updateChartData(chart, labels, data) {
    chart.data.labels = labels;
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.update();
}