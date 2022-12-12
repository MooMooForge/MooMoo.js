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
- `MooMoo.teams` - An Array of Alliances that are currently in the game (needs to be updated)

#### 2.1 Functions

- `MooMoo.sendPacket(packet)` - Sends a packet to the server

Usage: `MooMoo.sendPacket("ch", "Hello World")` - `(packetType, ...data)`
