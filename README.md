# browsermon

Automatically reloads the browser whenever server restarts.
No need to manually refresh the page when the server restarts.

Useful while working with nodemon or similar packages during development.

## Installation

```bash
# yarn
yarn add browsermon

# npm
npm install browsermon
```

## Usage

### Server

http server example:

```node
const http = require("http");
const browsermon = require("browsermon");

const server = http.createServer((req, res) => {
  // handle requests
});

// pass in server
browsermon({ server });
```

express example:

```node
const express = require("express");
const browsermon = require("browsermon");

const app = express();
// express handlers

const server = app.listen(PORT);

// pass in the server
browsermon({ server });
```

### Client

```html
<html>
  <head>
    <!-- Add script to html pages to reload when server restarts -->
    <script src="/browsermon/browser.js"></script>
  </head>
</html>
```
