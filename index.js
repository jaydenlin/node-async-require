var fs = require('fs');
var requestSync = require('sync-request');
var __ = require("lodash");
var _eval = require("eval");


var installed = false;

function install(options) {
  if (installed) {
    return;
  }

  if (typeof options === "undefined") {
    options = {};
  }

  require.extensions['.ajs'] = function(module, filename) {

    ///////////////////////
    ///Set up .ajs content
    ///////////////////////
    var content = fs.readFileSync(filename, {
      encoding: 'utf8'
    });

    try {
      content = _eval(content);
    } catch (e) {
      throw new Error('The .ajs file is not a valid js. ' + e.toString());
    }

    if (Object.prototype.toString.call(content) !== '[object Object]') {
      throw new Error('The .ajs file does not return a valid json');
    } else if (typeof content.remoteUrl === "undefined") {
      throw new Error('The .ajs file must return a remoteUrl');
    }


    ///////////////////////
    ///Set up the preParser
    ///////////////////////
    var preParser = options.preParser || "";

    //if the preParser is not a function, the use the buildt-in preParsers
    if (Object.prototype.toString.call(preParser) !== '[object Function]') {
      switch (preParser) {
        case "rt":
          preParser = require("./preParser/reactTemplate.js");
          break;
        case "mutipleRts":
          preParser = require("./preParser/mutipleReactTemplates.js");
          break;
        default:
          preParser = function(rawContent) {
            return rawContent;
          };
      }

    }



    //////////////////////////
    ///Set up the async value
    //////////////////////////
    var async = options.async === false ? false : true;
    if (async === false) {
      if (typeof content.localPath === "undefined") {
        throw new Error('The .ajs file must return a localPath, when you set async=false');
      }
    }



    //////////////////////////
    ///Set up the queryString
    //////////////////////////
    var queryString = options.queryString || "";


    ////////////////////////////////////////////
    ///Fetch the remote contents or local file
    ///////////////////////////////////////////
    if (async === true) {
      //Fetch the remote contents
      var nodeMoudleUrl = content.remoteUrl + queryString;

      var res = requestSync('GET', nodeMoudleUrl);
      var rawContent = res.getBody('utf8');
      //use preParser 
      var source = preParser(rawContent);

      module._compile(source, filename);
    } else {
      //Fetch loacl file
      var rawContent = fs.readFileSync(content.localPath, {
        encoding: 'utf8'
      });
      //use preParser 
      var source = preParser(rawContent);
      module._compile(source, filename);

    }



  };

  installed = true;
}

function uninstall() {
  installed = false;
  require.extensions['.ajs'] = null;
}

module.exports = {
  install: install,
  uninstall: uninstall
};