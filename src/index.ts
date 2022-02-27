import express from 'express';
import urlShortener from './controllers/urlController';
import myConnect from './db/db';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/shorten', urlShortener.shorten);
app.get('/:hash', urlShortener.redirect);

const port = process.env.PORT || 5000;

async function start(): Promise<void>{

	try{

		await myConnect();
		app.listen(port, () => console.log(`listening on ${port}`));

	} catch (err){

		console.log(err);

	}

}

start();
