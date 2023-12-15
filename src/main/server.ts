import 'dotenv/config';
import './config/valid';
import '@container/register';
import https from 'node:https';
import fs from 'node:fs';
import { router } from './routes';
import { ENV } from './config/env';
import { connect } from '@infra/db/mongodb/connection';

const port = process.env.PORT || 5000;

const options: https.ServerOptions = {
	key: fs.readFileSync(ENV.PRIVATE_KEY),
	cert: fs.readFileSync(ENV.CERTIFICATE),
};

const server = https.createServer(options, router.lookup.bind(router));
connect();

server.listen(port, () => {
	console.log('[Key Exchange] server is running on port ' + port);
});
