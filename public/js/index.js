const socket = io();

let userName;

Swal.fire({
    title: "Ingrese su nombre",
    input: "text",
    inputValidator: (value) => {
        if(!value){
            return "Tienes que ingresar tu nombre";
        }
    },
    allowOutsideClick: false,
}).then( data => {
    userName = data.value;
    socket.emit('newUser', userName)
})

const inputData = document.querySelector("#inputData")
const outputData = document.querySelector("#outputData")

inputData.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        if(inputData.value.trim()){
            socket.emit('message', {user: userName, data: inputData.value})
            inputData.value = ""
        }
    }
})

socket.on('messageLogs', data => {
    let messages = ''
    data.forEach(message => {
        messages+=`${message.user} dice: ${message.data} <br />`
    })
    outputData.innerHTML = messages
})

socket.on('chatLogs', data => {
    let messages = ''
    data.forEach(message => {
        messages+=`${message.user} dice: ${message.data} <br />`
    })
    outputData.innerHTML = messages
})

socket.on('notification', data => {
    Swal.fire({
        text: data,
        toast: true,
        position: 'top-right'
    })
})