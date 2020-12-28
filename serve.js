const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

/**
 * Response headers for unknown/options request
 *
 * @type {Object}
 */
const UNKNOWN_METHOD_RESPONSE_HEADERS = { Allow: 'GET, HEAD', 'Content-Length': 0 };

/**
 * Perform http response
 *
 * @param {Object} response
 * @param {number} code
 * @param {Object} headers
 * @param {string|Buffer} [data]
 */
const respond = (response, code, headers, data) => {
  response.writeHead(code, headers, http.STATUS_CODES[code]);

  if (typeof data !== 'undefined') {
    response.write(data);
  }

  response.end();
};

/**
 * Get if file is directory
 *
 * @param {string} url
 * @returns {boolean}
 */
const getIsDirectory = (url) => fs.statSync(url).isDirectory();

/**
 * Create server
 *
 * @param {Object} [customOptions] Options
 * @param {string} [customOptions.defaultFile] Path to default file (e.g. index.html) 
 * @param {string} [customOptions.staticPath] Path to the folder from where all files would be served
 * @param {number} [customOptions.port] HTTP port
 * @returns {http.Server|https.Server}
 */
const createServer = (customOptions = {}) => {
  const options = { ...customOptions };

  const responseHandler = (request, response) => {
    if (request.method === 'OPTIONS') {
      respond(response, 200, UNKNOWN_METHOD_RESPONSE_HEADERS);
      return;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      respond(response, 405, UNKNOWN_METHOD_RESPONSE_HEADERS);
      return;
    }

    let requestPath = path.join(options.staticPath, path.normalize(url.parse(request.url).pathname));

    if (fs.existsSync(requestPath)) {
      if (getIsDirectory(requestPath)) {
        requestPath = path.join(requestPath, options.defaultFile);
      }

      const data = fs.readFileSync(requestPath);

      if (data instanceof Error) {
        respond(response, 500, { 'Content-Length': 0 });
      } else {
        respond(response, 200, { 'Content-encoding': 'gzip', 'Content-type': 'text/html', 'Content-length': data.length }, data);
      }
    } else {
      respond(response, 404, { 'Content-Length': 0 });
    }
  }

  const listenCallback = () => console.log(`Static server is listening ${options.protocol} requests on http://localhost:${options.port}/`);
  return http.createServer(responseHandler).listen(options.port, listenCallback)
};

const staticServer = createServer({
  defaultFile: 'index.html.gz',   // defaults to 'index.html'
  staticPath: __dirname + '/public/build', // defaults to './'
  port: 8234,                        // defaults to 8080
});