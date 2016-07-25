const fs = require('fs');
const requestSync = require('sync-request');
const _eval = require('eval');

let installed = false;

function install(options) {
  if (installed) {
    return;
  }

  if (typeof options === 'undefined') {
    options = {}; // eslint-disable-line no-param-reassign
  }

  require.extensions['.ajs'] = function (module, filename) {
    /**
     * Set up .ajs content
     */
    let content = fs.readFileSync(filename, {
      encoding: 'utf8',
    });

    try {
      content = _eval(content);
    } catch (e) {
      throw new Error(`The .ajs file is not a valid js. ${e}`);
    }

    if (Object.prototype.toString.call(content) !== '[object Object]') {
      throw new Error('The .ajs file does not return a valid json');
    } else if (typeof content.remoteUrl === 'undefined') {
      throw new Error('The .ajs file must return a remoteUrl');
    }

    /**
     * Set up the preParser
     */
    let preParser = options.preParser || '';

    // if the preParser is not a function, the use the buildt-in preParsers
    if (Object.prototype.toString.call(preParser) !== '[object Function]') {
      switch (preParser) {
        case 'rt':
          preParser = require('./preParser/reactTemplate.js');
          break;
        case 'multipleRts':
          preParser = require('./preParser/multipleReactTemplates.js');
          break;
        default:
          preParser = function (rawContent) {
            return rawContent;
          };
      }
    }

    /**
     * Set up the async value
     */
    const isAsync = !!options.async || options.async === undefined;
    if (!isAsync) {
      if (typeof content.localPath === 'undefined') {
        throw new Error('The .ajs file must return a localPath, when you set async=false');
      }
    }

    /**
     * Set up the queryString
     */
    const queryString = options.queryString || '';


    /**
     * Fetch the remote contents or local file
     */
    if (isAsync === true) {
      // Fetch the remote contents
      const nodeMoudleUrl = content.remoteUrl + queryString;

      const res = requestSync('GET', nodeMoudleUrl);
      const rawContent = res.getBody('utf8');
      // use preParser
      let source;
      if (typeof options.useUnescape !== 'undefined' && options.useUnescape) {
        source = preParser(rawContent, true);
      } else {
        source = preParser(rawContent);
      }

      module._compile(source, filename);
    } else {
      // Fetch loacl file
      const rawContent = fs.readFileSync(content.localPath, {
        encoding: 'utf8',
      });
      // use preParser
      const source = preParser(rawContent);
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
  install,
  uninstall,
};
