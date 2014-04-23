# dogstatsy

  A simple DogStatsD client.

## Installation

```
$ npm install dogstatsy
```

## Example

```js

var Dogstatsyware = require('./dogstatsyware');
var express = require('express');
var app = express();

app.use(Dogstatsyware({
  service: 'myapp'
}));

```