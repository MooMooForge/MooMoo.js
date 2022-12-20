# MooMoo.js - A powerful and easy to use MooMoo API


## Usage

### 2. Data and Information


- `MooMoo.GamePlayerManager` - returns an Instance of the GamePlayerManager class. This class contains all players, which are currently in the game.

Obviously, this only contains the players that joined after you did.

```js
MooMoo.GamePlayerManager.players // returns an array of all players in the game
MooMoo.GamePlayerManager.getPlayerBySid(id) // returns the player with the given sid
MooMoo.GamePlayerManager.getPlayerById(team) // returns an array of all players with the given id
```

- `MooMoo.LeaderboardManager` - returns an Instance of the LeaderboardManager class. This class contains the TOP 10 players.

```js
let leaderboard = MooMoo.LeaderboardManager.leaderboard // returns a Map of the top 10 players
let top1 = leaderboard.get(1) // returns the top 1 player
```

- `MooMoo.GameObjectManager` - returns an Instance of the GameObjectManager class. This class contains all game objects, which are currently in the game and have been loaded.

```js
let gameObjects = MooMoo.GameObjectManager.gameObjects // returns a Map of all game objects
let obj = gameObjects.get(sid) // returns the game object with the given sid
let objByOwner = MooMoo.GameObjectManager.getObjectsBySid(sid) // returns an array of all game objects with the given player sid
```

- `MooMoo.msgpack` - returns 2 functions, `encode` and `decode`, which are used to encode and decode msgpack data.

```js
let msgpack = MooMoo.msgpack

let packet = msgpack.encode(["ch", "Hello World"]) // encodes the packet

MooMoo.ws.send(packet) // sends the packet to the server
```
works the same for decoding.

`

- `MooMoo.UTILS` - returns an object of all utils

```js
let angle = MooMoo.UTILS.angle // returns the angle in radians between 2 points
let distance = MooMoo.UTILS.distance // returns the distance between 2 points

let a1 = angle(0, 0, 10, 10) // returns ~ 0.785
let d1 = distance(0, 0, 10, 10) // returns ~ 14.143
```

## TODO

- [x] Add a jsdelivr link
- [x] Add place function
- [x] Add math helper:
    - [X] Distance between 2 points
    - [x] create radian angle from 2 points
- [x] Equip / Unequip Hat
- [x] Equip / Unequip Acc
- [x] add items
- [ ] add bot class
- [ ] add bot manager
- [ ] add bot functions
- [ ] add bot events
- [x] add command handler (good, without the comman sending to the server)
