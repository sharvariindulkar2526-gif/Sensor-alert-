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
/* =====================================================
   QUESTION 2
   NodeIterator and TreeWalker
   ===================================================== */

document.getElementById("scanNodes")
.addEventListener("click", function() {

    const dashboard =
        document.getElementById("dashboard");

    let offlineCount = 0;


    // Create NodeIterator
    const iterator = document.createNodeIterator(
        dashboard,
        NodeFilter.SHOW_ELEMENT
    );


    let currentNode;


    // Scan elements using NodeIterator
    while (currentNode = iterator.nextNode()) {

        if (
            currentNode.dataset &&
            currentNode.dataset.status === "offline"
        ) {

            // Modify inline CSS
            currentNode.style.fontWeight = "bold";

            currentNode.style.border =
                "3px solid orange";

            // Add warning class
            currentNode.classList.add("warning");

            offlineCount++;
        }
    }


    // Create TreeWalker
    const walker = document.createTreeWalker(
        dashboard,
        NodeFilter.SHOW_ELEMENT
    );


    let node;


    // Scan elements using TreeWalker
    while (node = walker.nextNode()) {

        if (
            node.dataset &&
            node.dataset.status === "offline"
        ) {

            // Add warning data attribute
            node.setAttribute(
                "data-warning",
                "Offline Intelligent Node"
            );
        }
    }


    // Display result
    document.getElementById("nodeResult").textContent =
        offlineCount +
        " offline intelligent node(s) detected and marked as warning.";

});
/* =====================================================
   QUESTION 3
   Event Flow - Capturing and Bubbling
   ===================================================== */

const chartArea = document.getElementById("chartArea");
const chartBox = document.getElementById("chartBox");
const dataPoint = document.getElementById("dataPoint");
const eventResult = document.getElementById("eventResult");


// Capturing phase
chartArea.addEventListener("click", function(event) {

    console.log("Chart Area - Capturing");

}, true);


// Bubbling phase
chartArea.addEventListener("click", function(event) {

    console.log("Chart Area - Bubbling");

});


// Middle element
chartBox.addEventListener("click", function(event) {

    console.log("Chart Box - Bubbling");

});


// Data point
dataPoint.addEventListener("click", function(event) {

    // Prevent default button behaviour
    event.preventDefault();

    // Stop the event from continuing
    event.stopPropagation();

    // Extract event properties
    const targetElement = event.target.id;
    const eventType = event.type;
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    eventResult.innerHTML = `
        Event Type: ${eventType}<br>
        Target Element: ${targetElement}<br>
        Mouse X Position: ${mouseX}px<br>
        Mouse Y Position: ${mouseY}px<br>
        Event Flow: Capturing → Target → Bubbling
    `;

    console.log("Data Point clicked");
});
/* =====================================================
   QUESTION 4
   Collapsible Section and Dynamic Tooltip
   ===================================================== */

// Get Q4 elements
const toggleSection =
    document.getElementById("toggleSection");

const detailsSection =
    document.getElementById("detailsSection");

const tooltipButton =
    document.getElementById("tooltipButton");

const tooltipInfo =
    document.getElementById("tooltipInfo");


// -----------------------------------------------------
// 1. Collapsible Section
// -----------------------------------------------------

toggleSection.addEventListener("click", function() {

    if (detailsSection.style.display === "none") {

        detailsSection.style.display = "block";

        toggleSection.textContent =
            "Hide Details";

    } else {

        detailsSection.style.display = "none";

        toggleSection.textContent =
            "Show Details";
    }

});


// -----------------------------------------------------
// 2. Create Dynamic Tooltip
// -----------------------------------------------------

const dynamicTooltip =
    document.createElement("div");

dynamicTooltip.id = "dynamicTooltip";

dynamicTooltip.textContent =
    "Intelligent sensor information";


// -----------------------------------------------------
// 3. Add Tooltip to DOM using appendChild()
// -----------------------------------------------------

