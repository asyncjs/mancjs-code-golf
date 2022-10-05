import * as url from 'url';

import { getChallenges } from './utils.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const challenges = await getChallenges(__dirname);

export { challenges };
