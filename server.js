const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  response.writeHead(200, {"Content-Type": "text/plain"})
  response.write("Hello world")
  response.end()
}).listen(8888)
