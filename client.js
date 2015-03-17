var fs = require('fs')
var path = require('path')
var through = require('through2')
var split = require('split2')
var multiplex = require('multiplex')

module.exports = function(dir, cb) {

  dir = path.resolve(dir)

  var headers = []
  var streams = {}
  var count = 0

  function onStream(stream, id) {
    stream.on('error', function() {})

    if (!id) {
      return stream
        .pipe(split(JSON.parse))
        .pipe(through.obj(function(chunk) {
          headers = chunk
          count = headers.length
          headers.unshift(null)
        }))
    }

    var s = streams[id]

    if (!s) {
      var f = path.join(dir, path.basename(id))
      s = streams[id] = fs.createWriteStream(f)
    }

    stream.pipe(s)
    stream.on('end', function() {
      if (!--count) mux.emit('end')
    })
  }

  var mux = multiplex(onStream)
  mux.on('error', function() {})
  return mux
}

