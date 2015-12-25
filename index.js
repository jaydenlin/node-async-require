var fs = require('fs');
var requestSync = require('sync-request');


var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  var preParser = options.preParser || "";
  var queryString = options.queryString || "";

  require.extensions['.ajs'] = function(module, filename) {

    var nodeMoudleUrl = fs.readFileSync(filename, {
      encoding: 'utf8'
    });
    var res = requestSync('GET', nodeMoudleUrl);
    var rawContent = res.getBody();

    switch (preParser) {
      case "rt":
        preParser = require("./preParser/reactTemplate.js");
        break;
      default:
        preParser = function(rawContent) {
          return rawContent;
        };
    }

    var source = preParser(rawContent);

    module._compile(source, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};