import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_SHORTENER;

function myConnect(): Promise<typeof import("mongoose")>{

	const options = {

		useNewUrlParser: true,
		useUnifiedTopology: true

	}

	return mongoose.connect(connectionString, options);

}

export default myConnect;
