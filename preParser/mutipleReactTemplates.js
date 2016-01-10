var reactTemplates = require("react-templates/src/reactTemplates");

module.exports = function(rawContents) {
	var source = "";

	try {
		var rawContents = JSON.parse(rawContents);

	} catch (e) {
		throw new Error("Error mutiple reactTemplates's contents need to be a JSON format: " + e.toString());
	}

	rawContents.map(function(rawContent) {
		if (typeof rawContent.content === "undefined") {
			throw new Error("mutiple reactTemplates's each content format need 'content' property");
		}
		if (typeof rawContent.name === "undefined") {
			throw new Error("mutiple reactTemplates's each  content format need 'name' property");
		}

		try {
			source = source + reactTemplates.convertTemplateToReact(rawContent.content, {
				modules: 'commonjs',
				name: 'template'
			}).replace("module.exports = ", "module.exports['" + rawContent.name + "'] = ");

		} catch (e) {
			throw new Error('Error mutiple reactTemplates preParser fail to JS: ' + e.toString());
		}

	});

	return source;

};