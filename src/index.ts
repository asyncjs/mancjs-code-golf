import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import mustachex from 'mustachex';
import * as url from 'url';

import play from './routes/play.js';
import admin from './routes/admin.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const PORT = 1122;

if (!process.env['CG_ADMIN_PASSWORD']) {
  // eslint-disable-next-line no-console
  console.error('Please set the CG_ADMIN_PASSWORD environment variable');
  process.exit(1);
}

const app = express();

app.engine('html', mustachex.express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '..', 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(play);
app.use(admin);

app.listen(PORT);

// eslint-disable-next-line no-console
console.log(`Server running at http://localhost:${PORT}`);
