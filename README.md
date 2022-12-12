# MooMoo.js - A powerful and easy to use MooMoo API

## Installation

You can either use it as a greasyfork import or as an external userscript.

### Greasyfork
you can follow the instructions [here](https://greasyfork.org/en/scripts/456235-moomoo-js)

### External

1. Install Tampermonkey or Greasemonkey

You can grab it from greasyfork and paste it into your userscript manager.

I will add a jsdelivr link soon.

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

#### 2.1 Functions

- `MooMoo.sendPacket(packet)` - Sends a packet to the server

Usage: `(packetType, ...data)`
```js
MooMoo.sendPacket("ch", "Hello World")`
```

