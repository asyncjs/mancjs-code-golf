import express from 'express';
import expressBasicAuth from 'express-basic-auth';

import { challenges } from '../challenges/index.js';
import * as game from '../game/game.js';

const DEFAULT_TIME_LIMIT = 20;

const app = express();

const authorizer = (username: string, password: string) => {
  return username === 'admin' && password === process.env['CG_ADMIN_PASSWORD'];
};

app.use(expressBasicAuth({ authorizer, challenge: true }));

app.get('/admin', (_req, res) => {
  return res.render('admin', {
    gameData: JSON.stringify(game.get(), undefined, 2),
    challenge: game.getCurrentChallenge(),
    challengeList: challenges,
    timeLimitMinutes:
      game.getTimeRemainingSeconds() > 0 ? '' : DEFAULT_TIME_LIMIT,
    game: game.get(),
  });
});

app.post('/start', (req, res) => {
  const timeLimitMinutes: string | undefined = req.body.timeLimitMinutes;

  game.start({
    key: req.body.key,
    timeLimitMinutes: timeLimitMinutes
      ? parseFloat(timeLimitMinutes)
      : undefined,
  });

  return res.redirect('/admin');
});

app.get('/stop', (_req, res) => {
  game.stop();
  return res.redirect('/admin');
});

app.get('/challenge', (req, res) => {
  const key = req.query.key?.toString();
  const challenge = key && challenges.find((ch) => ch.key === key);
  return challenge ? res.json(challenge) : res.status(404).end();
});

export default app;
