var fs = require('fs');
var requestSync = require('sync-request');
var __ = require("lodash");


var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  require.extensions['.ajs'] = function(module, filename) {

    ///////////////////////
    ///Set up the preParser
    ///////////////////////
    var preParser = options.preParser || "";

    //if the preParser is not a function, the use the buildt in preParsers
    if (Object.prototype.toString.call(preParser) !== '[object Function]') {
      switch (preParser) {
        case "rt":
          preParser = require("./preParser/reactTemplate.js");
          break;
        default:
          preParser = function(rawContent) {
            return rawContent;
          };
      }

    }

    //////////////////////////
    ///Set up the queryString
    //////////////////////////
    var queryString = options.queryString || "";


    ////////////////////////////
    ///Fetch the remote contents
    ////////////////////////////
    var nodeMoudleUrl = fs.readFileSync(filename, {
      encoding: 'utf8'
    });
    var res = requestSync('GET', nodeMoudleUrl);
    var rawContent = res.getBody();
    //use preParser 
    var source = preParser(rawContent);

    module._compile(source, filename);
  };

  installed = true;
}

module.exports = {
  install: install
};