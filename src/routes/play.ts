import fs from 'fs';
import lodash from 'lodash';
import express from 'express';
import multiparty from 'multiparty';
import Crypto from 'crypto';
import { tmpdir } from 'os';
import Path from 'path';

import * as game from '../game/game.js';
import { verify } from '../game/game-verifier.js';
import { challenges } from '../challenges/index.js';

const app = express();

app.get('/', (req, res) => {
  const currentGame = game.get();

  if (!currentGame) {
    return res.render('no-game');
  }

  const session = {
    email: req.query.email,
    team: req.query.team,
    key: req.query.key,
  };

  const challenge = challenges.find(
    (challenge) => challenge.key === currentGame.key
  );
  const timeRemaining = game.getTimeRemainingSeconds();

  let clock = '';

  if (timeRemaining > 0) {
    const min = Math.floor(timeRemaining / 60).toString();
    const sec = Math.floor(timeRemaining % 60)
      .toString()
      .padStart(2, '0');
    clock = [min, sec].join(':');
  } else {
    clock = '0:00';
  }

  const validEntries = lodash.sortBy(
    lodash.filter(currentGame.entries, { valid: true }),
    'strokes'
  );
  const invalidEntries = lodash.sortBy(
    lodash.filter(currentGame.entries, { valid: false }),
    'strokes'
  );

  return res.render('play', {
    session,
    challenge,
    clock,
    game: currentGame,
    entries: [...validEntries, ...invalidEntries],
    err: req.query.err,
    autoreload: req.query.autoreload === 'true',
    showaddentry: req.query.autoreload !== 'true',
  });
});

app.get('/solution/:key', (req, res) => {
  const getSolution = (game: game.Game, key: string) => {
    const entry = lodash.find(game.entries, { key });

    if (entry) {
      return fs.readFileSync(entry.file, 'utf8');
    }
  };

  const currentGame = game.getOrError();
  const solution = getSolution(currentGame, req.params.key);

  if (currentGame.running) {
    return res.send(403);
  }

  return res
    .set('Content-Type', 'text/plain')
    .send(solution || 'No solution found');
});

function tmpFile(ext:string) {
  return Path.join(
    tmpdir(),
    `archive.${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.${ext}`
  );
}

app.post('/submit', (req, res) => {
  const redirect = (result: Partial<game.Entry>, err: string) => {
    const url = [
      '/?email=',
      result.email,
      '&team=',
      result.team,
      '&key=',
      result.key,
      '&err=',
      err,
    ]
      .filter((p) => !!p)
      .join('');

    return res.redirect(url);
  };

  const form = new multiparty.Form();

  form.parse(req, (_err, fields, files) => {
    const email = fields['email'][0];
    const team = fields['team'][0];
    const key = fields['key'][0];

    let file =
      files && files['file'] && files['file'][0] ? files['file'][0].path : null;
    if (file == null) {
      file = tmpFile('.js');
      fs.writeFileSync(file, fields['code'][0]);
    }

    const entry = {
      email,
      team,
      key,
      file,
    };

    const result = game.addEntry(entry);

    if (result.err) {
      return redirect(result.entry || {}, result.err);
    }

    verify(entry.file, (status) => {
      if (result?.entry?.key) {
        game.setValid(result.entry.key, status.valid);
      }

      return redirect(result.entry || {}, status.err);
    });
  });
});

export default app;
