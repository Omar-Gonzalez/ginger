const path = require("path");

const appTitle = "Meme-mory"


const shuffleArray = (a) => {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

const cardSet = [
	{
		card: "robert",
		imgUrl: path.join(__dirname, 'memes/robert.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "cat",
		imgUrl: path.join(__dirname, 'memes/cat1.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "doge",
		imgUrl: path.join(__dirname, 'memes/doge.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "elon",
		imgUrl: path.join(__dirname, 'memes/elon.png'),
		class: 'card',
		matched: false
	},
	{
		card: "rene",
		imgUrl: path.join(__dirname, 'memes/rene.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "robert2",
		imgUrl: path.join(__dirname, 'memes/robert2.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "think",
		imgUrl: path.join(__dirname, 'memes/think.jpg'),
		class: 'card',
		matched: false
	},
	{
		card: "wey",
		imgUrl: path.join(__dirname, 'memes/wey.jpg'),
		class: 'card',
		matched: false
	},
]

module.exports.appTitle = appTitle;
module.exports.cardSet = cardSet;
module.exports.shuffleArray = shuffleArray;