document.body.appendChild(dynamicTooltip);


// -----------------------------------------------------
// 4. Mouse Enter - Show Tooltip
// -----------------------------------------------------

tooltipButton.addEventListener("mouseenter", function(event) {

    dynamicTooltip.style.display = "block";

    dynamicTooltip.textContent =
        "Intelligent Sensor: Monitoring Active";

    tooltipInfo.textContent =
        "Tooltip created dynamically using createElement() and appendChild().";

});


// -----------------------------------------------------
// 5. Mouse Movement - Reposition Tooltip
// -----------------------------------------------------

tooltipButton.addEventListener("mousemove", function(event) {

    const tooltipWidth =
        dynamicTooltip.offsetWidth;

    const tooltipHeight =
        dynamicTooltip.offsetHeight;

    let x = event.clientX + 15;
    let y = event.clientY + 15;


    // Keep tooltip inside the browser viewport

    if (x + tooltipWidth > window.innerWidth) {

        x = event.clientX - tooltipWidth - 15;

    }

    if (y + tooltipHeight > window.innerHeight) {

        y = event.clientY - tooltipHeight - 15;

    }


    dynamicTooltip.style.left = x + "px";
    dynamicTooltip.style.top = y + "px";

});


// -----------------------------------------------------
// 6. Mouse Leave - Hide Tooltip
// -----------------------------------------------------

tooltipButton.addEventListener("mouseleave", function() {

    dynamicTooltip.style.display = "none";

    tooltipInfo.textContent =
        "Move the mouse over the button to display the tooltip.";

});


// -----------------------------------------------------
// 7. Demonstrate insertBefore()
// -----------------------------------------------------

const tooltipMessage =
    document.createElement("small");

tooltipMessage.textContent =
    " Tooltip is dynamically generated.";

tooltipMessage.style.display = "block";
tooltipMessage.style.marginTop = "8px";

detailsSection.insertBefore(
    tooltipMessage,
    tooltipButton
);
/* =====================================================
   QUESTION 5
   Asynchronous JSON Data Update
   ===================================================== */

const loadDataButton = document.getElementById("loadData");
const loadingMessage = document.getElementById("loadingMessage");
const backendResult = document.getElementById("backendResult");
const errorMessage = document.getElementById("errorMessage");


loadDataButton.addEventListener("click", function () {

    // Clear previous messages
    loadingMessage.innerHTML = "";
    backendResult.innerHTML = "";
    errorMessage.innerHTML = "";

    // Show loading message
    loadingMessage.innerHTML =
        "Loading data from intelligent backend...";

    // Disable button while processing
    loadDataButton.disabled = true;


    // Simulate asynchronous HTTP response
    setTimeout(function () {

        try {

            // Simulated JSON response
            const jsonResponse = JSON.stringify({
                status: "success",
                sensor: "Temperature Sensor",
                value: 82,
                unit: "°C",
                threshold: 75,
                message: "Critical temperature detected"
            });


            // Parse JSON
            const data = JSON.parse(jsonResponse);


            // Check backend status
            if (data.status !== "success") {

                throw new Error(
                    "Unable to receive valid backend data."
                );

            }


            // Display JSON data
            backendResult.innerHTML = `
                <h3>Backend Response</h3>

                <p>
                    <strong>Sensor:</strong>
                    ${data.sensor}
                </p>

                <p>
                    <strong>Current Value:</strong>
                    ${data.value} ${data.unit}
                </p>

                <p>
                    <strong>Threshold:</strong>
                    ${data.threshold} ${data.unit}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${data.status}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${data.message}
                </p>
            `;


            // Success message
            loadingMessage.innerHTML =
                "Data received successfully.";


        } catch (error) {

            // Client-side error handling
            errorMessage.innerHTML =
                "Error: " + error.message;

        }


        // Enable button again
        loadDataButton.disabled = false;

    }, 1500);

});
