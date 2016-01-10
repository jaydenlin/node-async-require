var assert = require('assert');
var React = require('react/addons');
var nodeAsycRequire = require('../index');

describe('Test Remote Contents in Node.js', function() {
	it('should return correct function with the required .ajs file', function() {
		nodeAsycRequire.install();
		var nodeModule = require("../example/example-01--basic-usage/hello.js");
		nodeAsycRequire.uninstall();
		assert.equal(Object.prototype.toString.call(nodeModule), '[object Function]');
		assert.equal(nodeModule.toString(), 'function (){ console.log("Hello World From Web"); }');
	});

	it.only('should return correct function with the required .ajs file and queryString=en', function() {
		nodeAsycRequire.install({
			queryString: "en"
		});
		var nodeModule = require("../example/example-02--usage-with-queryString/hello.js");
		nodeAsycRequire.uninstall();
		assert.equal(Object.prototype.toString.call(nodeModule), '[object Function]');
		assert.equal(nodeModule.toString(), 'function (){ console.log("Hello USA From Web"); }');
	});

	it('should return correct function with the required .ajs file and custom preParser', function() {
		nodeAsycRequire.install({
			preParser: function(remoteRawContent) {
				remoteRawContent = "module.exports=function(){ console.log('Replaceed by custom preParser!');}";
				return remoteRawContent;
			}
		});
		var nodeModule = require("../example/example-03--usage-with-preParser/hello.js");
		nodeAsycRequire.uninstall();
		assert.equal(Object.prototype.toString.call(nodeModule), '[object Function]');
		assert.equal(nodeModule.toString(), "function (){ console.log('Replaceed by custom preParser!');}");
	});

	it('should return correct function with the required .ajs file and custom preParser=rt', function() {
		nodeAsycRequire.install({
			preParser: "rt"
		});
		var nodeModule = require("../example/example-04--usage-with-prePatser-rt/hello.js");
		nodeAsycRequire.uninstall();
		//console.log(nodeModule.toString().replace(/\r|\n/ig, ""));
		assert.equal(Object.prototype.toString.call(nodeModule), '[object Function]');
		assert.equal(nodeModule.toString().replace(/\r|\n/ig, ""), "function () {    return React.createElement('div', {}, React.createElement('h3', {}, 'Hello World Form Web'));}");

	});

	it.only('should return correct function with the required .ajs file and custom preParser=mutipleRts', function() {
		nodeAsycRequire.install({
			preParser: "mutipleRts"
		});
		var nodeModule = require("../example/example-05--usage-with-prePatser-mutiple-rt/hello.js");
		nodeAsycRequire.uninstall();
		//console.log(nodeModule.toString().replace(/\r|\n/ig, ""));
		assert.equal(Object.prototype.toString.call(nodeModule['A']), '[object Function]');
		assert.equal(nodeModule['A'].toString().replace(/\r|\n/ig, ""), "function () {    return React.createElement('h3', {}, ' Hello World Form Web A ');}");

	});
});

describe('Test Server-side Rendering with Remote Contents in Node.js', function() {
	it('should return correct html with the required .ajs file', function() {

		require('node-jsx').install();
		require('../index').install({
			preParser: "rt"
		});
		var component = require("../example/hello.jsx");
		var contents = React.renderToStaticMarkup(React.createElement(component));
		nodeAsycRequire.uninstall();
		assert.equal(contents, "<div><h3>Hello World Form Web</h3></div>");
		//assert.equal(-1, [1,2,3].indexOf(0));
	});
});

// describe('Array', function() {
//   it('should return -1 when the value is not present', function () {
//       assert.equal(-1, [1,2,3].indexOf(5));
//       assert.equal(-1, [1,2,3].indexOf(0));
//   });
// });