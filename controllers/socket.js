const socketController = (socket)=>{
  // console.log('cliente conectado');
  // console.log(socket.id)
  // socket.on('disconnect',()=>{
  //     console.log('Cliente desconetado')
  // })

  socket.on('registro',(payload,callback)=>{
    socket.join(payload.id)
    socket.broadcast.emit('registro',payload)
    console.log(socket.rooms)
  })

  socket.on('enviar-mensaje', ( payload, callback ) => {
      callback( socket.id );
      socket.to(payload.to).emit('enviar-mensaje', payload );
      console.log('entro peticion de enviar mensaje',payload,socket.rooms)
  })
}

module.exports = {
  socketController
}