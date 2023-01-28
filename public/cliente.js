const socket = io({
    autoConnect: false
})

const btnservices = document.getElementById('btnservices')
const chatBox = document.getElementById('chatBox')
const formulario = document.getElementById('formulario')


let user;


Swal.fire({
    icon: 'success',
    title: 'identificate primero',
    input: 'text',
    inputValidator: (value) => {
        return !value && 'necesitas colocar un usuario valido para seguir'
    },
    allowOutsideClick: false,
    allowEscapeClick: false,


}).then(result => {
    user = result.value
    socket.connect()
    console.log(`bienvenido: ${user}`)
})


chatBox.addEventListener('keyup', evnt => {
    if (evnt.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            // socket.emit('menssage', { user, message: chatBox.value.trim() })
            socket.emit('message', { user, menssage: chatBox.value.trim() })
            // console.log(chatBox.value)
        }
    }
})





formulario.addEventListener('submit', e => {
    e.preventDefault()
    const nombreProduct = document.getElementById('nombreProduct').value
    const imagProduct = document.getElementById('imagProduct').value
    const precio = document.getElementById('precio').value
    // document.getElementById('producto').innerHTML+=`${nombreProduct} ${imagProduct} </br>`;
    socket.emit('datosProductos', { nombreProduct: nombreProduct, precio: precio, imagProduct: imagProduct })

})


socket.on('prodPantalla', data => {
    console.log(data)
    const tbody = document.getElementById('tbody')
    return (tbody.innerHTML = data.map((x) => {
        return `  
        
        <tbody >
          <tr>
            <td>${x.nombreProduct}</td>
            <td class="fs-4">${x.precio}</td>
            <td class="fs-4"> <img src="${x.imagProduct}"style="width: 50px;"></td>
          </tr>
        </tbody>
    `}))
})



const formMensaaje = document.getElementById('formMensaaje');
formMensaaje.addEventListener('submit', e => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const texto = document.getElementById('texto').value
    // console.log(`${email} ${contText}`)
    socket.emit('datosMensaje', { email: email, texto: texto })


})

socket.on('mensajePantalla', data => {
    // console.log(data)
    const contText = document.getElementById('contText')
    let contTextMessage = ""
    data.forEach(element => {
        contTextMessage += `<div class="d-flex text-center">  <p style="color: blue;" >${element.email}</p> <p class="ms-2 " style="color: green;">  dice  ${element.texto}</p>  </div>`
    })
    contText.innerHTML = contTextMessage;
})





socket.on('logs', data => {
    const logsPanel = document.getElementById('logsPanel');
    let message = "";
    console.log(data)
    data.forEach(msg => {
        message += `${msg.user}  dice: ${msg.menssage} <br/>`
    });
    logsPanel.innerHTML = message;
})

