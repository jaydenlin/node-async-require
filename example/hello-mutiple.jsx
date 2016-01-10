var React = require('react/addons');
 
var helloTemplate = require("./hello-mutiple.ajs")['A'];
 
var Hello = React.createClass({
  
  render: function() {
    
    return helloTemplate.apply(this);
    
  }
 
});
 
module.exports = Hello;