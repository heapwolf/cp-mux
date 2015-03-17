# SYOPSIS
a proof of concept to copy files over a multiplexed stream. not feature complete.

# EXAMPLE
An example using the `net` module.

```js
var net = require('net')
var cp = require('cp-mux')

function onServerReady() {

  var socket = net.connect(3000)
  var client = cp.createClient('./test/sink')

  socket.pipe(client)

  client.on('end', function() {
    process.exit(0)
  })
}

net
  .createServer(cp.createServer('./test/source'))
  .listen(3000, onServerReady)
```

# OPTIONS

### concurrency

Determines how many files that should be transferred concurrently. Default is `10`.

### force
Specifies removal of the target file if it cannot be opened for write operations. The removal precedes any copying performed by the cp command.

### dereference
Makes the cp command follow symbolic links (symlinks) so that the destination has the target file rather than a symlink to the target.

### interactive
A callback that provides the name of a file to be overwritten as the first parameter. This occurs if the `TargetDirectory` or `TargetFile` parameter contains a file with the same name as a file specified in the `SourceFile` or `SourceDirectory` parameter. If you call back with `true`, `false` prevents overwriting the file.

### preserve
The perserve flag preserves the following characteristics of each source path in the corresponding target: The time of the last data modification and the time of the last access, the ownership (only if it has permissions to do this), and the file permission bits.

### recursive
Copy directories recursively.

