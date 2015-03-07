var net = require('net')
var fs = require('fs')
var path = require('path')
var copy = require('./index')
var bufferEqual = require('buffer-equal')
var assert = require('assert')

var start_t
var diff_t

function onDone() {
  var diff_t = process.hrtime(start_t)
  console.log('Time to copy [%ss]', diff_t[0])

  // compares the .gitignore files, oh well
  fs.readdirSync('./fixtures').map(function(file) {
    var apath = path.join('./fixtures', file)
    var bpath = path.join('./output', file)
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
  client.pipe(copy.createClient('./output', onDone))
}

net
  .createServer(copy.createServer('./fixtures'))
  .listen(3000, onReady)

