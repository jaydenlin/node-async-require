var reactTemplates = require("react-templates/src/reactTemplates");

module.exports = function(rawContent) {

	var domId;

	if(rawContent.match("data-dom-id")){
		var reg = /<span data-dom-id=[\"'](.*)[\"'].*>/ig;
		var regReslut = reg.exec(rawContent);
		if(regReslut){
			domId = regReslut[1];
		}
	}
	try {
		source = reactTemplates.convertTemplateToReact(rawContent, {
			modules: 'commonjs',
			name: 'template'
		});
		if(domId){
			source = source.replace("module.exports = ", "module.exports['" + domId + "'] = ");
		}
	} catch (e) {
		throw new Error('Error transforming to JS: ' + e.toString());
	}

	return source;

};