(() => {
    "use strict";
    var e = {
        d: (t, r) => {
            for (var n in r) e.o(r, n) && !e.o(t, n) && Object.defineProperty(t, n, {
                enumerable: !0,
                get: r[n]
            });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    e.d({}, {
        t: () => _
    });
    const t = function() {
        function EventEmitter() {
            this._listeners = {};
        }
        return EventEmitter.prototype.on = function(e, t) {
            this._listeners[e] || (this._listeners[e] = []), this._listeners[e].push(t);
        }, EventEmitter.prototype.emit = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            this._listeners[e] && this._listeners[e].forEach((function(e) {
                return e.apply(void 0, t);
            }));
        }, EventEmitter.prototype.addEventListener = function(e, t) {
            this.on(e, t);
        }, EventEmitter;
    }(), lib_decode = function(e) {
        let t = 0;
        if (e instanceof ArrayBuffer && (e = new Uint8Array(e)), "object" != typeof e || void 0 === e.length) throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!e.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        e instanceof Uint8Array || (e = new Uint8Array(e));
        let r = i();
        return e.length, r;
        function i() {
            const r = e[t++];
            if (r >= 0 && r <= 127) return r;
            if (r >= 128 && r <= 143) return l(r - 128);
            if (r >= 144 && r <= 159) return c(r - 144);
            if (r >= 160 && r <= 191) return d(r - 160);
            if (192 === r) return null;
            if (193 === r) throw new Error("Invalid byte code 0xc1 found.");
            if (194 === r) return !1;
            if (195 === r) return !0;
            if (196 === r) return a(-1, 1);
            if (197 === r) return a(-1, 2);
            if (198 === r) return a(-1, 4);
            if (199 === r) return w(-1, 1);
            if (200 === r) return w(-1, 2);
            if (201 === r) return w(-1, 4);
            if (202 === r) return u(4);
            if (203 === r) return u(8);
            if (204 === r) return o(1);
            if (205 === r) return o(2);
            if (206 === r) return o(4);
            if (207 === r) return o(8);
            if (208 === r) return f(1);
            if (209 === r) return f(2);
            if (210 === r) return f(4);
            if (211 === r) return f(8);
            if (212 === r) return w(1);
            if (213 === r) return w(2);
            if (214 === r) return w(4);
            if (215 === r) return w(8);
            if (216 === r) return w(16);
            if (217 === r) return d(-1, 1);
            if (218 === r) return d(-1, 2);
            if (219 === r) return d(-1, 4);
            if (220 === r) return c(-1, 2);
            if (221 === r) return c(-1, 4);
            if (222 === r) return l(-1, 2);
            if (223 === r) return l(-1, 4);
            if (r >= 224 && r <= 255) return r - 256;
            throw console.debug("msgpack array:", e), new Error("Invalid byte value '" + r + "' at index " + (t - 1) + " in the MessagePack binary data (length " + e.length + "): Expecting a range of 0 to 255. This is not a byte array.");
        }
        function f(r) {
            let n = 0, y = !0;
            for (;r-- > 0; ) if (y) {
                let r = e[t++];
                n += 127 & r, 128 & r && (n -= 128), y = !1;
            } else n *= 256, n += e[t++];
            return n;
        }
        function o(r) {
            let n = 0;
            for (;r-- > 0; ) n *= 256, n += e[t++];
            return n;
        }
        function u(r) {
            let n = new DataView(e.buffer, t, r);
            return t += r, 4 === r ? n.getFloat32(0, !1) : 8 === r ? n.getFloat64(0, !1) : void 0;
        }
        function a(r, n) {
            r < 0 && (r = o(n));
            let y = e.subarray(t, t + r);
            return t += r, y;
        }
        function l(e, t) {
            e < 0 && (e = o(t));
            let r = {};
            for (;e-- > 0; ) r[i()] = i();
            return r;
        }
        function c(e, t) {
            e < 0 && (e = o(t));
            let r = [];
            for (;e-- > 0; ) r.push(i());
            return r;
        }
        function d(r, n) {
            r < 0 && (r = o(n));
            let y = t;
            return t += r, function(e, t, r) {
                let n = t, y = "";
                for (r += t; n < r; ) {
                    let t = e[n++];
                    if (t > 127) if (t > 191 && t < 224) {
                        if (n >= r) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                        t = (31 & t) << 6 | 63 & e[n++];
                    } else if (t > 223 && t < 240) {
                        if (n + 1 >= r) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                        t = (15 & t) << 12 | (63 & e[n++]) << 6 | 63 & e[n++];
                    } else {
                        if (!(t > 239 && t < 248)) throw new Error("UTF-8 decode: unknown multibyte start 0x" + t.toString(16) + " at index " + (n - 1));
                        if (n + 2 >= r) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                        t = (7 & t) << 18 | (63 & e[n++]) << 12 | (63 & e[n++]) << 6 | 63 & e[n++];
                    }
                    if (t <= 65535) y += String.fromCharCode(t); else {
                        if (!(t <= 1114111)) throw new Error("UTF-8 decode: code point 0x" + t.toString(16) + " exceeds UTF-16 reach");
                        t -= 65536, y += String.fromCharCode(t >> 10 | 55296), y += String.fromCharCode(1023 & t | 56320);
                    }
                }
                return y;
            }(e, y, r);
        }
        function w(e, r) {
            e < 0 && (e = o(r));
            let n = o(1), y = a(e);
            return 255 === n ? function(e) {
                if (4 === e.length) {
                    let t = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                    return new Date(1e3 * t);
                }
                if (8 === e.length) {
                    let t = (e[0] << 22 >>> 0) + (e[1] << 14 >>> 0) + (e[2] << 6 >>> 0) + (e[3] >>> 2), r = 4294967296 * (3 & e[3]) + (e[4] << 24 >>> 0) + (e[5] << 16 >>> 0) + (e[6] << 8 >>> 0) + e[7];
                    return new Date(1e3 * r + t / 1e6);
                }
                if (12 === e.length) {
                    let r = (e[0] << 24 >>> 0) + (e[1] << 16 >>> 0) + (e[2] << 8 >>> 0) + e[3];
                    t -= 8;
                    let n = f(8);
                    return new Date(1e3 * n + r / 1e6);
                }
                throw new Error("Invalid data length for a date value.");
            }(y) : {
                type: n,
                data: y
            };
        }
    }, lib_encode = function(e) {
        const t = 4294967296;
        let r, n, y = new Uint8Array(128), p = 0;
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
                        let r = e / t, n = e % t;
                        c([ 211, r >>> 24, r >>> 16, r >>> 8, r, n >>> 24, n >>> 16, n >>> 8, n ]);
                    } else e >= -0x8000000000000000 && e <= 0x8000000000000000 ? (s(211), u(e)) : c(e < 0 ? [ 211, 128, 0, 0, 0, 0, 0, 0, 0 ] : [ 207, 255, 255, 255, 255, 255, 255, 255, 255 ]); else n || (r = new ArrayBuffer(8), 
                    n = new DataView(r)), n.setFloat64(0, e), s(203), c(new Uint8Array(r));
                }(e);
                break;

              case "string":
                !function(e) {
                    let t = function(e) {
                        let t = !0, r = e.length;
                        for (let n = 0; n < r; n++) if (e.charCodeAt(n) > 127) {
                            t = !1;
                            break;
                        }
                        let n = 0, y = new Uint8Array(e.length * (t ? 1 : 4));
                        for (let t = 0; t !== r; t++) {
                            let p = e.charCodeAt(t);
                            if (p < 128) y[n++] = p; else {
                                if (p < 2048) y[n++] = p >> 6 | 192; else {
                                    if (p > 55295 && p < 56320) {
                                        if (++t >= r) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                        let h = e.charCodeAt(t);
                                        if (h < 56320 || h > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + h.toString(16) + " at index " + t + " out of range");
                                        p = 65536 + ((1023 & p) << 10) + (1023 & h), y[n++] = p >> 18 | 240, y[n++] = p >> 12 & 63 | 128;
                                    } else y[n++] = p >> 12 | 224;
                                    y[n++] = p >> 6 & 63 | 128;
                                }
                                y[n++] = 63 & p | 128;
                            }
                        }
                        return t ? y : y.subarray(0, n);
                    }(e), r = t.length;
                    r <= 31 ? s(160 + r) : c(r <= 255 ? [ 217, r ] : r <= 65535 ? [ 218, r >>> 8, r ] : [ 219, r >>> 24, r >>> 16, r >>> 8, r ]), 
                    c(t);
                }(e);
                break;

              case "object":
                null === e ? o() : e instanceof Date ? function(e) {
                    let r = e.getTime() / 1e3;
                    if (0 === e.getMilliseconds() && r >= 0 && r < 4294967296) c([ 214, 255, r >>> 24, r >>> 16, r >>> 8, r ]); else if (r >= 0 && r < 17179869184) {
                        let n = 1e6 * e.getMilliseconds();
                        c([ 215, 255, n >>> 22, n >>> 14, n >>> 6, n << 2 >>> 0 | r / t, r >>> 24, r >>> 16, r >>> 8, r ]);
                    } else {
                        let t = 1e6 * e.getMilliseconds();
                        c([ 199, 12, 255, t >>> 24, t >>> 16, t >>> 8, t ]), u(r);
                    }
                }(e) : Array.isArray(e) ? f(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                    let t = e.length;
                    c(t <= 15 ? [ 196, t ] : t <= 65535 ? [ 197, t >>> 8, t ] : [ 198, t >>> 24, t >>> 16, t >>> 8, t ]), 
                    c(e);
                }(e) : e instanceof Int8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? f(e) : function(e) {
                    let t = 0;
                    for (let r in e) t++;
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
            for (let r = 0; r < t; r++) a(e[r]);
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
                let r = new Uint8Array(t);
                r.set(y), y = r;
            }
            y.set(e, p), p += e.length;
        }
        function u(e) {
            let r, n;
            e >= 0 ? (r = e / t, n = e % t) : (e++, r = Math.abs(e) / t, n = Math.abs(e) % t, 
            r = ~r, n = ~n), c([ r >>> 24, r >>> 16, r >>> 8, r, n >>> 24, n >>> 16, n >>> 8, n ]);
        }
    };
    const r = function() {
        function Alliance(e, t) {
            this.Leader = e, this.Name = t;
        }
        return Alliance.prototype.setAliancePlayers = function(e) {
            this.Members = e;
        }, Alliance;
    }();
    const n = function Player(e) {
        this.sid = e;
    };
    const y = function setInitData(e) {
        for (var t = e.teams, y = 0; y < t.length; y++) {
            var p = t[y], h = p.sid, g = p.owner, b = new r(new n(g), h);
            _.teams.push(b);
        }
    };
    const p = function setupGame(e) {
        _.myPlayer = {}, _.myPlayer.sid = e;
    };
    const h = function addPlayer(e, t) {
        var r = _.GamePlayerManager.getPlayerBySid(e[1]);
        r || ((r = new n(e[1])).name = e[2], r.id = e[0], _.GamePlayerManager.addPlayer(r)), 
        _.debug("Player " + r.name + " has joined the game."), t && console.log("You are now in game!");
    };
    const g = function removePlayer(e) {
        _.GamePlayerManager.removePlayerById(e), _.debug("Player " + e + " has left the game.");
    };
    const b = function chunk(e, t) {
        for (var r = [], n = 0; n < e.length; n += t) r.push(e.slice(n, n + t));
        return r;
    };
    const m = function updatePlayers(e) {
        var t = b(e, 13);
        _.ActivePlayerManager.clearPlayers(), t.forEach((function(e) {
            var t = _.GamePlayerManager.getPlayerBySid(e[0]);
            t || (t = new n(e[0])), t.sid = e[0], t.x = e[1], t.y = e[2], t.dir = e[3], t.buildIndex = e[4], 
            t.weaponIndex = e[5], t.weaponVariant = e[6], t.team = e[7], t.isLeader = e[8], 
            t.skinIndex = e[9], t.tailIndex = e[10], t.iconIndex = e[11], t.zIndex = e[12], 
            _.ActivePlayerManager.addPlayer(t), t.sid === _.myPlayer.sid && (_.myPlayer = t);
        }));
    };
    const P = function updateLeaderboard(e) {
        _.LeaderboardManager.updateLeaderboard(e);
    };
    const v = function GameObject(e) {
        this.sid = e;
    };
    const M = function loadGameObject(e) {
        b(e, 8).forEach((function(e) {
            var t = _.GameObjectManager.getGameObjectBySid(e[0]);
            t || (t = new v(e[0])), t.x = e[1], t.y = e[2], t.ownerSid = e[3], t.type = e[4], 
            t.sid = e[0], t.dir = e[5], t.scale = e[6], t.idk = e[7], _.GameObjectManager.addObject(t);
        }));
    };
    const j = function killObject(e) {
        _.GameObjectManager.removeObjectBySid(e);
    };
    const O = function killObjects(e) {
        _.GameObjectManager.removeObjectsByOwnerSid(e);
    };
    var k = !1;
    const A = function() {
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
    const E = function() {
        function Leaderboardmanager() {
            this.leaderboard = new Map;
        }
        return Leaderboardmanager.prototype.updateLeaderboard = function(e) {
            var t = this, r = b(e, 3);
            e.length;
            r.forEach((function(e, r) {
                var y = _.GamePlayerManager.getPlayerBySid(e[0]);
                y || ((y = new n(e[0])).sid = e[0], y.name = e[1], _.GamePlayerManager.addPlayer(y)), 
                t.leaderboard.set(r + 1, {
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
    const S = function() {
        function ObjectManager() {
            this.objects = new Map;
        }
        return ObjectManager.prototype.addObject = function(e) {
            var t = _.GameObjectManager.getGameObjectBySid(e.sid);
            t || (t = new v(e.sid)), t.x = e.x, t.y = e.y, t.ownerSid = e.ownerSid, t.type = e.type, 
            t.sid = e.sid, this.objects.set(e.sid, t);
        }, ObjectManager.prototype.getGameObjectBySid = function(e) {
            return this.objects.get(e);
        }, ObjectManager.prototype.getObjectsByOwnerSid = function(e) {
            var t = [];
            return this.objects.forEach((function(r) {
                r.ownerSid == e && t.push(r);
            })), t;
        }, ObjectManager.prototype.removeObjectBySid = function(e) {
            this.objects.delete(e);
        }, ObjectManager.prototype.removeObjectsByOwnerSid = function(e) {
            var t = this;
            this.objects.forEach((function(r) {
                r.ownerSid == e && t.objects.delete(r.sid);
            }));
        }, ObjectManager;
    }();
    var x, G = (x = function(e, t) {
        return x = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        }, x(e, t);
    }, function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function __() {
            this.constructor = e;
        }
        x(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, 
        new __);
    });
    const U = function(e) {
        function Game() {
            var t = e.call(this) || this;
            return t.teams = [], t.GamePlayerManager = new A, t.ActivePlayerManager = new A, 
            t.LeaderboardManager = new E, t.GameObjectManager = new S, t.vars = {}, t.msgpack = {}, 
            t.msgpack.decode = lib_decode, t.msgpack.encode = lib_encode, t;
        }
        return G(Game, e), Game.prototype.debug = function(e) {
            this.emit("debug", e);
        }, Game;
    }(t);
    !function hookWS() {
        WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
            apply: function(e, t, r) {
                return _.ws = t, _.sendPacket = function(e) {
                    var t = Array.prototype.slice.call(arguments, 1), r = lib_encode([ e, t ]);
                    _.ws.send(r);
                }, 1 !== _.ws.readyState || (k || (k = !0, _.ws.addEventListener("message", (function(e) {
                    var t = e.data, r = lib_decode(t);
                    !function handlePacket(e, t) {
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
                            p(t[0]);
                            break;

                          case "2":
                            h(t[0], t[1]);
                            break;

                          case "4":
                            g(t[0]);
                            break;

                          case "33":
                            m(t[0]);
                            break;

                          case "5":
                            P(t[0]);
                            break;

                          case "6":
                            M(t[0]);
                            break;

                          case "12":
                            j(t[0]);
                            break;

                          case "13":
                            O(t[0]);
                            break;

                          default:
                            console.log("Unknown packet: " + e);
                        }
                        _.emit("packet", {
                            packet: e,
                            data: t
                        });
                    }(r[0], r[1].slice(0));
                }))), Reflect.apply(e, t, r));
            }
        });
    }();
    var _ = new U;
    Object.defineProperty(Function.prototype, 69, {
        get: function() {
            return "MooMooJS_beta" === this.name ? _ : null;
        }
    });
})();