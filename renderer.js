const updateBoard = (cards) => {
	const board = cards.map(card => {
		return `<div class="${card.class}" data-card-id="${card.id}" data-card="${card.card}" data-matched="${card.matched}"><img src="${card.imgUrl}"></div>`
	}).join('');
	document.getElementById("board").innerHTML = board;
}

window.ipc.on("updateBoard", (e, cards)=>{
	updateBoard(cards);
});

document.addEventListener("DOMContentLoaded", async () => {
	const cards = await window.ipc.invoke('layoutCards');
	updateBoard(cards);
});

document.addEventListener("click", async (e) => {
	if (e.target.getAttribute("data-card") && !e.target.className.includes("flipped")) {
		const card = {
			card: e.target.getAttribute("data-card"),
			id: parseInt(e.target.getAttribute("data-card-id")),
			class: e.target.className,
			matched: e.target.getAttribute("data-matched"),
		}
		const cards = await window.ipc.invoke("cardClick", card);
		updateBoard(cards);
	}
});
