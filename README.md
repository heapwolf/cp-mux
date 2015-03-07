# SYOPSIS
copy files over a multiplexed stream

# TESTING
First create the fixtures and then run the test
```bash
./make-fixtures.sh
npm test
```

# EXAMPLE
An example using the `net` module.

```js
var net = require('net')
var fs = require('fs')
var copy = require('./index')

function onDone() {
  process.exit(0)
}

function onReady() {
  var client = net.connect(3000)
  client.pipe(copy.createClient('./output', onDone))
}

net
  .createServer(copy.createServer('./fixtures'))
  .listen(3000, onReady)
```

