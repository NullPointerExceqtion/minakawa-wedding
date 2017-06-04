const project = require('../config/project.config')
const server = require('../server/main')
const debug = require('debug')('app:bin:dev-server')
const debugSocket = require('debug')('app:socket')

const http = require('http').Server(server)
const io = require('socket.io')(http)

// socket.ioを使用するためlistenするのはhttp側に変更
// server.listen(project.server_port)
http.listen(project.server_port)
debug(`Server is now running at http://localhost:${project.server_port}.`)

io.on('connection', function(socket) {
  debugSocket('connection')

  socket.on('quizListGiven', function(fn) {
    debugSocket('quizListGiven')

    fn([
      {
        title: 'クイズタイトル1'
      },
      {
        title: 'クイズタイトル2'
      }
    ])
  })
})
