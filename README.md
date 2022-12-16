# MooMoo.js - A powerful and easy to use MooMoo API

## Installation

You can either use it as a greasyfork import or as an external userscript.

### Greasyfork
you can follow the instructions [here](https://greasyfork.org/en/scripts/456235-moomoo-js)

### External

1. Install Tampermonkey or Greasemonkey

You can grab it from greasyfork and paste it into your userscript manager.

or require this:
https://cdn.jsdelivr.net/gh/NuroC/MooMoo.js/dist/bundle.js

## Usage

### 1. Installing it and getting started

I've set an Function prototype checking for a specific name, so you can freely just add this short peace to your code and you're ready to go.

```js
const MooMoo = (function MooMooJS_beta() {})[69]
```

This will set the MooMoo variable to the MooMoo API.

I will show below how to use it.

### 1 Event Listeners

- `packet` - Fired when a packet is received

This event is run when a packet is received. It contains the raw packet data as an object. You can use this the following way:

```js
MooMoo.on("packet", (obj) => {
    let packet = obj.packet;
    let packetData = obj.data;
    // Do stuff with the packet
})
```

- `debug` - Fired when a debug message is sent

This event is run when any sort of debug message is sent from the api. This is usually for developing purposes. You can use this the following way:

```js
MooMoo.on("debug", message => {
    // Do stuff with the message
})
```

### 2. Data and Information

- `MooMoo.ws` - The websocket connection

Returns the WebSocket class, including the URL, `readyState`, or anything that is on the WS class.

- `MooMoo.teams` - An Array of Alliances that are currently in the game (needs to be updated)
- `MooMoo.myPlayer` - returns an Object of your current player, including x, y, hats, and other information.
- `MooMoo.ActivePlayerManager` - returns an Instance of the ActivePlayermanager class. This class contains all players, which are currently on your screen.

this class has the following usabillities:
```js
MooMoo.ActivePlayerManager.players // returns an array of all players on your screen
MooMoo.ActivePlayerManager.getPlayerBySid(id) // returns the player with the given sid
MooMoo.ActivePlayerManager.getPlayerById(team) // returns an array of all players with the given id
```

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

- `MooMoo.myPlayer.inventory` - returns an array of all item ids in your "inventory"

```js
let inventory = MooMoo.myPlayer.inventory
```

- It has the following properties:
    - `primary`
    - `secondary`
    - `food`
    - `wall`
    - `spike`
    - `mill`
    - `mine`
    - `boostPad`
    - `trap`
    - `turret`
    - `spawnPad`

#### 2.1 Functions

- `MooMoo.sendPacket(packet)` - Sends a packet to the server

Usage: `(packetType, ...data)`
```js
MooMoo.sendPacket("ch", "Hello World")`
```




## TODO

- [x] Add a jsdelivr link
- [x] Add place function
- [ ] Add math helper:
    - [X] Distance between 2 points
    - [ ] create radian angle from 2 points
- [ ] Equip / Unequip Hat
- [ ] Equip / Unequip Acc
- [x] add items
- [ ] add bot class
- [ ] add bot manager
- [ ] add bot functions
- [ ] add bot events
- [ ] add command handler (good, without the comman sending to the server)
