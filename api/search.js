const fetch = require('node-fetch');

const key = process.env.key;
const api = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?safeSearch=strict&size=wallpaper&count=50';

/*
count=35, max=150
minHeight
minWidth
size large or wallpaper
*/
module.exports = async (req, res) => {

	let term = req.query.term;
	if(!term) term='kittens';

	let resp = await fetch(api+ '&q=' + encodeURIComponent(term) + '%20AND%20cats', {
		method:'get',
		headers: {
			'Ocp-Apim-Subscription-Key':key
		}
	});
	let json = await resp.json();
	let results = json.value.map(i => {
		return {
			url: i.contentUrl,
			displayHost:i.hostPageDisplayUrl,
			host:i.hostPageUrl,
			name:i.name
		}
	});
	
	res.json(
		results
	)
	

  }