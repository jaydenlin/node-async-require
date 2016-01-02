# node-async-require

[![Build Status](https://travis-ci.org/jaydenlin/node-async-require.svg?branch=master)](https://travis-ci.org/jaydenlin/node-async-require)

> Transparently `require()` remote contents (node moudles) in server-side Node.js !
 
```
npm install --save node-async-require
```

### Concept
Fetch the remote contnets (node module) by http GET and require codes in Node.js.   
I made up the file with `.ajs` extention.
* Only for the `require.extention` to recognize the file.
* The file contents is a node moudle that provides a remote url.
```js
module.exports = {
   remoteUrl : "http://xxx.xxx.xxx/api/"
}
```
* Node.js will fetch the contents by the remote url and require codes into local.

### Highlight
* Provid the `PreParser` config for parsing remote contents before Node.js requires it.
* Privde the `queryString` config for fetching diffrent remote contents.
* Provide the `PreParser` for [react-templates](http://wix.github.io/react-templates)!
* How about isomorphic `require()` on client-side ? We got [node-async-require-loader](https://github.com/jaydenlin/node-async-require-loader) with webpack for it ! 

### Basic Usage

Fetch the remote contnets (node module) by http GET and require codes in Node.js.  
`.ajs` extention is only for `require.extention` to recognize the file.  

* Install this moudle
```
npm install --save node-async-require
```

* Use directly in the js file. 
```js
require("node-async-require").install();
require("./remote-contents.ajs");//You can require any filename you want with .ajs extention
```

> You may wondering what '.ajs' file is. The file contents of the `.ajs` file is a node moudle providing a remote url. The remote url that provides contents(node moudle). The `.ajs` extention is only for the loader to recognize the file.
   
### Example of Basic Usage

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
The follwoing is the example of it.   
   
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

In some cases, the fixed remote url is not good. You may need to add queryString to fetch diffrent remote contents (node moudle).  

### Example with queryString

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
The follwoing is the example of it.   
   
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

In some cases, the remote contents you fetch may `not be a pure node moudle`. You need a parser to do some stuffs before Node.js requires it. So you can set up a preParser for the remote contents.

### Example with preParser

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
The follwoing is the example of it.   
   
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
		remoteRawContent = "module.exports=function(){ console.log('Replaceed by custom preParser!');}";
            return remoteRawContent;
	} //pass a parameter to it.
});
require("./remote-contents.ajs");
```

The original contents will be replaced by preParser.
So the actual contents will be :
```js
module.exports=function(){ console.log('Replaceed by custom preParser!');}
```
The contents is a node module. It will be required to Node.js.


### Usage with preParser (React Templates)

We provide a preparser for pasing react-templates contents.   
You can use it by setting the `preParser:"rt"`  

```js
require("node-async-require").install({
	preParser:"rt" //pass a parameter to it.
});
require("./remote-contents-using-react-template.ajs");
```


### Example with preParser (React Templates)

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
The follwoing is the example of it.   
   
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

