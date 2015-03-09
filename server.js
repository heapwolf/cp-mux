var path = require('path')
var multiplex = require('multiplex')
var fs = require('fs')
var async = require('async')

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
      async.eachLimit(files, 10, function(file, cb) {
        fs.createReadStream(file).on('end', cb).pipe(mux.createStream(file))
      })
    }

    headers.write(data, afterHeaders)
  }
}

