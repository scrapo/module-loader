const fs = require('fs');
const path = require('path');

function ModuleLoader(directory) {
	directory = path.resolve(directory);
	this.get = function (name) {
		return require(path.join(directory, name));
	};
	this.all = function (callback) {
		const that = this;
		fs.readdir(directory, function (errors, files) {
			const modules = {};
			files.forEach(function (fileName) {
				if (fileName.substr(-3).toLowerCase() === '.js') {
					const moduleName = fileName.substr(0, fileName.length - 3);
					modules[moduleName] = that.get(moduleName);
				}
			});
			callback(modules);
		});
	};
}

module.exports = ModuleLoader;