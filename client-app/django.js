const chatSocket = new WebSocket("ws://127.0.0.1:8000/ws");

chatSocket.onopen = function(e) {
    console.log('opened connection');
    let pingInterval = setInterval(() => sendMessage("ping from client"), 100);
    setTimeout(() => clearInterval(pingInterval), 2000)
};

chatSocket.onmessage = function(e) {
    const message = e.data;
    console.log(message)
    // Handle incoming message
};


chatSocket.onerror = function(e) {
    console.error('Error appeared', e);
};
chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly', e);
};

function sendMessage(message) {
    // chatSocket.send(JSON.stringify({
    //     'message': message
    // }));
    chatSocket.send(message);
}