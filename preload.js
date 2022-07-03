const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld('ipc', {
	on: (channel, args) => {
		const validChannels = [
			'updateBoard'
		];
		if (validChannels.includes(channel)) {
			return ipcRenderer.on(channel, args)
		}
	},
	invoke: async (channel, args) => {
		const validChannels = [
			"layoutCards",
			"cardClick"
		];
		if (validChannels.includes(channel)) {
			return await ipcRenderer.invoke(channel, args);
		}
	}
})