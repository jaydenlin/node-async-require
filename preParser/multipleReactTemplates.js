var reactTemplates = require("react-templates/src/reactTemplates");

module.exports = function(rawContents, useUnescape) {
	var source = "";

	try {
		var rawContents = JSON.parse(rawContents);

	} catch (e) {
		throw new Error("Error multiple reactTemplates's contents need to be a JSON format: " + e.toString());
	}

	rawContents.map(function(rawContent) {
		if (typeof rawContent.content === "undefined") {
			throw new Error("multiple reactTemplates's each content format need 'content' property");
		}
		if (typeof rawContent.name === "undefined") {
			throw new Error("multiple reactTemplates's each  content format need 'name' property");
		}

		try {
			if(typeof(useUnescape)!=='undefined' && useUnescape){
				rawContent.content = unescape(rawContent.content);
			}
			source = source + reactTemplates.convertTemplateToReact(rawContent.content, {
				modules: 'commonjs',
				name: 'template'
			}).replace("module.exports = ", "module.exports['" + rawContent.name + "'] = ");

		} catch (e) {
			throw new Error('Error multiple reactTemplates preParser fail to JS: ' + e.toString());
		}

	});

	return source;

};