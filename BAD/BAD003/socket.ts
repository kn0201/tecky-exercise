import socketIO from 'socket.io'
import http from 'http'

export let io: socketIO.Server

// use a function to accept the server as argument
// to avoid cyclic dependencies (dead-loop)
export function attachServer(server: http.Server) {
  io = new socketIO.Server(server)

  io.on('connection', socket => {
    console.log('connected from client:', socket.id)
    // socket.on('ball',msg=>{
    //   console.log(msg)
    //   socket.emit('ball','pong')
    // })
  })
}
