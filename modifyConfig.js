try {
	const fs = require("fs");
	const args = require('args-parser')(process.argv);
	var NeuConfig = require('./neutralino.config.json');
	var PackageJson = require('./package.json');

	var disableInspector = false;
	var version = "dev";

	if (args.versionFromPkgJson == true) version = PackageJson.version;
	if (args.disableInspector == true) disableInspector = true;

	console.log("Inspector:", !disableInspector);
	console.log("Version:", version);

	NeuConfig.modes.window.enableInspector = !disableInspector;
	NeuConfig.version = version;

	fs.writeFileSync("neutralino.config.json", JSON.stringify(NeuConfig, null, "\t"));
} catch(err) {
	console.log(err);
}