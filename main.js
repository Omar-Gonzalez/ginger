const {app, BrowserWindow, ipcMain} = require("electron");
const {appTitle, cardSet, shuffleArray} = require('./utils');
const path = require("path");


const createWindow = () => {
	const win = new BrowserWindow({
		width: 1024,
		height: 768,
		title: appTitle,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})
	win.loadFile('index.html')
	win.webContents.openDevTools({mode: "detach"})
}

app.whenReady().then(() => {
	createWindow();
});

global.GAME_STATE = {
	board: [],
	flippedCards: [],
	canUpdate: true,
}

const initializeGame = () => {
	GAME_STATE.board = shuffleArray([...cardSet, ...cardSet]).map((c, i) => {
		const card = {...c};
		card['id'] = i;
		return card;
	});
	GAME_STATE.flippedCards = [];
	GAME_STATE.canUpdate = true;
}


ipcMain.handle("layoutCards", async () => {
	await initializeGame();
	return GAME_STATE.board;
})

ipcMain.handle("cardClick", (e, card) => {
	console.log(card);
	//If 2 cards already open or match evaluation timeout don't update
	if (GAME_STATE.flippedCards.length > 1 || GAME_STATE.canUpdate === false) {
		return GAME_STATE.board;
	}

	const updatedBoard = GAME_STATE.board;

	//Flip Cards
	for (const c of updatedBoard) {
		if (c.id === card.id) {
			c.class = "card flipped";
			GAME_STATE.flippedCards.push(c);
		}
	}

	//Evaluate match
	if (GAME_STATE.flippedCards.length === 2) {
		if (GAME_STATE.flippedCards[0].card === GAME_STATE.flippedCards[1].card) {
			for (const c of updatedBoard) {
				if (c.id === GAME_STATE.flippedCards[0].id || c.id === GAME_STATE.flippedCards[1].id) {
					c.matched = true;
				}
			}
			GAME_STATE.flippedCards = [];
			GAME_STATE.board = updatedBoard;
			BrowserWindow.getFocusedWindow().send("updateBoard", GAME_STATE.board);
		} else {
			GAME_STATE.canUpdate = false;
			setTimeout(() => {
				for (const c of updatedBoard) {
					if (c.id === GAME_STATE.flippedCards[0].id || c.id === GAME_STATE.flippedCards[1].id) {
						c.class = "card";
					}
				}
				GAME_STATE.flippedCards = [];
				GAME_STATE.board = updatedBoard;
				BrowserWindow.getFocusedWindow().send("updateBoard", GAME_STATE.board);
				GAME_STATE.canUpdate = true;
			}, 1500);
		}
	}
	GAME_STATE.board = updatedBoard;
	return GAME_STATE.board;
})