const sensorData = [
    {
        name: "Temperature Sensor",
        value: 82,
        unit: "°C",
        threshold: 75
    },

    {
        name: "Pressure Sensor",
        value: 95,
        unit: "kPa",
        threshold: 100
    },

    {
        name: "Humidity Sensor",
        value: 88,
        unit: "%",
        threshold: 70
    },

    {
        name: "Gas Sensor",
        value: 45,
        unit: "ppm",
        threshold: 50
    }
];


document.getElementById("processSensors")
.addEventListener("click", function() {

    // filter() finds sensors above their threshold
    const criticalSensors = sensorData.filter(function(sensor) {

        return sensor.value > sensor.threshold;

    });


    // map() formats the critical sensor data
    const alerts = criticalSensors.map(function(sensor) {

        return {
            name: sensor.name,
            value: sensor.value + " " + sensor.unit,
            threshold: sensor.threshold + " " + sensor.unit,
            status: "CRITICAL"
        };

    });


    // reduce() counts total critical alerts
    const totalAlerts = alerts.reduce(function(total) {

        return total + 1;

    }, 0);


    // Create HTML table
    let html = `
        <h3>Total Critical Alerts: ${totalAlerts}</h3>

        <table>

            <tr>
                <th>Sensor</th>
                <th>Current Value</th>
                <th>Threshold</th>
                <th>Status</th>
            </tr>
    `;


    alerts.forEach(function(alert) {

        html += `
            <tr class="alert">
                <td>${alert.name}</td>
                <td>${alert.value}</td>
                <td>${alert.threshold}</td>
                <td>${alert.status}</td>
            </tr>
        `;

    });


    html += "</table>";


    // Display table inside DOM
    document.getElementById("sensorResult").innerHTML = html;

});
