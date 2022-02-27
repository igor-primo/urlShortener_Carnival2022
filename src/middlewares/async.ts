import {Request, Response} from 'express';

function asyncWrapper(
	fn: (req: Request, res: Response) => Promise<Response>
)
	: (req: Request, res: Response) => Promise<Response | void>
	
	{

	return async function(req: Request, res: Response){

		try {

			await fn(req, res);

		} catch (err) {

			res.status(500)
				.json({msg: err});

		}

	}

}

export default asyncWrapper;
