const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value) {
        socket.emit('chat msg', input.value);
        input.value = '';
    }
});

socket.on('chat msg', (msg) => {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
});