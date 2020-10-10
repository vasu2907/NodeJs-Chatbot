const socket = io('http://localhost:3000')

const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');

const name = prompt('What\'s your name...');
appendMessage('You Joined');

socket.emit('new-user', name);

socket.on('chat-message', data => {
    console.log(data);
    appendMessage(`${data['name']}: ${data['message']}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected!`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    console.log(message);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
    appendMessage('You: '+message);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected.....`);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
};

