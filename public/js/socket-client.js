
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const txtTo = document.querySelector('#txtTo');
const btnEnviar = document.querySelector('#btnEnviar');
const txtSoy = document.querySelector('#txtSoy');
const btnSoy = document.querySelector('#btnSoy');

const socket = io();

socket.on('connect',()=>{
    // console.log('Conectado')
    lblOffline.style.display = "none";
    lblOnline.style.display = "";
})

socket.on('disconnect', ()=>{
    // console.log('Desconectado')    
    lblOnline.style.display = "none";
    lblOffline.style.display = "";
})
socket.on('enviar-mensaje', (payload) => {
    console.log( payload )
})

btnSoy.addEventListener('click',()=>{
    const payload = {
        mensaje : 'Restrandome',
        id : txtSoy.value
    }
    socket.emit('registro', payload, (id)=>{
        console.log('Registrando usuario con id ',id)
    })
})


btnEnviar.addEventListener('click', ()=>{
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id: socket.id,
        to: txtTo.value,
        from: txtSoy.value
    }
    
    socket.emit( 'enviar-mensaje', payload, ( id ) => {
        console.log('Desde el server', id );
    });
})