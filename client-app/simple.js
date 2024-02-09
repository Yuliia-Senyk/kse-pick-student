const wsUri = "ws://localhost:3001";
const output = document.querySelector("#output");
const websocket = new WebSocket(wsUri);


function writeToScreen(message) {
    output.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
}

function sendMessage(message) {
    writeToScreen(`SENT: ${message}`);
    websocket.send(message);
}

websocket.onopen = (e) => {
    writeToScreen("CONNECTED");
    let pingInterval = setInterval(() => sendMessage("ping"), 100);
    setTimeout(() => clearInterval(pingInterval), 2000)
};

websocket.onclose = (e) => {
    writeToScreen("DISCONNECTED");
};

websocket.onmessage = (e) => {
    if (e.data instanceof Blob) {
        reader = new FileReader();
        reader.onload = () => {
            writeToScreen(`RECEIVED: ${reader.result}`);
        };
        reader.readAsText(e.data);
    } else {
        writeToScreen(`RECEIVED: ${e.data}`);
    }
};

websocket.onerror = (e) => {
    writeToScreen(`ERROR: ${e.data}`);
};