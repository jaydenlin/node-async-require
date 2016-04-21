var React = require('react/addons');

 
var Hello = React.createClass({
  
  render: function() {
     
    var helloTemplate = require("./hello-multiple.ajs")[this.props.id];
    return helloTemplate.apply(this);
    
  }
 
});
 
module.exports = Hello;