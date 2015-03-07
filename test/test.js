var net = require('net')
var fs = require('fs')
var path = require('path')
var copy = require('../index')
var bufferEqual = require('buffer-equal')
var assert = require('assert')

var start_t
var diff_t

function onEnd() {
  var diff_t = process.hrtime(start_t)
  console.log('Time to copy [%ss]', diff_t[0])

  // compares the .gitignore files, oh well
  fs.readdirSync(__dirname + '/read').map(function(file) {
    var apath = path.join(__dirname + '/read', file)
    var bpath = path.join(__dirname + '/write', file)
    var a = fs.readFileSync(apath)
    var b = fs.readFileSync(bpath)
    console.log('Comparing [%s, %s]', apath, bpath)
    assert(bufferEqual(a, b), true)
  })

  process.exit(0)
}

function onReady() {
  start_t = process.hrtime()
  var client = net.connect(3000)
  var cmux = copy.createClient(__dirname + '/write')
  client.pipe(cmux)
  cmux.on('end', onEnd)
}

net
  .createServer(copy.createServer(__dirname + '/read'))
  .listen(3000, onReady)

