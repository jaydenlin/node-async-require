var reactTemplates = require("react-templates/src/reactTemplates");

module.exports = function(rawContent) {
	try {
		source = reactTemplates.convertTemplateToReact(rawContent, {
			modules: 'commonjs',
			name: 'template'
		});

	} catch (e) {
		throw new Error('Error transforming to JS: ' + e.toString());
	}

	return source;

};