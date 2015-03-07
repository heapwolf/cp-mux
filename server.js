var path = require('path')
var multiplex = require('multiplex')
var fs = require('fs')

var mux = multiplex()

module.exports = function(dir) {

  dir = path.resolve(dir)

  var files = fs.readdirSync(dir).map(function(file) {
    return path.join(dir, file)
  })

  return function(socket) {
    socket.on('error', function() {})
    mux.pipe(socket)

    var headers = mux.createStream()
    var data = JSON.stringify(files) + '\n'

    function afterHeaders() {
      files.forEach(function(file) {
        fs.createReadStream(file)
          .pipe(mux.createStream())
      })
    } 

    headers.write(data, afterHeaders)
  }
}

