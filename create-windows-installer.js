const electronInstaller = require('electron-winstaller');
const path = require("path");

const buildWindowsInstaller = async () => {
	try {
		await electronInstaller.createWindowsInstaller({
			appDirectory: path.join(__dirname, 'Mememory-win32-x64'),
			outputDirectory: path.join(__dirname, 'windows-installer'),
			authors: 'Gatobolo',
			exe: 'mememory.exe'
		});
		console.log(`Successfully build windows installer in ${path.join(__dirname, 'windows-installer')}`);
	} catch (e) {
		console.log(`Error when building windows installer: ${e.message}`);
	}
}

buildWindowsInstaller();