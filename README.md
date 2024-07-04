# MancJS: Code Golf

A [code golf](https://en.wikipedia.org/wiki/Code_golf) game server for JavaScript.

## Running

- Clone the repo
- Install dependencies via `npm install`
- Set the `CG_ADMIN_PASSWORD` environment variable to secure access the the `/admin` page (see package.json `start` script)
- Start the server locally via `npm start`

## URLs

### /

The submission page where players can submit solutions to the current game. Players must enter an email address (used only to render gravatar images) and a team name.

### /admin

The admin page for creating new games. Stopped games prevent new submissions and allow players to view other player submissions.

#### Security

The admin page is protected with HTTP basic auth. The username is `admin` and the password is the value of the `CG_ADMIN_PASSWORD` environment variable.

## Notes

Changing the title of the game on the admin page and starting the game again will clear current entries and begin a new game. All other modifications update the current game.

## Playing

#### Runtime

Node `v16.14.0` with no context and strict mode enforced.

#### Submissions

Players must write a script containing their solution. The solution must be a single synchronous function named `play`. The exported function will be called by the game server on each submission. Example:

```js
let play = (input) => {
  return 'your answer';
};
```

Players can submit updated solutions as often as they like on the submission page.

#### Rules

- Your solution must be a single synchronous function named `play` (don't worry about exporting it)
- Your code will be run in strict mode – use node's `--use_strict` flag to test your script
- All JavaScript language features available in Node.js `v16.14.0` are available, with game-specific exceptions
- Scripts are timed-out and fail after 5 seconds of execution time
- Comments, line breaks and whitespace **do not count** towards your score (we run your code through jsmin 1.0.1 before taking the length)
- The aim is to solve the problem with the shortest possible code (fewest "strokes")
