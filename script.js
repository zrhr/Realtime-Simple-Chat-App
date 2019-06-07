const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput =document.getElementById('message-input')

const name=prompt('What is your name?', 'Anon')
while (name === "") {
    // user pressed OK, but the input field was empty
}  if (name) {
    // user typed something and hit OK
} else {
    // user hit cancel
    name=prompt('What is your name?', 'Anon')
}

appendMessage('You joined')
socket.emit('new-user', name)

console.log(name)



// while(name == ''){
//     name=prompt('What is your name?')
//     appendMessage('You joined')
//     socket.emit('new-user', name) 
// }


socket.on('chat-message', data =>{
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name =>{
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name =>{
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message= messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value=''
})

function appendMessage(message){
    const messageElement= document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
} 

$(function() {
    // Initializes and creates emoji set from sprite sheet
    window.emojiPicker = new EmojiPicker({
      emojiable_selector: '[data-emojiable=true]',
      assetsPath: '../lib/img/',
      popupButtonClasses: 'fa fa-smile-o'
    });
    // Finds all elements with `emojiable_selector` and converts them to rich emoji input fields
    // You may want to delay this step if you have dynamically created input fields that appear later in the loading process
    // It can be called as many times as necessary; previously converted input fields will not be converted again
    window.emojiPicker.discover();
  });