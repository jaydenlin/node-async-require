# node-async-require

[![Build Status](https://travis-ci.org/jaydenlin/node-async-require.svg?branch=master)](https://travis-ci.org/jaydenlin/node-async-require)

> Transparently `require()` remote contents (node moudles) in server-side Node.js !
 
```
npm install --save node-async-require-loader
```

### Concept
Fetch the remote contnets (node module) by http GET and require codes in Node.js.   
I made up the file with `.ajs` extention.
* Only for the `require.extention` to recognize the file.
* The file contents is only a remote url.
* Node.js will fetch the contents by the remote url and require codes into local.

### Highlight
* Provid the `PreParser` config for parsing remote contents before Node.js requires it.
* Privde the `queryString` config for fetching diffrent remote contents.
* Provide the `PreParser` for [react-templates](http://wix.github.io/react-templates)!
* How about isomorphic `require()` on client-side ? We got [node-async-require-loader](https://github.com/jaydenlin/node-async-require-loader) with webpack for it ! 

### Basic Usage

Fetch the remote contnets (node module) by http GET and require codes in Node.js.  
`.ajs` extention is only for `require.extention` to recognize the file.  

```
npm install --save node-async-require-loader
```

* Use directly in the js file. 
```
require("node-async-require").install();

```

### Example of Basic Usage

Require the files in this way.

```js
require("node-async-require").install();
require("./remote-contents.ajs");

```

The file contents of the `remote-contents.ajs` is just a single line of url.   

   
`remote-contents.ajs`
```
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/
```
   
Then Node.js will fetch the remote contents by the url `.ajs` provides.

```
module.export=function(){ console.log("Hello World From Web"); }
```
The contents is a node module. It will be required to Node.js.


## Test

You can use the following command to run mocha tests.

```
npm run test
```

