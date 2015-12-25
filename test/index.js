var assert = require('assert');
var render = require('./render');
describe('Test Server-side Rendering of hello.jsx', function() {
	it('should return correct html with the required .ajs file', function() {
		var contents = render("../example/hello.jsx");
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