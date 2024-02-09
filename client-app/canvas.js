const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const socket = new WebSocket('ws://localhost:3010');

let drawing = false;
let startX, startY;

function drawLine(startX, startY, endX, endY) {
    console.log('drawLine startX', startX)
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.closePath();
}

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const { offsetX, offsetY } = e;
    startX = offsetX;
    startY = offsetY;
    socket.send(JSON.stringify({ type: 'start', x: offsetX, y: offsetY }));
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e;
    drawLine(startX, startY, offsetX, offsetY);
    startX = offsetX;
    startY = offsetY;
    socket.send(JSON.stringify({ type: 'draw', x: offsetX, y: offsetY }));
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    socket.send(JSON.stringify({ type: 'end' }));
});

socket.addEventListener('message', (event) => {
    if (event.data instanceof Blob) {
        reader = new FileReader();
        reader.onload = () => {
            console.log('data received 1', reader.result);
            const data = reader?.result;
            if (data) {
                let dataParsed = JSON.parse(data);

                const type = dataParsed.type;
                const x = dataParsed.x || 0;
                const y = dataParsed.y || 0;
                console.log('type', type)

                switch (type) {
                    case 'start':
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        break;
                    case 'draw':
                        console.log('case draw')
                        drawLine(startX, startY, x, y);
                        startX = x;
                        startY = y;
                        break;
                    case 'end':
                        ctx.closePath();
                        break;
                    default:
                        break;
                }
            }
        };
        reader.readAsText(event?.data);
    }
});
