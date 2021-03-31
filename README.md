# node-async-require

[![Build Status](https://travis-ci.org/jaydenlin/node-async-require.svg?branch=master)](https://travis-ci.org/jaydenlin/node-async-require)

> Transparently `require()` remote contents (node modules) in server-side Node.js !
 
```
npm install --save node-async-require
```

### Concept
Fetch the remote contents (node module) by http GET and require codes in Node.js.   
I made up the file with `.ajs` extension.
* Only for the `require.extension` to recognize the file.
* The file contents is a node module that provides a remote url.
```js
module.exports = {
   remoteUrl : "http://xxx.xxx.xxx/api/"
}
```
* Node.js will fetch the contents by the remote url and require codes into local.

### Highlight
* Provide the `PreParser` config for parsing remote contents before Node.js requires it.
* Provide the `queryString` config for fetching different remote contents.
* Provide the `PreParser` for [react-templates](http://wix.github.io/react-templates)!
* How about isomorphic `require()` on client-side ? We got [node-async-require-loader](https://github.com/jaydenlin/node-async-require-loader) with webpack for it ! 

### Basic Usage

Fetch the remote contents (node module) by http GET and require codes in Node.js.  
`.ajs` extension is only for `require.extension` to recognize the file.  

* Install this module
```
npm install --save node-async-require
```

* Use directly in the js file. 
```js
require("node-async-require").install();
require("./remote-contents.ajs"); //You can require any filename you want with .ajs extension
```

> You may wondering what '.ajs' file is. The file contents of the `.ajs` file is a node module providing a remote url. The remote url that provides contents(node module). The `.ajs` extension is only for the loader to recognize the file.
   
### Example of Basic Usage

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node module providing a remote url.      
The following is the example of it.   
   
`remote-contents.ajs`
```js
module.exports = {
   remoteUrl : "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
```

######  Step 2. Require the file like this

Require the files in this way.

```js
require("node-async-require").install();
require("./remote-contents.ajs");
```
   
Then Node.js will fetch the remote contents by the url that `.ajs` file provides.
The remote contents is as following.

```js
module.exports=function(){ console.log("Hello World From Web"); }
```
The contents is a node module. It will be required to Node.js.


### Usage with queryString

In some cases, the fixed remote url is not good. You may need to add queryString to fetch different remote contents (node module).  

### Example with queryString

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node module providing a remote url.      
The following is the example of it.   
   
`remote-contents.ajs`
```js
module.exports = {
   remoteUrl : "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
```

######  Step 2. Require the file like this

Require the files in this way. Pass a parameter `queryString` to it.

```js
require("node-async-require").install({
	queryString:"en" //pass a parameter to it.
});
require("./remote-contents.ajs");
```

The url you are going to request will append the `queryString` value.

So the actual url will be :
```
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/en
```
   
Then Node.js will fetch the remote contents by the new url.
The remote contents is as following.

```js
module.export=function(){ console.log("Hello USA From Web"); }
```
The contents is a node module. It will be required to Node.js.


### Usage with preParser

In some cases, the remote contents you fetch may `not be a pure node module`. You need a parser to do some stuffs before Node.js requires it. So you can set up a preParser for the remote contents.

### Example with preParser

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node module providing a remote url.      
The following is the example of it.   
   
`remote-contents.ajs`
```
```js
module.exports = {
   remoteUrl : "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
```

######  Step 2. Require the file like this

Require the files in this way. Pass a parameter `preParser` to it.

```js
require("node-async-require").install({
	preParser:function(remoteRawContent){
		remoteRawContent = "module.exports=function(){ console.log('Replaced by custom preParser!');}";
            return remoteRawContent;
	} //pass a parameter to it.
});
require("./remote-contents.ajs");
```

The original contents will be replaced by preParser.
So the actual contents will be :
```js
module.exports=function(){ console.log('Replaced by custom preParser!');}
```
The contents is a node module. It will be required to Node.js.


### Usage with preParser (React Templates)

We provide a pre-parser for parsing react-templates contents.   
You can use it by setting the `preParser:"rt"`  

```js
require("node-async-require").install({
	preParser:"rt" //pass a parameter to it.
});
require("./remote-contents-using-react-template.ajs");
```


### Example with preParser (React Templates)

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node module providing a remote url.      
The following is the example of it.   
   
`remote-contents-using-react-template.ajs`

```js
module.exports = {
   remoteUrl : "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/react-template/"
}
```

######  Step 2. Require the file like this

Require the files in this way. Pass a parameter `preParser` to it.
And set the value to `rt`.

```js
require("node-async-require").install({
	preParser:"rt" //pass a parameter to it.
});
require("./remote-contents-using-react-template.ajs");
```

The remote contents of the url is the react-template as following.  
```html
<div>
  <h3>Hello World Form Web</h3>
</div>
```

The react-template contents will be parsed to the pure node module.
And, it will be required to Node.js.


## Test

You can use the following command to run mocha tests.

```
npm run test
```

