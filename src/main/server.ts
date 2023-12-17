import 'dotenv/config';
import './config/valid';
import '@container/register';
import { ENV } from './config/env';
import fs from 'node:fs';
import https from 'node:https';
import { router } from './routes';
import { connectDatabase } from '@infra/db/mongodb/connection';

const port = process.env.PORT || 5000;

const options: https.ServerOptions = {
	key: fs.readFileSync(ENV.PRIVATE_KEY),
	cert: fs.readFileSync(ENV.CERTIFICATE),
};

const server = https.createServer(options, router.lookup.bind(router));
connectDatabase();

server.listen(port, () => {
	console.log('[Key Exchange] server is running on port ' + port);
});
