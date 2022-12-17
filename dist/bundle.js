(() => {
    "use strict";
    var e = {
        d: (t, n) => {
            for (var r in n) e.o(n, r) && !e.o(t, r) && Object.defineProperty(t, r, {
                enumerable: !0,
                get: n[r]
            });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    e.d({}, {
        t: () => q
    });
    const t = function() {
        function EventEmitter() {
            this._listeners = {};
        }
        return EventEmitter.prototype.on = function(e, t) {
            this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t);
        }, EventEmitter.prototype.emit = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            this._listeners[e] && this._listeners[e].forEach((function(e) {
                return e.apply(void 0, t);
            }));
        }, EventEmitter.prototype.addEventListener = function(e, t) {
            this.on(e, t);
        }, EventEmitter;
    }(), msgpack_decode = function(e) {
        let t = 0;
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), "object" != typeof e || void 0 === e.length) throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!e.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        let n = i();
        return e.length, n;
        function i() {
            const n = e[t++];
            if (n >= 0 && n <= 127) return n;
            if (n >= 128 && n <= 143) return l(n - 128);
            if (n >= 144 && n <= 159) return c(n - 144);
            if (n >= 160 && n <= 191) return d(n - 160);
            if (192 === n) return null;
            if (193 === n) throw new Error("Invalid byte code 0xc1 found.");
            if (194 === n) return !1;
            if (195 === n) return !0;
            if (196 === n) return a(-1, 1);
            if (197 === n) return a(-1, 2);
            if (198 === n) return a(-1, 4);
            if (199 === n) return w(-1, 1);
            if (200 === n) return w(-1, 2);
            if (201 === n) return w(-1, 4);
            if (202 === n) return u(4);
            if (203 === n) return u(8);
            if (204 === n) return o(1);
            if (205 === n) return o(2);
            if (206 === n) return o(4);
            if (207 === n) return o(8);
            if (208 === n) return f(1);
            if (209 === n) return f(2);
            if (210 === n) return f(4);
            if (211 === n) return f(8);
            if (212 === n) return w(1);
            if (213 === n) return w(2);
            if (214 === n) return w(4);
            if (215 === n) return w(8);
            if (216 === n) return w(16);
            if (217 === n) return d(-1, 1);
            if (218 === n) return d(-1, 2);
            if (219 === n) return d(-1, 4);
            if (220 === n) return c(-1, 2);
            if (221 === n) return c(-1, 4);
            if (222 === n) return l(-1, 2);
            if (223 === n) return l(-1, 4);
            if (n >= 224 && n <= 255) return n - 256;
            throw console.debug("msgpack array:", e), new Error("Invalid byte value '" + n + "' at index " + (t - 1) + " in the MessagePack binary data (length " + e.length + "): Expecting a range of 0 to 255. This is not a byte array.");
        }
        function f(n) {
            let r = 0, y = !0;
            for (;n-- > 0; ) if (y) {
                let n = e[t++];
                r += 127 & n, 128 & n && (r -= 128), y = !1;
            } else r *= 256, r += e[t++];
            return r;
        }
        function o(n) {
            let r = 0;
            for (;n-- > 0; ) r *= 256, r += e[t++];
            return r;
        }
        function u(n) {
            let r = new DataView(e.buffer, t, n);
            return t += n, 4 === n ? r.getFloat32(0, !1) : 8 === n ? r.getFloat64(0, !1) : void 0;
        }
        function a(n, r) {
            n < 0 && (n = o(r));
            let y = e.subarray(t, t + n);
            return t += n, y;
        }
        function l(e, t) {
            e < 0 && (e = o(t));
            let n = {};
            for (;e-- > 0; ) n[i()] = i();
            return n;
        }
        function c(e, t) {
            e < 0 && (e = o(t));
            let n = [];
            for (;e-- > 0; ) n.push(i());
            return n;
        }
        function d(n, r) {
            n < 0 && (n = o(r));
            let y = t;
            return t += n, function(e, t, n) {
                let r = t, y = "";
                for (n += t; r < n; ) {
                    let t = e[r++];
                    if (t > 127) if (t > 191 && t < 224) {
                        if (r >= n) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                        t = (31 & t) << 6 | 63 & e[r++];
                    } else if (t > 223 && t < 240) {
                        if (r + 1 >= n) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                        t = (15 & t) << 12 | (63 & e[r++]) << 6 | 63 & e[r++];
                    } else {
                        if (!(t > 239 && t < 248)) throw new Error("UTF-8 decode: unknown multibyte start 0x" + t.toString(16) + " at index " + (r - 1));
                        if (r + 2 >= n) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                        t = (7 & t) << 18 | (63 & e[r++]) << 12 | (63 & e[r++]) << 6 | 63 & e[r++];
                    }
                    if (t <= 65535) y += String.fromCharCode(t); else {
                        if (!(t <= 1114111)) throw new Error("UTF-8 decode: code point 0x" + t.toString(16) + " exceeds UTF-16 reach");
                        t -= 65536, y += String.fromCharCode(t >> 10 | 55296), y += String.fromCharCode(1023 & t | 56320);
                    }
                }
                return y;
            }(e, y, n);
        }
        function w(e, n) {
            e < 0 && (e = o(n));
            let r = o(1), y = a(e);
            return 255 === r ? function(e) {
                if (4 === e.length) {
                    let t = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                    return new Date(1e3 * t);
                }
                if (8 === e.length) {
                    let t = (e[0] << 22 >>> 0) + (e[1] << 14 >>> 0) + (e[2] << 6 >>> 0) + (e[3] >>> 2), n = 4294967296 * (3 & e[3]) + (e[4] << 24 >>> 0) + (e[5] << 16 >>> 0) + (e[6] << 8 >>> 0) + e[7];
                    return new Date(1e3 * n + t / 1e6);
                }
                if (12 === e.length) {
                    let n = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                    t -= 8;
                    let r = f(8);
                    return new Date(1e3 * r + n / 1e6);
                }
                throw new Error("Invalid data length for a date value.");
            }(y) : {
                type: r,
                data: y
            };
        }
    }, msgpack_encode = function(e) {
        const t = 4294967296;
        let n, r, y = new Uint8Array(128), p = 0;
        return a(e), y.subarray(0, p);
        function a(e) {
            switch (typeof e) {
              case "undefined":
                o();
                break;

              case "boolean":
                !function(e) {
                    s(e ? 195 : 194);
                }(e);
                break;

              case "number":
                !function(e) {
                    if (isFinite(e) && Math.floor(e) === e) if (e >= 0 && e <= 127) s(e); else if (e < 0 && e >= -32) s(e); else if (e > 0 && e <= 255) c([ 204, e ]); else if (e >= -128 && e <= 127) c([ 208, e ]); else if (e > 0 && e <= 65535) c([ 205, e >>> 8, e ]); else if (e >= -32768 && e <= 32767) c([ 209, e >>> 8, e ]); else if (e > 0 && e <= 4294967295) c([ 206, e >>> 24, e >>> 16, e >>> 8, e ]); else if (e >= -2147483648 && e <= 2147483647) c([ 210, e >>> 24, e >>> 16, e >>> 8, e ]); else if (e > 0 && e <= 0x10000000000000000) {
                        let n = e / t, r = e % t;
                        c([ 211, n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r ]);
                    } else e >= -0x8000000000000000 && e <= 0x8000000000000000 ? (s(211), u(e)) : c(e < 0 ? [ 211, 128, 0, 0, 0, 0, 0, 0, 0 ] : [ 207, 255, 255, 255, 255, 255, 255, 255, 255 ]); else r || (n = new ArrayBuffer(8), 
                    r = new DataView(n)), r.setFloat64(0, e), s(203), c(new Uint8Array(n));
                }(e);
                break;

              case "string":
                !function(e) {
                    let t = function(e) {
                        let t = !0, n = e.length;
                        for (let r = 0; r < n; r++) if (e.charCodeAt(r) > 127) {
                            t = !1;
                            break;
                        }
                        let r = 0, y = new Uint8Array(e.length * (t ? 1 : 4));
                        for (let t = 0; t !== n; t++) {
                            let p = e.charCodeAt(t);
                            if (p < 128) y[r++] = p; else {
                                if (p < 2048) y[r++] = p >> 6 | 192; else {
                                    if (p > 55295 && p < 56320) {
                                        if (++t >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                        let g = e.charCodeAt(t);
                                        if (g < 56320 || g > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + g.toString(16) + " at index " + t + " out of range");
                                        p = 65536 + ((1023 & p) << 10) + (1023 & g), y[r++] = p >> 18 | 240, y[r++] = p >> 12 & 63 | 128;
                                    } else y[r++] = p >> 12 | 224;
                                    y[r++] = p >> 6 & 63 | 128;
                                }
                                y[r++] = 63 & p | 128;
                            }
                        }
                        return t ? y : y.subarray(0, r);
                    }(e), n = t.length;
                    n <= 31 ? s(160 + n) : c(n <= 255 ? [ 217, n ] : n <= 65535 ? [ 218, n >>> 8, n ] : [ 219, n >>> 24, n >>> 16, n >>> 8, n ]), 
                    c(t);
                }(e);
                break;

              case "object":
                null === e ? o() : e instanceof Date ? function(e) {
                    let n = e.getTime() / 1e3;
                    if (0 === e.getMilliseconds() && n >= 0 && n < 4294967296) c([ 214, 255, n >>> 24, n >>> 16, n >>> 8, n ]); else if (n >= 0 && n < 17179869184) {
                        let r = 1e6 * e.getMilliseconds();
                        c([ 215, 255, r >>> 22, r >>> 14, r >>> 6, r << 2 >>> 0 | n / t, n >>> 24, n >>> 16, n >>> 8, n ]);
                    } else {
                        let t = 1e6 * e.getMilliseconds();
                        c([ 199, 12, 255, t >>> 24, t >>> 16, t >>> 8, t ]), u(n);
                    }
                }(e) : Array.isArray(e) ? f(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                    let t = e.length;
                    c(t <= 15 ? [ 196, t ] : t <= 65535 ? [ 197, t >>> 8, t ] : [ 198, t >>> 24, t >>> 16, t >>> 8, t ]), 
                    c(e);
                }(e) : e instanceof Int8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? f(e) : function(e) {
                    let t = 0;
                    for (let n in e) t++;
                    t <= 15 ? s(128 + t) : c(t <= 65535 ? [ 222, t >>> 8, t ] : [ 223, t >>> 24, t >>> 16, t >>> 8, t ]);
                    for (let t in e) a(t), a(e[t]);
                }(e);
            }
        }
        function o(e) {
            s(192);
        }
        function f(e) {
            let t = e.length;
            t <= 15 ? s(144 + t) : c(t <= 65535 ? [ 220, t >>> 8, t ] : [ 221, t >>> 24, t >>> 16, t >>> 8, t ]);
            for (let n = 0; n < t; n++) a(e[n]);
        }
        function s(e) {
            if (y.length < p + 1) {
                let e = 2 * y.length;
                for (;e < p + 1; ) e *= 2;
                let t = new Uint8Array(e);
                t.set(y), y = t;
            }
            y[p] = e, p++;
        }
        function c(e) {
            if (y.length < p + e.length) {
                let t = 2 * y.length;
                for (;t < p + e.length; ) t *= 2;
                let n = new Uint8Array(t);
                n.set(y), y = n;
            }
            y.set(e, p), p += e.length;
        }
        function u(e) {
            let n, r;
            e >= 0 ? (n = e / t, r = e % t) : (e++, n = Math.abs(e) / t, r = Math.abs(e) % t, 
            n = ~n, r = ~r), c([ n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r ]);
        }
    };
    const n = function() {
        function Alliance(e, t) {
            this.Leader = e, this.Name = t;
        }
        return Alliance.prototype.setAliancePlayers = function(e) {
            this.Members = e;
        }, Alliance;
    }();
    const r = function Player(e) {
        this.sid = e;
    };
    const y = function setInitData(e) {
        for (var t = e.teams, y = 0; y < t.length; y++) {
            var p = t[y], g = p.sid, h = p.owner, m = new n(new r(h), g);
            q.teams.push(m);
        }
    };
    const p = function place(e, t) {
        var n = q.myPlayer.weaponIndex;
        q.sendPacket("5", e, t), q.sendPacket("c", 1, t), q.sendPacket("c", 0, t), q.sendPacket("5", n, !0);
    };
    const g = function chat(e) {
        q.sendPacket("ch", e);
    };
    const h = function setupGame(e) {
        q.myPlayer = {}, q.myPlayer.sid = e, q.myPlayer.place = p, q.myPlayer.chat = g;
    };
    const m = function addPlayer(e, t) {
        var n = q.GamePlayerManager.getPlayerBySid(e[1]);
        n || ((n = new r(e[1])).name = e[2], n.id = e[0], q.GamePlayerManager.addPlayer(n)), 
        q.debug("Player " + n.name + " has joined the game."), t && console.log("You are now in game!");
    };
    const b = function removePlayer(e) {
        q.GamePlayerManager.removePlayerById(e), q.debug("Player " + e + " has left the game.");
    };
    const P = function chunk(e, t) {
        for (var n = [], r = 0; r < e.length; r += t) n.push(e.slice(r, r + t));
        return n;
    };
    const v = function cacheItems() {
        q.myPlayer.inventory = {};
        for (var e = [ {
            category: "primary",
            start: 0,
            end: 9
        }, {
            category: "secondary",
            start: 9,
            end: 16
        }, {
            category: "food",
            start: 16,
            end: 19,
            subtract: !0
        }, {
            category: "wall",
            start: 19,
            end: 22,
            subtract: !0
        }, {
            category: "spike",
            start: 22,
            end: 26,
            subtract: !0
        }, {
            category: "mill",
            start: 26,
            end: 29,
            subtract: !0
        }, {
            category: "mine",
            start: 29,
            end: 31,
            subtract: !0
        }, {
            category: "boostPad",
            start: 31,
            end: 33,
            subtract: !0
        }, {
            category: "trap",
            start: 31,
            end: 33,
            subtract: !0
        }, {
            category: "turret",
            start: 33,
            end: 36,
            subtract: !0
        }, {
            category: "spawnPad",
            start: 36,
            end: 37,
            subtract: !0
        } ], t = 0; t < e.length; t++) for (var n = e[t], r = n.category, y = n.start, p = n.end, g = n.subtract, h = y; h < p; h++) {
            var m = document.getElementById("actionBarItem".concat(h));
            if (m && null !== m.offsetParent) {
                q.myPlayer.inventory[r] = g ? h - 16 : h;
                break;
            }
        }
    };
    const M = function updatePlayers(e) {
        var t = P(e, 13);
        q.ActivePlayerManager.clearPlayers(), t.forEach((function(e) {
            var t = q.GamePlayerManager.getPlayerBySid(e[0]);
            t || (t = new r(e[0])), t.sid = e[0], t.x = e[1], t.y = e[2], t.dir = e[3], t.buildIndex = e[4], 
            t.weaponIndex = e[5], t.weaponVariant = e[6], t.team = e[7], t.isLeader = e[8], 
            t.skinIndex = e[9], t.tailIndex = e[10], t.iconIndex = e[11], t.zIndex = e[12], 
            q.ActivePlayerManager.addPlayer(t), t.sid === q.myPlayer.sid && Object.assign(q.myPlayer, t);
        })), v();
    };
    const j = function updateLeaderboard(e) {
        q.LeaderboardManager.updateLeaderboard(e);
    };
    const k = function GameObject(e) {
        this.sid = e;
    };
    const O = function loadGameObject(e) {
        P(e, 8).forEach((function(e) {
            var t = q.GameObjectManager.getGameObjectBySid(e[0]);
            t || (t = new k(e[0])), t.x = e[1], t.y = e[2], t.ownerSid = e[3], t.type = e[4], 
            t.sid = e[0], t.dir = e[5], t.scale = e[6], t.idk = e[7], q.GameObjectManager.addObject(t);
        }));
    };
    const S = function killObject(e) {
        q.GameObjectManager.removeObjectBySid(e);
    };
    const A = function killObjects(e) {
        q.GameObjectManager.removeObjectsByOwnerSid(e);
    };
    const E = function sendChat(e) {
        var t = q.CommandManager, n = t.prefix;
        if (e.startsWith(n)) {
            var r = t.commands, y = e.split(" ")[0].slice(n.length), p = e.split(" ").slice(1), g = r[y];
            return !g || (g.run(g, p), !1);
        }
        return !0;
    };
    const I = function handleClientPackets(e, t) {
        var n = !0;
        if ("ch" === e) n = E(t[0]);
        return n;
    };
    var x = !1;
    const U = function() {
        function PlayerManager() {
            this.players = [];
        }
        return PlayerManager.prototype.addPlayer = function(e) {
            this.players.push(e);
        }, PlayerManager.prototype.removePlayer = function(e) {
            this.players.splice(this.players.indexOf(e), 1);
        }, PlayerManager.prototype.removePlayerBySid = function(e) {
            this.players.splice(this.players.findIndex((function(t) {
                return t.sid === e;
            })), 1);
        }, PlayerManager.prototype.removePlayerById = function(e) {
            this.players.splice(this.players.findIndex((function(t) {
                return t.id === e;
            })), 1);
        }, PlayerManager.prototype.getPlayerBySid = function(e) {
            return this.players.find((function(t) {
                return t.sid === e;
            }));
        }, PlayerManager.prototype.getPlayerById = function(e) {
            return this.players.find((function(t) {
                return t.id === e;
            }));
        }, PlayerManager.prototype.clearPlayers = function() {
            this.players = [];
        }, PlayerManager;
    }();
    const T = function() {
        function Leaderboardmanager() {
            this.leaderboard = new Map;
        }
        return Leaderboardmanager.prototype.updateLeaderboard = function(e) {
            var t = this, n = P(e, 3);
            e.length;
            n.forEach((function(e, n) {
                var y = q.GamePlayerManager.getPlayerBySid(e[0]);
                y || ((y = new r(e[0])).sid = e[0], y.name = e[1], q.GamePlayerManager.addPlayer(y)), 
                t.leaderboard.set(n + 1, {
                    player: y,
                    sid: e[0],
                    name: e[1],
                    score: e[2]
                });
            }));
        }, Leaderboardmanager.prototype.clearLeaderboard = function() {
            this.leaderboard = new Map;
        }, Leaderboardmanager;
    }();
    const B = function() {
        function ObjectManager() {
            this.objects = new Map;
        }
        return ObjectManager.prototype.addObject = function(e) {
            var t = q.GameObjectManager.getGameObjectBySid(e.sid);
            t || (t = new k(e.sid)), t.x = e.x, t.y = e.y, t.ownerSid = e.ownerSid, t.type = e.type, 
            t.sid = e.sid, this.objects.set(e.sid, t);
        }, ObjectManager.prototype.getGameObjectBySid = function(e) {
            return this.objects.get(e);
        }, ObjectManager.prototype.getObjectsByOwnerSid = function(e) {
            var t = [];
            return this.objects.forEach((function(n) {
                n.ownerSid == e && t.push(n);
            })), t;
        }, ObjectManager.prototype.removeObjectBySid = function(e) {
            this.objects.delete(e);
        }, ObjectManager.prototype.removeObjectsByOwnerSid = function(e) {
            var t = this;
            this.objects.forEach((function(n) {
                n.ownerSid == e && t.objects.delete(n.sid);
            }));
        }, ObjectManager;
    }();
    const C = function() {
        function Command(e, t) {
            this.name = e, this.run = t;
        }
        return Command.prototype.reply = function(e) {
            q.myPlayer.chat(e);
        }, Command;
    }();
    const L = function() {
        function CommandManager() {
            this.commands = {}, this.prefix = "/";
        }
        return CommandManager.prototype.setPrefix = function(e) {
            this.prefix = e;
        }, CommandManager.prototype.registerCommand = function(e, t) {
            var n = new C(e, t);
            this.commands[e] = n;
        }, CommandManager.prototype.unregisterCommand = function(e) {
            delete this.commands[e];
        }, CommandManager;
    }();
    const G = function() {
        function UTILS() {
            this.getDistanceBetweenTwoPoints = UTILS.getDistanceBetweenTwoPoints, this.dist = UTILS.getDistanceBetweenTwoPoints, 
            this.distance = UTILS.getDistanceBetweenTwoPoints, this.atan2 = UTILS.atan2, this.angle = UTILS.atan2;
        }
        return UTILS.getDistanceBetweenTwoPoints = function(e, t, n, r) {
            return Math.sqrt(Math.pow(n - e, 2) + Math.pow(r - t, 2));
        }, UTILS.atan2 = function(e, t, n, r) {
            return Math.atan2(r - t, n - e);
        }, UTILS;
    }();
    var _, F = (_ = function(e, t) {
        return _ = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        }, _(e, t);
    }, function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function __() {
            this.constructor = e;
        }
        _(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, 
        new __);
    });
    const D = function(e) {
        function Game() {
            var t = e.call(this) || this;
            return t.teams = [], t.GamePlayerManager = new U, t.ActivePlayerManager = new U, 
            t.LeaderboardManager = new T, t.GameObjectManager = new B, t.CommandManager = new L, 
            t.UTILS = new G, t.vars = {}, t.msgpack = {}, t.msgpack.decode = msgpack_decode, 
            t.msgpack.encode = msgpack_encode, t;
        }
        return F(Game, e), Game.prototype.debug = function(e) {
            this.emit("debug", e);
        }, Game;
    }(t);
    !function hookWS() {
        WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
            apply: function(e, t, n) {
                if (q.ws = t, q.sendPacket = function(e) {
                    var t = Array.prototype.slice.call(arguments, 1), n = msgpack_encode([ e, t ]);
                    q.ws.send(n);
                }, 1 !== q.ws.readyState) return !0;
                if (x || (x = !0, q.ws.addEventListener("message", (function(e) {
                    var t = e.data, n = msgpack_decode(t);
                    !function handleServerPackets(e, t) {
                        switch (e) {
                          case "id":
                            y(t[0]);
                            break;

                          case "d":
                          case "a":
                          case "aa":
                          case "7":
                          case "8":
                          case "sp":
                          case "9":
                          case "h":
                          case "11":
                          case "14":
                          case "15":
                          case "16":
                          case "17":
                          case "18":
                          case "19":
                          case "20":
                          case "ac":
                          case "ad":
                          case "an":
                          case "st":
                          case "sa":
                          case "us":
                          case "ch":
                          case "mm":
                          case "t":
                          case "p":
                          case "pp":
                            break;

                          case "1":
                            h(t[0]);
                            break;

                          case "2":
                            m(t[0], t[1]);
                            break;

                          case "4":
                            b(t[0]);
                            break;

                          case "33":
                            M(t[0]);
                            break;

                          case "5":
                            j(t[0]);
                            break;

                          case "6":
                            O(t[0]);
                            break;

                          case "12":
                            S(t[0]);
                            break;

                          case "13":
                            A(t[0]);
                            break;

                          default:
                            console.log("Unknown packet: " + e);
                        }
                        q.emit("packet", {
                            packet: e,
                            data: t
                        });
                    }(n[0], n[1].slice(0));
                }))), n && n[0]) {
                    var r = msgpack_decode(n[0]), p = r[0], g = r[1].slice(0);
                    if (!I(p, g)) return !0;
                }
                return Reflect.apply(e, t, n);
            }
        });
    }();
    var q = new D;
    Object.defineProperty(Function.prototype, 69, {
        get: function() {
            return "MooMooJS_beta" === this.name ? q : null;
        }
    });
})();