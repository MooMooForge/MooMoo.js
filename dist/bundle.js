(() => {
    "use strict";
    var __webpack_require__ = {};
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    var __webpack_exports__ = {};
    __webpack_require__.d(__webpack_exports__, {
        t: () => MooMoo
    });
    var EventEmitter = function() {
        function EventEmitter() {
            this._listeners = {};
        }
        EventEmitter.prototype.on = function(event, listener) {
            if (!this._listeners[event]) {
                this._listeners[event] = [];
            }
            this._listeners[event].push(listener);
        };
        EventEmitter.prototype.emit = function(event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this._listeners[event]) {
                this._listeners[event].forEach((function(listener) {
                    return listener.apply(void 0, args);
                }));
            }
        };
        EventEmitter.prototype.addEventListener = function(event, listener) {
            this.on(event, listener);
        };
        return EventEmitter;
    }();
    const funcs_EventEmitter = EventEmitter;
    const decode = function(r) {
        const e = 4294967296;
        let t = 0;
        if (r instanceof ArrayBuffer && (r = new Uint8Array(r)), "object" != typeof r || void 0 === r.length) throw new Error("Invalid argument type: Expected a byte array (Array or Uint8Array) to deserialize.");
        if (!r.length) throw new Error("Invalid argument: The byte array to deserialize is empty.");
        r instanceof Uint8Array || (r = new Uint8Array(r));
        let n = i();
        return r.length, n;
        function i() {
            const e = r[t++];
            if (e >= 0 && e <= 127) return e;
            if (e >= 128 && e <= 143) return l(e - 128);
            if (e >= 144 && e <= 159) return c(e - 144);
            if (e >= 160 && e <= 191) return d(e - 160);
            if (192 === e) return null;
            if (193 === e) throw new Error("Invalid byte code 0xc1 found.");
            if (194 === e) return !1;
            if (195 === e) return !0;
            if (196 === e) return a(-1, 1);
            if (197 === e) return a(-1, 2);
            if (198 === e) return a(-1, 4);
            if (199 === e) return w(-1, 1);
            if (200 === e) return w(-1, 2);
            if (201 === e) return w(-1, 4);
            if (202 === e) return u(4);
            if (203 === e) return u(8);
            if (204 === e) return o(1);
            if (205 === e) return o(2);
            if (206 === e) return o(4);
            if (207 === e) return o(8);
            if (208 === e) return f(1);
            if (209 === e) return f(2);
            if (210 === e) return f(4);
            if (211 === e) return f(8);
            if (212 === e) return w(1);
            if (213 === e) return w(2);
            if (214 === e) return w(4);
            if (215 === e) return w(8);
            if (216 === e) return w(16);
            if (217 === e) return d(-1, 1);
            if (218 === e) return d(-1, 2);
            if (219 === e) return d(-1, 4);
            if (220 === e) return c(-1, 2);
            if (221 === e) return c(-1, 4);
            if (222 === e) return l(-1, 2);
            if (223 === e) return l(-1, 4);
            if (e >= 224 && e <= 255) return e - 256;
            throw console.debug("msgpack array:", r), new Error("Invalid byte value '" + e + "' at index " + (t - 1) + " in the MessagePack binary data (length " + r.length + "): Expecting a range of 0 to 255. This is not a byte array.");
        }
        function f(e) {
            let n = 0, i = !0;
            for (;e-- > 0; ) if (i) {
                let e = r[t++];
                n += 127 & e, 128 & e && (n -= 128), i = !1;
            } else n *= 256, n += r[t++];
            return n;
        }
        function o(e) {
            let n = 0;
            for (;e-- > 0; ) n *= 256, n += r[t++];
            return n;
        }
        function u(e) {
            let n = new DataView(r.buffer, t, e);
            return t += e, 4 === e ? n.getFloat32(0, !1) : 8 === e ? n.getFloat64(0, !1) : void 0;
        }
        function a(e, n) {
            e < 0 && (e = o(n));
            let i = r.subarray(t, t + e);
            return t += e, i;
        }
        function l(r, e) {
            r < 0 && (r = o(e));
            let t = {};
            for (;r-- > 0; ) t[i()] = i();
            return t;
        }
        function c(r, e) {
            r < 0 && (r = o(e));
            let t = [];
            for (;r-- > 0; ) t.push(i());
            return t;
        }
        function d(e, n) {
            e < 0 && (e = o(n));
            let i = t;
            return t += e, function(r, e, t) {
                let n = e, i = "";
                for (t += e; n < t; ) {
                    let e = r[n++];
                    if (e > 127) if (e > 191 && e < 224) {
                        if (n >= t) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                        e = (31 & e) << 6 | 63 & r[n++];
                    } else if (e > 223 && e < 240) {
                        if (n + 1 >= t) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                        e = (15 & e) << 12 | (63 & r[n++]) << 6 | 63 & r[n++];
                    } else {
                        if (!(e > 239 && e < 248)) throw new Error("UTF-8 decode: unknown multibyte start 0x" + e.toString(16) + " at index " + (n - 1));
                        if (n + 2 >= t) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                        e = (7 & e) << 18 | (63 & r[n++]) << 12 | (63 & r[n++]) << 6 | 63 & r[n++];
                    }
                    if (e <= 65535) i += String.fromCharCode(e); else {
                        if (!(e <= 1114111)) throw new Error("UTF-8 decode: code point 0x" + e.toString(16) + " exceeds UTF-16 reach");
                        e -= 65536, i += String.fromCharCode(e >> 10 | 55296), i += String.fromCharCode(1023 & e | 56320);
                    }
                }
                return i;
            }(r, i, e);
        }
        function w(r, n) {
            r < 0 && (r = o(n));
            let i = o(1), u = a(r);
            return 255 === i ? function(r) {
                if (4 === r.length) {
                    let e = (r[0] << 24 >>> 0) + (r[1] << 16 >>> 0) + (r[2] << 8 >>> 0) + r[3];
                    return new Date(1e3 * e);
                }
                if (8 === r.length) {
                    let t = (r[0] << 22 >>> 0) + (r[1] << 14 >>> 0) + (r[2] << 6 >>> 0) + (r[3] >>> 2), n = (3 & r[3]) * e + (r[4] << 24 >>> 0) + (r[5] << 16 >>> 0) + (r[6] << 8 >>> 0) + r[7];
                    return new Date(1e3 * n + t / 1e6);
                }
                if (12 === r.length) {
                    let e = (r[0] << 24 >>> 0) + (r[1] << 16 >>> 0) + (r[2] << 8 >>> 0) + r[3];
                    t -= 8;
                    let n = f(8);
                    return new Date(1e3 * n + e / 1e6);
                }
                throw new Error("Invalid data length for a date value.");
            }(u) : {
                type: i,
                data: u
            };
        }
    };
    const msgpack_decode = decode;
    const encode = function(e) {
        const t = 4294967296;
        let n, r, i = new Uint8Array(128), l = 0;
        return a(e), i.subarray(0, l);
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
                        let r = 0, i = new Uint8Array(e.length * (t ? 1 : 4));
                        for (let t = 0; t !== n; t++) {
                            let l = e.charCodeAt(t);
                            if (l < 128) i[r++] = l; else {
                                if (l < 2048) i[r++] = l >> 6 | 192; else {
                                    if (l > 55295 && l < 56320) {
                                        if (++t >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                        let a = e.charCodeAt(t);
                                        if (a < 56320 || a > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + a.toString(16) + " at index " + t + " out of range");
                                        l = 65536 + ((1023 & l) << 10) + (1023 & a), i[r++] = l >> 18 | 240, i[r++] = l >> 12 & 63 | 128;
                                    } else i[r++] = l >> 12 | 224;
                                    i[r++] = l >> 6 & 63 | 128;
                                }
                                i[r++] = 63 & l | 128;
                            }
                        }
                        return t ? i : i.subarray(0, r);
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
            if (i.length < l + 1) {
                let e = 2 * i.length;
                for (;e < l + 1; ) e *= 2;
                let t = new Uint8Array(e);
                t.set(i), i = t;
            }
            i[l] = e, l++;
        }
        function c(e) {
            if (i.length < l + e.length) {
                let t = 2 * i.length;
                for (;t < l + e.length; ) t *= 2;
                let n = new Uint8Array(t);
                n.set(i), i = n;
            }
            i.set(e, l), l += e.length;
        }
        function u(e) {
            let n, r;
            e >= 0 ? (n = e / t, r = e % t) : (e++, n = Math.abs(e) / t, r = Math.abs(e) % t, 
            n = ~n, r = ~r), c([ n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r ]);
        }
    };
    const msgpack_encode = encode;
    var Alliance = function() {
        function Alliance(leader, name) {
            this.Leader = leader;
            this.Name = name;
        }
        Alliance.prototype.setAliancePlayers = function(players) {
            this.Members = players;
        };
        return Alliance;
    }();
    const types_Alliance = Alliance;
    var Player = function() {
        function Player(sid) {
            this.sid = sid;
            this.resources = {
                wood: 0,
                stone: 0,
                food: 0,
                points: 0,
                kills: 0
            };
        }
        return Player;
    }();
    const types_Player = Player;
    function setInitData(raw) {
        var data = raw[0];
        var teams = data.teams;
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            var name_1 = team.sid;
            var owner = team.owner;
            var alliance = new types_Alliance(new types_Player(owner), name_1);
            MooMoo.teams.push(alliance);
        }
    }
    const server_setInitData = setInitData;
    function place(id, angle) {
        var weapon = MooMoo.myPlayer.weaponIndex;
        MooMoo.sendPacket("5", id, angle);
        MooMoo.sendPacket("c", 1, angle);
        MooMoo.sendPacket("c", 0, angle);
        MooMoo.sendPacket("5", weapon, true);
    }
    const features_place = place;
    function chat(message) {
        MooMoo.sendPacket("ch", message);
    }
    const features_chat = chat;
    var hats = [ {
        id: 45,
        name: "Shame!",
        dontSell: true,
        price: 0,
        scale: 120,
        desc: "hacks are for losers"
    }, {
        id: 51,
        name: "Moo Cap",
        price: 0,
        scale: 120,
        desc: "coolest mooer around"
    }, {
        id: 50,
        name: "Apple Cap",
        price: 0,
        scale: 120,
        desc: "apple farms remembers"
    }, {
        id: 28,
        name: "Moo Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 29,
        name: "Pig Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 30,
        name: "Fluff Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 36,
        name: "Pandou Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 37,
        name: "Bear Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 38,
        name: "Monkey Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 44,
        name: "Polar Head",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 35,
        name: "Fez Hat",
        price: 0,
        scale: 120,
        desc: "no effect"
    }, {
        id: 42,
        name: "Enigma Hat",
        price: 0,
        scale: 120,
        desc: "join the enigma army"
    }, {
        id: 43,
        name: "Blitz Hat",
        price: 0,
        scale: 120,
        desc: "hey everybody i'm blitz"
    }, {
        id: 49,
        name: "Bob XIII Hat",
        price: 0,
        scale: 120,
        desc: "like and subscribe"
    }, {
        id: 57,
        name: "Pumpkin",
        price: 50,
        scale: 120,
        desc: "Spooooky"
    }, {
        id: 8,
        name: "Bummle Hat",
        price: 100,
        scale: 120,
        desc: "no effect"
    }, {
        id: 2,
        name: "Straw Hat",
        price: 500,
        scale: 120,
        desc: "no effect"
    }, {
        id: 15,
        name: "Winter Cap",
        price: 600,
        scale: 120,
        desc: "allows you to move at normal speed in snow",
        coldM: 1
    }, {
        id: 5,
        name: "Cowboy Hat",
        price: 1e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 4,
        name: "Ranger Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 18,
        name: "Explorer Hat",
        price: 2e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 31,
        name: "Flipper Hat",
        price: 2500,
        scale: 120,
        desc: "have more control while in water",
        watrImm: true
    }, {
        id: 1,
        name: "Marksman Cap",
        price: 3e3,
        scale: 120,
        desc: "increases arrow speed and range",
        aMlt: 1.3
    }, {
        id: 10,
        name: "Bush Gear",
        price: 3e3,
        scale: 160,
        desc: "allows you to disguise yourself as a bush"
    }, {
        id: 48,
        name: "Halo",
        price: 3e3,
        scale: 120,
        desc: "no effect"
    }, {
        id: 6,
        name: "Soldier Helmet",
        price: 4e3,
        scale: 120,
        desc: "reduces damage taken but slows movement",
        spdMult: .94,
        dmgMult: .75
    }, {
        id: 23,
        name: "Anti Venom Gear",
        price: 4e3,
        scale: 120,
        desc: "makes you immune to poison",
        poisonRes: 1
    }, {
        id: 13,
        name: "Medic Gear",
        price: 5e3,
        scale: 110,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 9,
        name: "Miners Helmet",
        price: 5e3,
        scale: 120,
        desc: "earn 1 extra gold per resource",
        extraGold: 1
    }, {
        id: 32,
        name: "Musketeer Hat",
        price: 5e3,
        scale: 120,
        desc: "reduces cost of projectiles",
        projCost: .5
    }, {
        id: 7,
        name: "Bull Helmet",
        price: 6e3,
        scale: 120,
        desc: "increases damage done but drains health",
        healthRegen: -5,
        dmgMultO: 1.5,
        spdMult: .96
    }, {
        id: 22,
        name: "Emp Helmet",
        price: 6e3,
        scale: 120,
        desc: "turrets won't attack but you move slower",
        antiTurret: 1,
        spdMult: .7
    }, {
        id: 12,
        name: "Booster Hat",
        price: 6e3,
        scale: 120,
        desc: "increases your movement speed",
        spdMult: 1.16
    }, {
        id: 26,
        name: "Barbarian Armor",
        price: 8e3,
        scale: 120,
        desc: "knocks back enemies that attack you",
        dmgK: .6
    }, {
        id: 21,
        name: "Plague Mask",
        price: 1e4,
        scale: 120,
        desc: "melee attacks deal poison damage",
        poisonDmg: 5,
        poisonTime: 6
    }, {
        id: 46,
        name: "Bull Mask",
        price: 1e4,
        scale: 120,
        desc: "bulls won't target you unless you attack them",
        bullRepel: 1
    }, {
        id: 14,
        name: "Windmill Hat",
        topSprite: true,
        price: 1e4,
        scale: 120,
        desc: "generates points while worn",
        pps: 1.5
    }, {
        id: 11,
        name: "Spike Gear",
        topSprite: true,
        price: 1e4,
        scale: 120,
        desc: "deal damage to players that damage you",
        dmg: .45
    }, {
        id: 53,
        name: "Turret Gear",
        topSprite: true,
        price: 1e4,
        scale: 120,
        desc: "you become a walking turret",
        turret: {
            proj: 1,
            range: 700,
            rate: 2500
        },
        spdMult: .7
    }, {
        id: 20,
        name: "Samurai Armor",
        price: 12e3,
        scale: 120,
        desc: "increased attack speed and fire rate",
        atkSpd: .78
    }, {
        id: 58,
        name: "Dark Knight",
        price: 12e3,
        scale: 120,
        desc: "restores health when you deal damage",
        healD: .4
    }, {
        id: 27,
        name: "Scavenger Gear",
        price: 15e3,
        scale: 120,
        desc: "earn double points for each kill",
        kScrM: 2
    }, {
        id: 40,
        name: "Tank Gear",
        price: 15e3,
        scale: 120,
        desc: "increased damage to buildings but slower movement",
        spdMult: .3,
        bDmg: 3.3
    }, {
        id: 52,
        name: "Thief Gear",
        price: 15e3,
        scale: 120,
        desc: "steal half of a players gold when you kill them",
        goldSteal: .5
    }, {
        id: 55,
        name: "Bloodthirster",
        price: 2e4,
        scale: 120,
        desc: "Restore Health when dealing damage. And increased damage",
        healD: .25,
        dmgMultO: 1.2
    }, {
        id: 56,
        name: "Assassin Gear",
        price: 2e4,
        scale: 120,
        desc: "Go invisible when not moving. Can't eat. Increased speed",
        noEat: true,
        spdMult: 1.1,
        invisTimer: 1e3
    } ];
    const storage_hats = hats;
    function equipHatById(id) {
        var hatexists = false;
        storage_hats.find((function(hat) {
            if (hat.id == id) {
                hatexists = true;
                MooMoo.sendPacket("13c", 0, id, 0);
            }
        }));
        if (!hatexists) {
            try {
                throw new Error("Error at equipHatById: Hat with id " + id + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function equipHatByName(name) {
        var hatexists = false;
        storage_hats.find((function(hat) {
            if (hat.name == name) {
                hatexists = true;
                MooMoo.sendPacket("13c", 0, hat.id, 0);
            }
        }));
        if (!hatexists) {
            try {
                throw new Error("Error at equipHatByName: Hat with name " + name + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function equipHat(hatData) {
        if (typeof hatData == "number") {
            equipHatById(hatData);
        } else if (typeof hatData == "string") {
            equipHatByName(hatData);
        } else {
            try {
                throw new Error("Error at equipHat: hatData must be a number or string");
            } catch (e) {
                console.log(e);
            }
        }
    }
    const features_equipHat = equipHat;
    var accessories = [ {
        id: 12,
        name: "Snowball",
        price: 1e3,
        scale: 105,
        xOff: 18,
        desc: "no effect"
    }, {
        id: 9,
        name: "Tree Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 10,
        name: "Stone Cape",
        price: 1e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 3,
        name: "Cookie Cape",
        price: 1500,
        scale: 90,
        desc: "no effect"
    }, {
        id: 8,
        name: "Cow Cape",
        price: 2e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 11,
        name: "Monkey Tail",
        price: 2e3,
        scale: 97,
        xOff: 25,
        desc: "Super speed but reduced damage",
        spdMult: 1.35,
        dmgMultO: .2
    }, {
        id: 17,
        name: "Apple Basket",
        price: 3e3,
        scale: 80,
        xOff: 12,
        desc: "slowly regenerates health over time",
        healthRegen: 1
    }, {
        id: 6,
        name: "Winter Cape",
        price: 3e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 4,
        name: "Skull Cape",
        price: 4e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 5,
        name: "Dash Cape",
        price: 5e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 2,
        name: "Dragon Cape",
        price: 6e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 1,
        name: "Super Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 7,
        name: "Troll Cape",
        price: 8e3,
        scale: 90,
        desc: "no effect"
    }, {
        id: 14,
        name: "Thorns",
        price: 1e4,
        scale: 115,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 15,
        name: "Blockades",
        price: 1e4,
        scale: 95,
        xOff: 15,
        desc: "no effect"
    }, {
        id: 20,
        name: "Devils Tail",
        price: 1e4,
        scale: 95,
        xOff: 20,
        desc: "no effect"
    }, {
        id: 16,
        name: "Sawblade",
        price: 12e3,
        scale: 90,
        spin: true,
        xOff: 0,
        desc: "deal damage to players that damage you",
        dmg: .15
    }, {
        id: 13,
        name: "Angel Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "slowly regenerates health over time",
        healthRegen: 3
    }, {
        id: 19,
        name: "Shadow Wings",
        price: 15e3,
        scale: 138,
        xOff: 22,
        desc: "increased movement speed",
        spdMult: 1.1
    }, {
        id: 18,
        name: "Blood Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "restores health when you deal damage",
        healD: .2
    }, {
        id: 21,
        name: "Corrupt X Wings",
        price: 2e4,
        scale: 178,
        xOff: 26,
        desc: "deal damage to players that damage you",
        dmg: .25
    } ];
    const storage_accessories = accessories;
    function equipAccessoryById(id) {
        var accessoryexists = false;
        storage_accessories.find((function(accessory) {
            if (accessory.id == id) {
                accessoryexists = true;
                MooMoo.sendPacket("13c", 0, id, 1);
            }
        }));
        if (!accessoryexists) {
            try {
                throw new Error("Error at equipAccessoryById: Accessory with id " + id + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function equipAccessoryByName(name) {
        var accessoryexists = false;
        storage_accessories.find((function(accessory) {
            if (accessory.name == name) {
                accessoryexists = true;
                MooMoo.sendPacket("13c", 0, accessory.id, 1);
            }
        }));
        if (!accessoryexists) {
            try {
                throw new Error("Error at equipAccessoryByName: Accessory with name " + name + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function equipAccessory(accessoryData) {
        if (typeof accessoryData == "number") {
            equipAccessoryById(accessoryData);
        } else if (typeof accessoryData == "string") {
            equipAccessoryByName(accessoryData);
        } else {
            try {
                throw new Error("Error at equipAccessory: accessoryData must be a number or string");
            } catch (e) {
                console.log(e);
            }
        }
    }
    const features_equipAccessory = equipAccessory;
    function unequipHat() {
        MooMoo.sendPacket("13c", 0, 0, 0);
    }
    const features_unequipHat = unequipHat;
    function unequipAccessory() {
        MooMoo.sendPacket("13c", 0, 0, 1);
    }
    const features_unequipAccessory = unequipAccessory;
    function buyHatById(id) {
        var hatexists = false;
        storage_hats.find((function(hat) {
            if (hat.id == id) {
                hatexists = true;
                MooMoo.sendPacket("13c", 1, id, 0);
            }
        }));
        if (!hatexists) {
            try {
                throw new Error("Error at buyHatById: Hat with id " + id + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function buyHatByName(name) {
        var hatexists = false;
        storage_hats.find((function(hat) {
            if (hat.name == name) {
                hatexists = true;
                MooMoo.sendPacket("13c", 1, hat.id, 0);
            }
        }));
        if (!hatexists) {
            try {
                throw new Error("Error at buyHatByName: Hat with name " + name + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function buyHat(hatData) {
        if (typeof hatData == "number") {
            buyHatById(hatData);
        } else if (typeof hatData == "string") {
            buyHatByName(hatData);
        } else {
            try {
                throw new Error("Error at buyHat: hatData must be a number or string");
            } catch (e) {
                console.log(e);
            }
        }
    }
    const features_buyHat = buyHat;
    function buyAccessory_equipAccessoryById(id) {
        var accessoryexists = false;
        storage_accessories.find((function(accessory) {
            if (accessory.id == id) {
                accessoryexists = true;
                MooMoo.sendPacket("13c", 1, id, 1);
            }
        }));
        if (!accessoryexists) {
            try {
                throw new Error("Error at equipAccessoryById: Accessory with id " + id + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function buyAccessory_equipAccessoryByName(name) {
        var accessoryexists = false;
        storage_accessories.find((function(accessory) {
            if (accessory.name == name) {
                accessoryexists = true;
                MooMoo.sendPacket("13c", 1, accessory.id, 1);
            }
        }));
        if (!accessoryexists) {
            try {
                throw new Error("Error at equipAccessoryByName: Accessory with name " + name + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }
    }
    function buyAccessory_equipAccessory(accessoryData) {
        if (typeof accessoryData == "number") {
            buyAccessory_equipAccessoryById(accessoryData);
        } else if (typeof accessoryData == "string") {
            buyAccessory_equipAccessoryByName(accessoryData);
        } else {
            try {
                throw new Error("Error at equipAccessory: accessoryData must be a number or string");
            } catch (e) {
                console.log(e);
            }
        }
    }
    const buyAccessory = buyAccessory_equipAccessory;
    function setupGame(data) {
        var sid = data[0];
        MooMoo.myPlayer = {};
        MooMoo.myPlayer.sid = sid;
        MooMoo.myPlayer.place = features_place;
        MooMoo.myPlayer.chat = features_chat;
        MooMoo.myPlayer.equipHat = features_equipHat;
        MooMoo.myPlayer.equipAccessory = features_equipAccessory;
        MooMoo.myPlayer.unequipHat = features_unequipHat;
        MooMoo.myPlayer.unequipAccessory = features_unequipAccessory;
        MooMoo.myPlayer.buyHat = features_buyHat;
        MooMoo.myPlayer.buyAccessory = buyAccessory;
        MooMoo.vars.gameLoaded = true;
        if (MooMoo.onGameLoad) MooMoo.onGameLoad();
        MooMoo.emit("gameLoad");
        MooMoo.emit("setupGame", data);
        MooMoo.emit("setupgame", data);
        MooMoo.emit("1", data);
    }
    const server_setupGame = setupGame;
    function addPlayer(dta) {
        var data = dta[0];
        var isYou = dta[1];
        var tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(data[1]);
        if (!tmpPlayer) {
            tmpPlayer = new types_Player(data[1]);
            tmpPlayer.name = data[2];
            tmpPlayer.id = data[0];
            MooMoo.GamePlayerManager.addPlayer(tmpPlayer);
        }
        MooMoo.debug("Player " + tmpPlayer.name + " has joined the game.");
        if (isYou) {
            console.log("You are now in game!");
        }
        MooMoo.emit("addPlayer", dta);
        MooMoo.emit("addplayer", dta);
        MooMoo.emit("2", dta);
    }
    const server_addPlayer = addPlayer;
    function removePlayer(data) {
        var id = data[0];
        MooMoo.GamePlayerManager.removePlayerById(id);
        MooMoo.debug("Player " + id + " has left the game.");
        MooMoo.emit("removePlayer", data);
        MooMoo.emit("removeplayer", data);
        MooMoo.emit("4", data);
    }
    const server_removePlayer = removePlayer;
    function chunk(arr, size) {
        var chunks = [];
        for (var i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
    const funcs_chunk = chunk;
    function cacheItems() {
        MooMoo.myPlayer.inventory = {};
        var inventoryCategories = [ {
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
            subtract: true
        }, {
            category: "wall",
            start: 19,
            end: 22,
            subtract: true
        }, {
            category: "spike",
            start: 22,
            end: 26,
            subtract: true
        }, {
            category: "mill",
            start: 26,
            end: 29,
            subtract: true
        }, {
            category: "mine",
            start: 29,
            end: 31,
            subtract: true
        }, {
            category: "boostPad",
            start: 31,
            end: 33,
            subtract: true
        }, {
            category: "trap",
            start: 31,
            end: 33,
            subtract: true
        }, {
            category: "turret",
            start: 33,
            end: 36,
            subtract: true
        }, {
            category: "spawnPad",
            start: 36,
            end: 37,
            subtract: true
        } ];
        for (var i = 0; i < inventoryCategories.length; i++) {
            var _a = inventoryCategories[i], category = _a.category, start = _a.start, end = _a.end, subtract = _a.subtract;
            for (var j = start; j < end; j++) {
                var element = document.getElementById("actionBarItem".concat(j));
                if (element && element.offsetParent !== null) {
                    MooMoo.myPlayer.inventory[category] = subtract ? j - 16 : j;
                    break;
                }
            }
        }
    }
    const funcs_cacheItems = cacheItems;
    var GameObject = function() {
        function GameObject(sid) {
            this.sid = sid;
        }
        return GameObject;
    }();
    const types_GameObject = GameObject;
    function updatePlayers(raw) {
        var data = raw[0];
        var arr = funcs_chunk(data, 13);
        MooMoo.ActivePlayerManager.clearPlayers();
        arr.forEach((function(playerData) {
            var tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(playerData[0]);
            if (!tmpPlayer) {
                tmpPlayer = new types_Player(playerData[0]);
                tmpPlayer.x = playerData[1];
                tmpPlayer.y = playerData[2];
            }
            tmpPlayer.sid = playerData[0];
            tmpPlayer.dir = playerData[3];
            tmpPlayer.buildIndex = playerData[4];
            tmpPlayer.weaponIndex = playerData[5];
            tmpPlayer.weaponVariant = playerData[6];
            tmpPlayer.team = playerData[7];
            tmpPlayer.isLeader = playerData[8];
            tmpPlayer.skinIndex = playerData[9];
            tmpPlayer.tailIndex = playerData[10];
            tmpPlayer.iconIndex = playerData[11];
            tmpPlayer.zIndex = playerData[12];
            MooMoo.ActivePlayerManager.addPlayer(tmpPlayer);
            if (tmpPlayer.sid === MooMoo.myPlayer.sid) {
                Object.assign(MooMoo.myPlayer, tmpPlayer);
            }
        }));
        MooMoo.emit("updatePlayers", data);
        MooMoo.emit("updateplayers", data);
        MooMoo.emit("33", data);
        funcs_cacheItems();
    }
    function updateHookPosition(data) {
        if (this instanceof types_Player || this instanceof types_GameObject || this.isAI || !this.id) {} else {
            var tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(this.sid);
            if (tmpPlayer) {
                tmpPlayer.x = data;
                tmpPlayer.y = this.y;
                if (MooMoo.onPositionUpdate) {
                    MooMoo.onPositionUpdate(tmpPlayer);
                }
            }
            MooMoo.GamePlayerManager.updatePlayer(this.sid, this);
        }
    }
    const server_updatePlayers = updatePlayers;
    function updateLeaderboard(data) {
        var leaderboarddata = data[0];
        MooMoo.LeaderboardManager.updateLeaderboard(leaderboarddata);
        MooMoo.emit("updateLeaderboard", data);
        MooMoo.emit("updateleaderboard", data);
        MooMoo.emit("5", data);
    }
    const server_updateLeaderboard = updateLeaderboard;
    function loadGameObject(raw) {
        var data = raw[0];
        var arr = funcs_chunk(data, 8);
        arr.forEach((function(obj) {
            var tmpObj = MooMoo.GameObjectManager.getGameObjectBySid(obj[0]);
            if (!tmpObj) {
                tmpObj = new types_GameObject(obj[0]);
            }
            tmpObj.sid = obj[0];
            tmpObj.x = obj[1];
            tmpObj.y = obj[2];
            tmpObj.dir = obj[3];
            tmpObj.scale = obj[4];
            tmpObj.type = obj[5];
            tmpObj.id = obj[6];
            tmpObj.ownerSid = obj[7];
            MooMoo.GameObjectManager.addObject(tmpObj);
        }));
        MooMoo.emit("loadGameObject", raw);
        MooMoo.emit("loadgameobject", raw);
        MooMoo.emit("6", raw);
    }
    const server_loadGameObject = loadGameObject;
    function killObject(data) {
        var sid = data[0];
        MooMoo.GameObjectManager.removeObjectBySid(sid);
        MooMoo.emit("killObject", data);
        MooMoo.emit("killobject", data);
        MooMoo.emit("12", sid);
    }
    const server_killObject = killObject;
    function killObjects(data) {
        var ownerSid = data[0];
        MooMoo.GameObjectManager.removeObjectsByOwnerSid(ownerSid);
        MooMoo.emit("killObjects", data);
        MooMoo.emit("killobjects", data);
        MooMoo.emit("13", data);
    }
    const server_killObjects = killObjects;
    function updateHealth(data) {
        var sid = data[0];
        var value = data[1];
        var tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(sid);
        if (tmpPlayer) {
            tmpPlayer.health = value;
        }
        MooMoo.emit("updateHealth", data);
        MooMoo.emit("updatehealth", data);
        MooMoo.emit("h", data);
    }
    const server_updateHealth = updateHealth;
    function updatePlayerValue(data) {
        var id = data[0];
        var value = data[1];
        var player = MooMoo.myPlayer.resources;
        player[id] = value;
        MooMoo.myPlayer.resources = player;
        MooMoo.emit("updatePlayerValue", data);
        MooMoo.emit("updateplayervalue", data);
        MooMoo.emit("9", data);
    }
    const server_updatePlayerValue = updatePlayerValue;
    function loadAI(data) {
        if (data) {
            var animals = funcs_chunk(data, 7);
            MooMoo.emit("loadAI", data);
            MooMoo.emit("loadAi", data);
            MooMoo.emit("loadaI", data);
            MooMoo.emit("a", data);
        }
    }
    const server_loadAI = loadAI;
    function animeAI(data) {
        var sid = data[0];
        MooMoo.emit("animateAI", data);
        MooMoo.emit("animateAi", data);
        MooMoo.emit("animateai", data);
        MooMoo.emit("aa", sid);
    }
    const animateAI = animeAI;
    function gatherAnimation(data) {
        MooMoo.emit("gatherAnimation", data);
        MooMoo.emit("gatheranimation", data);
    }
    const server_gatherAnimation = gatherAnimation;
    function disconnect() {
        MooMoo.emit("disconnect", MooMoo.ws);
    }
    const server_disconnect = disconnect;
    function wiggleGameObject(data) {
        MooMoo.emit("wiggleGameObject", data);
        MooMoo.emit("wigglegameobject", data);
        MooMoo.emit("8", data);
    }
    const server_wiggleGameObject = wiggleGameObject;
    function shootTurret(data) {
        MooMoo.emit("shootTurret", data);
        MooMoo.emit("shootturret", data);
        MooMoo.emit("sp", data);
    }
    const server_shootTurret = shootTurret;
    function killPlayer(data) {
        MooMoo.emit("killPlayer", data);
        MooMoo.emit("killplayer", data);
        MooMoo.emit("11", data);
    }
    const server_killPlayer = killPlayer;
    function updateItemCounts(data) {
        MooMoo.emit("updateItemCounts", data);
        MooMoo.emit("updateitemcounts", data);
        MooMoo.emit("14", data);
    }
    const server_updateItemCounts = updateItemCounts;
    function updateAge(data) {
        MooMoo.emit("updateAge", data);
        MooMoo.emit("updateage", data);
        MooMoo.emit("15", data);
    }
    const server_updateAge = updateAge;
    function updateUpgrades(data) {
        MooMoo.emit("updateUpgrades", data);
        MooMoo.emit("updateupgrades", data);
        MooMoo.emit("16", data);
    }
    const server_updateUpgrades = updateUpgrades;
    function updateItems(data) {
        MooMoo.emit("updateItems", data);
        MooMoo.emit("updateitems", data);
        MooMoo.emit("17", data);
    }
    const server_updateItems = updateItems;
    function addProjectile(data) {
        MooMoo.emit("addProjectile", data);
        MooMoo.emit("addprojectile", data);
        MooMoo.emit("18", data);
    }
    const server_addProjectile = addProjectile;
    function remProjectile(data) {
        MooMoo.emit("remProjectile", data);
        MooMoo.emit("remprojectile", data);
        MooMoo.emit("19", data);
    }
    const server_remProjectile = remProjectile;
    function serverShutdownNotice(data) {
        MooMoo.emit("serverShutdownNotice", data);
        MooMoo.emit("servershutdownnotice", data);
        MooMoo.emit("20", data);
    }
    const server_serverShutdownNotice = serverShutdownNotice;
    function addAlliance(data) {
        MooMoo.emit("addAlliance", data);
        MooMoo.emit("addalliance", data);
        MooMoo.emit("ac", data);
    }
    const server_addAlliance = addAlliance;
    function deleteAlliance(data) {
        MooMoo.emit("deleteAlliance", data);
        MooMoo.emit("deletealliance", data);
    }
    const server_deleteAlliance = deleteAlliance;
    function allianceNotification(data) {
        MooMoo.emit("allianceNotification", data);
        MooMoo.emit("alliancenotification", data);
        MooMoo.emit("an", data);
    }
    const server_allianceNotification = allianceNotification;
    function setPlayerTeam(data) {
        MooMoo.emit("setPlayerTeam", data);
        MooMoo.emit("setplayerteam", data);
        MooMoo.emit("st", data);
    }
    const server_setPlayerTeam = setPlayerTeam;
    function setAlliancePlayers(data) {
        MooMoo.emit("setAlliancePlayers", data);
        MooMoo.emit("setallianceplayers", data);
        MooMoo.emit("sa", data);
    }
    const server_setAlliancePlayers = setAlliancePlayers;
    function updateStoreItems(data) {
        MooMoo.emit("updateStoreItems", data);
        MooMoo.emit("updatestoreitems", data);
        MooMoo.emit("us", data);
    }
    const server_updateStoreItems = updateStoreItems;
    function receiveChat(data) {
        MooMoo.emit("receiveChat", data);
        MooMoo.emit("receivechat", data);
        MooMoo.emit("ch", data);
    }
    const server_receiveChat = receiveChat;
    function updateMinimap(data) {
        MooMoo.emit("updateMinimap", data);
        MooMoo.emit("updateminimap", data);
        MooMoo.emit("mm", data);
    }
    const server_updateMinimap = updateMinimap;
    function showText(data) {
        MooMoo.emit("showText", data);
        MooMoo.emit("showtext", data);
        MooMoo.emit("t", data);
    }
    const server_showText = showText;
    function pingMap(data) {
        MooMoo.emit("pingMap", data);
        MooMoo.emit("pingmap", data);
        MooMoo.emit("p", data);
    }
    const server_pingMap = pingMap;
    function pingSocketResponse(data) {
        MooMoo.emit("pingSocketResponse", data);
        MooMoo.emit("pingsocketresponse", data);
        MooMoo.emit("pp", data);
    }
    const server_pingSocketResponse = pingSocketResponse;
    function handleServerPackets(packet, data) {
        switch (packet) {
          case "id":
            server_setInitData(data);
            break;

          case "d":
            server_disconnect();
            break;

          case "1":
            server_setupGame(data);
            break;

          case "2":
            server_addPlayer(data);
            break;

          case "4":
            server_removePlayer(data);
            break;

          case "33":
            server_updatePlayers(data);
            break;

          case "5":
            server_updateLeaderboard(data);
            break;

          case "6":
            server_loadGameObject(data);
            break;

          case "a":
            server_loadAI(data[0]);
            break;

          case "aa":
            animateAI(data);
            break;

          case "7":
            server_gatherAnimation(data);
            break;

          case "8":
            server_wiggleGameObject(data);
            break;

          case "sp":
            server_shootTurret(data);
            break;

          case "9":
            server_updatePlayerValue(data);
            break;

          case "h":
            server_updateHealth(data);
            break;

          case "11":
            server_killPlayer(data);
            break;

          case "12":
            server_killObject(data);
            break;

          case "13":
            server_killObjects(data[0]);
            break;

          case "14":
            server_updateItemCounts(data);
            break;

          case "15":
            server_updateAge(data);
            break;

          case "16":
            server_updateUpgrades(data);
            break;

          case "17":
            server_updateItems(data);
            break;

          case "18":
            server_addProjectile(data);
            break;

          case "19":
            server_remProjectile(data);
            break;

          case "20":
            server_serverShutdownNotice(data);
            break;

          case "ac":
            server_addAlliance(data);
            break;

          case "ad":
            server_deleteAlliance(data);
            break;

          case "an":
            server_allianceNotification(data);
            break;

          case "st":
            server_setPlayerTeam(data);
            break;

          case "sa":
            server_setAlliancePlayers(data);
            break;

          case "us":
            server_updateStoreItems(data);
            break;

          case "ch":
            server_receiveChat(data);
            break;

          case "mm":
            server_updateMinimap(data);
            break;

          case "t":
            server_showText(data);
            break;

          case "p":
            server_pingMap(data);
            break;

          case "pp":
            server_pingSocketResponse(data);
            break;

          default:
            console.log("Unknown packet: " + packet);
        }
        MooMoo.emit("packet", {
            packet,
            data
        });
    }
    var _onmessage = false;
    function hookWS() {
        WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
            apply: function(target, thisArg, args) {
                MooMoo.ws = thisArg;
                MooMoo.sendPacket = function(type) {
                    var data = Array.prototype.slice.call(arguments, 1);
                    var binary = msgpack_encode([ type, data ]);
                    MooMoo.ws.send(binary);
                };
                if (MooMoo.ws.readyState !== 1) return true;
                if (!_onmessage) {
                    _onmessage = true;
                    MooMoo.ws.addEventListener("message", (function(e) {
                        var data = e.data;
                        var decoded = msgpack_decode(data);
                        var packet = decoded[0], packetData = decoded[1].slice(0);
                        handleServerPackets(packet, packetData);
                    }));
                }
                return Reflect.apply(target, thisArg, args);
            }
        });
    }
    var PlayerManager = function() {
        function PlayerManager() {
            this.players = [];
        }
        PlayerManager.prototype.addPlayer = function(player) {
            this.players.push(player);
        };
        PlayerManager.prototype.removePlayer = function(player) {
            this.players.splice(this.players.indexOf(player), 1);
        };
        PlayerManager.prototype.removePlayerBySid = function(sid) {
            this.players.splice(this.players.findIndex((function(player) {
                return player.sid === sid;
            })), 1);
        };
        PlayerManager.prototype.removePlayerById = function(id) {
            this.players.splice(this.players.findIndex((function(player) {
                return player.id === id;
            })), 1);
        };
        PlayerManager.prototype.getPlayerBySid = function(sid) {
            return this.players.find((function(player) {
                return player.sid === sid;
            }));
        };
        PlayerManager.prototype.getPlayerById = function(id) {
            return this.players.find((function(player) {
                return player.id === id;
            }));
        };
        PlayerManager.prototype.getPlayerByName = function(name) {
            var players = this.players.filter((function(player) {
                return player.name === name;
            }));
            if (players.length > 1) {
                return players;
            } else return players[0];
        };
        PlayerManager.prototype.clearPlayers = function() {
            this.players = [];
        };
        PlayerManager.prototype.updatePlayer = function(sid, data) {
            var player = this.getPlayerBySid(sid);
            if (player) {
                Object.assign(player, data);
            }
        };
        return PlayerManager;
    }();
    const Managers_PlayerManager = PlayerManager;
    var Leaderboardmanager = function() {
        function Leaderboardmanager() {
            this.leaderboard = new Map;
        }
        Leaderboardmanager.prototype.updateLeaderboard = function(data) {
            var _this = this;
            var arr = funcs_chunk(data, 3);
            var players = data.length / 3;
            arr.forEach((function(playerData, index) {
                var tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(playerData[0]);
                if (!tmpPlayer) {
                    tmpPlayer = new types_Player(playerData[0]);
                    tmpPlayer.sid = playerData[0];
                    tmpPlayer.name = playerData[1];
                    MooMoo.GamePlayerManager.addPlayer(tmpPlayer);
                }
                _this.leaderboard.set(index + 1, {
                    player: tmpPlayer,
                    sid: playerData[0],
                    name: playerData[1],
                    score: playerData[2]
                });
            }));
        };
        Leaderboardmanager.prototype.clearLeaderboard = function() {
            this.leaderboard = new Map;
        };
        return Leaderboardmanager;
    }();
    const LeaderboardManager = Leaderboardmanager;
    var ObjectManager = function() {
        function ObjectManager() {
            this.objects = new Map;
        }
        ObjectManager.prototype.addObject = function(obj) {
            var tmpObj = MooMoo.GameObjectManager.getGameObjectBySid(obj.sid);
            if (!tmpObj) {
                tmpObj = new types_GameObject(obj.sid);
            }
            tmpObj.x = obj.x;
            tmpObj.y = obj.y;
            tmpObj.ownerSid = obj.ownerSid;
            tmpObj.type = obj.type;
            tmpObj.sid = obj.sid;
            this.objects.set(obj.sid, tmpObj);
        };
        ObjectManager.prototype.getGameObjectBySid = function(sid) {
            return this.objects.get(sid);
        };
        ObjectManager.prototype.getObjectsByOwnerSid = function(sid) {
            var objs = [];
            this.objects.forEach((function(obj) {
                if (obj.ownerSid == sid) {
                    objs.push(obj);
                }
            }));
            return objs;
        };
        ObjectManager.prototype.removeObjectBySid = function(sid) {
            this.objects.delete(sid);
        };
        ObjectManager.prototype.removeObjectsByOwnerSid = function(sid) {
            var _this = this;
            this.objects.forEach((function(obj) {
                if (obj.ownerSid == sid) {
                    _this.objects.delete(obj.sid);
                }
            }));
        };
        return ObjectManager;
    }();
    const Managers_ObjectManager = ObjectManager;
    var Command = function() {
        function Command(name, run) {
            this.name = name;
            this.run = run;
        }
        Command.prototype.reply = function(message) {
            MooMoo.myPlayer.chat(message);
        };
        return Command;
    }();
    const types_Command = Command;
    var CommandManager = function() {
        function CommandManager() {
            this.commands = {};
            this.prefix = "/";
        }
        CommandManager.prototype.setPrefix = function(prefix) {
            this.prefix = prefix;
        };
        CommandManager.prototype.registerCommand = function(name, run) {
            var command = new types_Command(name, run);
            this.commands[name] = command;
        };
        CommandManager.prototype.unregisterCommand = function(name) {
            delete this.commands[name];
        };
        return CommandManager;
    }();
    const commandManager = CommandManager;
    var UTILS = function() {
        function UTILS() {
            this.getDistanceBetweenTwoPoints = UTILS.getDistanceBetweenTwoPoints;
            this.dist = UTILS.getDistanceBetweenTwoPoints;
            this.distance = UTILS.getDistanceBetweenTwoPoints;
            this.atan2 = UTILS.atan2;
            this.angle = UTILS.atan2;
        }
        UTILS.getDistanceBetweenTwoPoints = function(x1, y1, x2, y2) {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        };
        UTILS.atan2 = function(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1);
        };
        return UTILS;
    }();
    const Managers_UTILS = UTILS;
    var __extends = undefined && undefined.__extends || function() {
        var extendStatics = function(d, b) {
            extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
            };
            return extendStatics(d, b);
        };
        return function(d, b) {
            if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __);
        };
    }();
    var Game = function(_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this.teams = [];
            _this.statistics = {};
            _this.GamePlayerManager = new Managers_PlayerManager;
            _this.ActivePlayerManager = new Managers_PlayerManager;
            _this.LeaderboardManager = new LeaderboardManager;
            _this.GameObjectManager = new Managers_ObjectManager;
            _this.CommandManager = new commandManager;
            _this.UTILS = new Managers_UTILS;
            _this.vars = {};
            _this.msgpack = {};
            _this.msgpack.decode = msgpack_decode;
            _this.msgpack.encode = msgpack_encode;
            _this.vars.gameLoaded = false;
            return _this;
        }
        Game.prototype.debug = function(message) {
            this.emit("debug", message);
        };
        return Game;
    }(funcs_EventEmitter);
    const src = Game;
    hookWS();
    var delta = 0;
    var now = Date.now();
    var lastupdate = Date.now();
    function initRendering() {
        MooMoo.vars.camX = 0;
        MooMoo.vars.camY = 0;
        MooMoo.vars.offsetX = 0;
        MooMoo.vars.offsetY = 0;
        MooMoo.vars.maxScreenWidth = 1920;
        MooMoo.vars.maxScreenHeight = 1080;
        MooMoo.vars.canvas = null;
        MooMoo.vars.ctx = null;
        MooMoo.addEventListener("gameLoad", (function() {
            MooMoo.vars.canvas = document.getElementsByTagName("canvas")[1];
            MooMoo.vars.ctx = MooMoo.vars.canvas.getContext("2d");
            MooMoo.emit("renderingInit", {
                canvas: MooMoo.vars.canvas,
                ctx: MooMoo.vars.ctx
            });
        }));
        function doUpdate() {
            now = Date.now();
            delta = now - lastupdate;
            lastupdate = now;
            requestAnimationFrame(doUpdate);
        }
        doUpdate();
        Object.defineProperty(Object.prototype, "y", {
            get: function() {
                return this._y;
            },
            set: function(data) {
                if (MooMoo.myPlayer && this.id == MooMoo.myPlayer.id) {
                    MooMoo.vars.playerx = this.x;
                    MooMoo.vars.playery = this.y;
                    MooMoo.vars.offsetX = MooMoo.vars.camX - MooMoo.vars.maxScreenWidth / 2;
                    MooMoo.vars.offsetY = MooMoo.vars.camY - MooMoo.vars.maxScreenHeight / 2;
                    MooMoo.emit("updateOffsets", MooMoo.vars.offsetX, MooMoo.vars.offsetY);
                }
                this._y = data;
            }
        });
        function tick() {
            if (MooMoo.myPlayer) {
                var player = {
                    x: MooMoo.vars.playerx,
                    y: MooMoo.vars.playery
                };
                var tmpDist = Math.sqrt(Math.pow(player.x - MooMoo.vars.camX, 2) + Math.pow(player.y - MooMoo.vars.camY, 2));
                var tmpDir = Math.atan2(player.y - MooMoo.vars.camY, player.x - MooMoo.vars.camX);
                var camSpeed = Math.min(tmpDist * .01 * delta, tmpDist);
                if (tmpDist > .05) {
                    MooMoo.vars.camX += Math.cos(tmpDir) * camSpeed;
                    MooMoo.vars.camY += Math.sin(tmpDir) * camSpeed;
                } else {
                    MooMoo.vars.camX = player.x;
                    MooMoo.vars.camY = player.y;
                }
            }
        }
        CanvasRenderingContext2D.prototype.clearRect = new Proxy(CanvasRenderingContext2D.prototype.clearRect, {
            apply: function(target, thisArg, argumentsList) {
                target.apply(thisArg, argumentsList);
                tick();
                MooMoo.emit("renderTick", MooMoo.vars.offsetX, MooMoo.vars.offsetY);
            }
        });
    }
    const rendering_initRendering = initRendering;
    var MooMoo = new src;
    Object.defineProperty(Function.prototype, 69, {
        get: function() {
            switch (this.name) {
              case "MooMooJS_beta":
                return MooMoo;

              default:
                return null;
            }
        }
    });
    var sym = Symbol();
    Object.defineProperty(Object.prototype, "x", {
        set: function(data) {
            this[sym] = data;
            updateHookPosition.call(this, data);
        },
        get: function() {
            return this[sym];
        }
    });
    rendering_initRendering();
})();