var http = require('http');
new http.Server(80, http.fileHandler('./')).run();
