const socket = io('http://localhost:3000')

const messageForm = document.getElementById('send-container');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const roomContainer = document.getElementById('room-container');

if(messageForm != null) {
    const name = prompt('What\'s your name...');
    appendMessage('You Joined');
    socket.emit('new-user', roomName, name);

    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value;
        console.log(message);
        socket.emit('send-chat-message',roomName, message);
        messageInput.value = '';
        appendMessage('You: '+message);
    });

}


socket.on('room-created', room => {
    console.log('New room created: '+ room);
    const roomElement = document.createElement('div');
    roomElement.innerText = room;

    const roomLink = document.createElement('a');
    roomLink.href = `/${room}`;
    roomLink.innerText = 'Join';

    roomContainer.append(roomElement);
    roomContainer.append(roomLink);
});

socket.on('chat-message', data => {
    console.log(data);
    appendMessage(`${data['name']}: ${data['message']}`);
});

socket.on('user-connected', name => {
    appendMessage(`${name} connected!`);
});

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected.....`);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = message;
    messageContainer.append(messageElement);
};

