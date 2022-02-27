import {Request, Response} from 'express';
import shortId from 'shortid';
import asyncWrapper from '../middlewares/async';
import {URLModel} from '../models/urlmodels';

const shorten = asyncWrapper(async (req: Request, res: Response):
	   Promise<Response> => {

		const {originURL} = req.body;
		const url = await URLModel.findOne({originURL});
		if(url)
			return res.status(200).json(url);
		const hash = shortId.generate();
		const shortURL = `${process.env.API_SHORT_URL}/${hash}`;
		const newUrl = await URLModel.create({hash, shortURL, originURL});

		return res.status(200).json({newUrl});

	}
);

const redirect = asyncWrapper(async (req: Request, res: Response):
		Promise<Response> => {

		const {hash} = req.params;
		const url = await URLModel.findOne({hash});

		if(url){
			res.redirect(url.originURL);
			return;
		}

		//next
		return res.status(200).json({msg: 'ok'});


	}
);

export default {shorten, redirect};
