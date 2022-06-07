const socket = io();

let title = document.getElementById("title")
let price = document.getElementById("price")
let thumbnail = document.getElementById("thumbnail")
let button = document.getElementById("enviar")
let productoResultado = document.getElementById("productoResultado")

let message = document.getElementById("message")
let username = document.getElementById("username")
let btn = document.getElementById("send")
let output = document.getElementById("output")
let actions = document.getElementById("actions")

button.addEventListener("click", function(e){
    e.preventDefault();
    socket.emit("producto", {
        title: title.value,
        price: price.value,
        thumbnail: thumbnail.value
    });
});

socket.on("producto", function (data) {
    productoResultado.innerHTML += `
        <tr>
            <td>
                ${data.title}
            </td>
            <td>
                ${data.price}
            </td>
            <td>
                ${data.thumbnail}
            </td>
        </tr>
    `
})

btn.addEventListener("click", function(){
    socket.emit("chat:message", {
        message: message.value,
        username: username.value
    });
});

message.addEventListener("keypress", function () {
    socket.emit("chat:typing", username.value)
})

socket.on("chat:message", function (data) {
    actions.innerHTML = "";
    output.innerHTML += `
    <p>
    <strong>${data.username}</strong>: ${data.message}
    </p>
    `
})

socket.on("chat:typing", function (data) {
    actions.innerHTML = `<p><em>${data} is typing a message...</em></p>`
})