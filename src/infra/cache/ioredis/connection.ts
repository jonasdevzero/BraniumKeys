import { ENV } from '@main/config/env';
import 'dotenv/config';
import IoRedis from 'ioredis';

export let ioredis = new IoRedis(ENV.REDIS_URL);
