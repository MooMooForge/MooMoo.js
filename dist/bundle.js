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
        t: () => U
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
    }(), msgpack_decode = function(e) {
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
            let n = 0, p = !0;
            for (;r-- > 0; ) if (p) {
                let r = e[t++];
                n += 127 & r, 128 & r && (n -= 128), p = !1;
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
            let p = e.subarray(t, t + r);
            return t += r, p;
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
            let p = t;
            return t += r, function(e, t, r) {
                let n = t, p = "";
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
                    if (t <= 65535) p += String.fromCharCode(t); else {
                        if (!(t <= 1114111)) throw new Error("UTF-8 decode: code point 0x" + t.toString(16) + " exceeds UTF-16 reach");
                        t -= 65536, p += String.fromCharCode(t >> 10 | 55296), p += String.fromCharCode(1023 & t | 56320);
                    }
                }
                return p;
            }(e, p, r);
        }
        function w(e, r) {
            e < 0 && (e = o(r));
            let n = o(1), p = a(e);
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
            }(p) : {
                type: n,
                data: p
            };
        }
    }, msgpack_encode = function(e) {
        const t = 4294967296;
        let r, n, p = new Uint8Array(128), y = 0;
        return a(e), p.subarray(0, y);
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
                        let n = 0, p = new Uint8Array(e.length * (t ? 1 : 4));
                        for (let t = 0; t !== r; t++) {
                            let y = e.charCodeAt(t);
                            if (y < 128) p[n++] = y; else {
                                if (y < 2048) p[n++] = y >> 6 | 192; else {
                                    if (y > 55295 && y < 56320) {
                                        if (++t >= r) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                        let m = e.charCodeAt(t);
                                        if (m < 56320 || m > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + m.toString(16) + " at index " + t + " out of range");
                                        y = 65536 + ((1023 & y) << 10) + (1023 & m), p[n++] = y >> 18 | 240, p[n++] = y >> 12 & 63 | 128;
                                    } else p[n++] = y >> 12 | 224;
                                    p[n++] = y >> 6 & 63 | 128;
                                }
                                p[n++] = 63 & y | 128;
                            }
                        }
                        return t ? p : p.subarray(0, n);
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
            if (p.length < y + 1) {
                let e = 2 * p.length;
                for (;e < y + 1; ) e *= 2;
                let t = new Uint8Array(e);
                t.set(p), p = t;
            }
            p[y] = e, y++;
        }
        function c(e) {
            if (p.length < y + e.length) {
                let t = 2 * p.length;
                for (;t < y + e.length; ) t *= 2;
                let r = new Uint8Array(t);
                r.set(p), p = r;
            }
            p.set(e, y), y += e.length;
        }
        function u(e) {
            let r, n;
            e >= 0 ? (r = e / t, n = e % t) : (e++, r = Math.abs(e) / t, n = Math.abs(e) % t, 
            r = ~r, n = ~n), c([ r >>> 24, r >>> 16, r >>> 8, r, n >>> 24, n >>> 16, n >>> 8, n ]);
        }
    }, r = function() {
        function Alliance(e, t) {
            this.Leader = e, this.Name = t;
        }
        return Alliance.prototype.setAliancePlayers = function(e) {
            this.Members = e;
        }, Alliance;
    }(), n = function Player(e) {
        this.sid = e;
    }, p = function place(e, t) {
        var r = U.myPlayer.weaponIndex;
        U.sendPacket("5", e, t), U.sendPacket("c", 1, t), U.sendPacket("c", 0, t), U.sendPacket("5", r, !0);
    }, y = function chat(e) {
        U.sendPacket("ch", e);
    }, m = [ {
        id: 45,
        name: "Shame!",
        dontSell: !0,
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
        watrImm: !0
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
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "generates points while worn",
        pps: 1.5
    }, {
        id: 11,
        name: "Spike Gear",
        topSprite: !0,
        price: 1e4,
        scale: 120,
        desc: "deal damage to players that damage you",
        dmg: .45
    }, {
        id: 53,
        name: "Turret Gear",
        topSprite: !0,
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
        noEat: !0,
        spdMult: 1.1,
        invisTimer: 1e3
    } ], h = function equipHat(e) {
        if ("number" == typeof e) !function equipHatById(e) {
            var t = !1;
            if (m.find((function(r) {
                r.id == e && (t = !0, U.sendPacket("13c", 0, e, 0));
            })), !t) try {
                throw new Error("Error at equipHatById: Hat with id " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else if ("string" == typeof e) !function equipHatByName(e) {
            var t = !1;
            if (m.find((function(r) {
                r.name == e && (t = !0, U.sendPacket("13c", 0, r.id, 0));
            })), !t) try {
                throw new Error("Error at equipHatByName: Hat with name " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else try {
            throw new Error("Error at equipHat: hatData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }, g = [ {
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
        spin: !0,
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
    } ], b = function equipAccessory(e) {
        if ("number" == typeof e) !function equipAccessoryById(e) {
            var t = !1;
            if (g.find((function(r) {
                r.id == e && (t = !0, U.sendPacket("13c", 0, e, 1));
            })), !t) try {
                throw new Error("Error at equipAccessoryById: Accessory with id " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else if ("string" == typeof e) !function equipAccessoryByName(e) {
            var t = !1;
            if (g.find((function(r) {
                r.name == e && (t = !0, U.sendPacket("13c", 0, r.id, 1));
            })), !t) try {
                throw new Error("Error at equipAccessoryByName: Accessory with name " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else try {
            throw new Error("Error at equipAccessory: accessoryData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }, P = function unequipHat() {
        U.sendPacket("13c", 0, 0, 0);
    }, v = function unequipAccessory() {
        U.sendPacket("13c", 0, 0, 1);
    }, k = function buyHat(e) {
        if ("number" == typeof e) !function buyHatById(e) {
            var t = !1;
            if (m.find((function(r) {
                r.id == e && (t = !0, U.sendPacket("13c", 1, e, 0));
            })), !t) try {
                throw new Error("Error at buyHatById: Hat with id " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else if ("string" == typeof e) !function buyHatByName(e) {
            var t = !1;
            if (m.find((function(r) {
                r.name == e && (t = !0, U.sendPacket("13c", 1, r.id, 0));
            })), !t) try {
                throw new Error("Error at buyHatByName: Hat with name " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else try {
            throw new Error("Error at buyHat: hatData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }, M = function buyAccessory_equipAccessory(e) {
        if ("number" == typeof e) !function buyAccessory_equipAccessoryById(e) {
            var t = !1;
            if (g.find((function(r) {
                r.id == e && (t = !0, U.sendPacket("13c", 1, e, 1));
            })), !t) try {
                throw new Error("Error at equipAccessoryById: Accessory with id " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else if ("string" == typeof e) !function buyAccessory_equipAccessoryByName(e) {
            var t = !1;
            if (g.find((function(r) {
                r.name == e && (t = !0, U.sendPacket("13c", 1, r.id, 1));
            })), !t) try {
                throw new Error("Error at equipAccessoryByName: Accessory with name " + e + " does not exist");
            } catch (e) {
                console.log(e);
            }
        }(e); else try {
            throw new Error("Error at equipAccessory: accessoryData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }, A = function chunk(e, t) {
        for (var r = [], n = 0; n < e.length; n += t) r.push(e.slice(n, n + t));
        return r;
    }, E = function GameObject(e) {
        this.sid = e;
    };
    var S = !1;
    const x = function() {
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
        }, PlayerManager.prototype.getPlayerByName = function(e) {
            var t = this.players.filter((function(t) {
                return t.name === e;
            }));
            return t.length > 1 ? t : t[0];
        }, PlayerManager.prototype.clearPlayers = function() {
            this.players = [];
        }, PlayerManager;
    }(), B = function() {
        function Leaderboardmanager() {
            this.leaderboard = new Map;
        }
        return Leaderboardmanager.prototype.updateLeaderboard = function(e) {
            var t = this, r = A(e, 3);
            e.length, r.forEach((function(e, r) {
                var p = U.GamePlayerManager.getPlayerBySid(e[0]);
                p || ((p = new n(e[0])).sid = e[0], p.name = e[1], U.GamePlayerManager.addPlayer(p)), 
                t.leaderboard.set(r + 1, {
                    player: p,
                    sid: e[0],
                    name: e[1],
                    score: e[2]
                });
            }));
        }, Leaderboardmanager.prototype.clearLeaderboard = function() {
            this.leaderboard = new Map;
        }, Leaderboardmanager;
    }(), O = function() {
        function ObjectManager() {
            this.objects = new Map;
        }
        return ObjectManager.prototype.addObject = function(e) {
            var t = U.GameObjectManager.getGameObjectBySid(e.sid);
            t || (t = new E(e.sid)), t.x = e.x, t.y = e.y, t.ownerSid = e.ownerSid, t.type = e.type, 
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
    }(), j = function() {
        function Command(e, t) {
            this.name = e, this.run = t;
        }
        return Command.prototype.reply = function(e) {
            U.myPlayer.chat(e);
        }, Command;
    }(), I = function() {
        function CommandManager() {
            this.commands = {}, this.prefix = "/";
        }
        return CommandManager.prototype.setPrefix = function(e) {
            this.prefix = e;
        }, CommandManager.prototype.registerCommand = function(e, t) {
            var r = new j(e, t);
            this.commands[e] = r;
        }, CommandManager.prototype.unregisterCommand = function(e) {
            delete this.commands[e];
        }, CommandManager;
    }(), H = function() {
        function UTILS() {
            this.getDistanceBetweenTwoPoints = UTILS.getDistanceBetweenTwoPoints, this.dist = UTILS.getDistanceBetweenTwoPoints, 
            this.distance = UTILS.getDistanceBetweenTwoPoints, this.atan2 = UTILS.atan2, this.angle = UTILS.atan2;
        }
        return UTILS.getDistanceBetweenTwoPoints = function(e, t, r, n) {
            return Math.sqrt(Math.pow(r - e, 2) + Math.pow(n - t, 2));
        }, UTILS.atan2 = function(e, t, r, n) {
            return Math.atan2(n - t, r - e);
        }, UTILS;
    }();
    var C, T = (C = function(e, t) {
        return C = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function(e, t) {
            e.__proto__ = t;
        } || function(e, t) {
            for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
        }, C(e, t);
    }, function(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        function __() {
            this.constructor = e;
        }
        C(e, t), e.prototype = null === t ? Object.create(t) : (__.prototype = t.prototype, 
        new __);
    });
    const G = function(e) {
        function Game() {
            var t = e.call(this) || this;
            return t.teams = [], t.GamePlayerManager = new x, t.ActivePlayerManager = new x, 
            t.LeaderboardManager = new B, t.GameObjectManager = new O, t.CommandManager = new I, 
            t.UTILS = new H, t.vars = {}, t.msgpack = {}, t.msgpack.decode = msgpack_decode, 
            t.msgpack.encode = msgpack_encode, t;
        }
        return T(Game, e), Game.prototype.debug = function(e) {
            this.emit("debug", e);
        }, Game;
    }(t);
    !function hookWS() {
        WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
            apply: function(e, t, m) {
                if (U.ws = t, U.sendPacket = function(e) {
                    var t = Array.prototype.slice.call(arguments, 1), r = msgpack_encode([ e, t ]);
                    U.ws.send(r);
                }, 1 !== U.ws.readyState) return !0;
                if (S || (S = !0, U.ws.addEventListener("message", (function(e) {
                    var t = e.data, m = msgpack_decode(t);
                    !function handleServerPackets(e, t) {
                        switch (e) {
                          case "id":
                            !function setInitData(e) {
                                for (var t = e.teams, p = 0; p < t.length; p++) {
                                    var y = t[p], m = y.sid, h = y.owner, g = new r(new n(h), m);
                                    U.teams.push(g);
                                }
                            }(t[0]);
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
                            !function setupGame(e) {
                                U.myPlayer = {}, U.myPlayer.sid = e, U.myPlayer.place = p, U.myPlayer.chat = y, 
                                U.myPlayer.equipHat = h, U.myPlayer.equipAccessory = b, U.myPlayer.unequipHat = P, 
                                U.myPlayer.unequipAccessory = v, U.myPlayer.buyHat = k, U.myPlayer.buyAccessory = M;
                            }(t[0]);
                            break;

                          case "2":
                            !function addPlayer(e, t) {
                                var r = U.GamePlayerManager.getPlayerBySid(e[1]);
                                r || ((r = new n(e[1])).name = e[2], r.id = e[0], U.GamePlayerManager.addPlayer(r)), 
                                U.debug("Player " + r.name + " has joined the game."), t && console.log("You are now in game!");
                            }(t[0], t[1]);
                            break;

                          case "4":
                            !function removePlayer(e) {
                                U.GamePlayerManager.removePlayerById(e), U.debug("Player " + e + " has left the game.");
                            }(t[0]);
                            break;

                          case "33":
                            !function updatePlayers(e) {
                                var t = A(e, 13);
                                U.ActivePlayerManager.clearPlayers(), t.forEach((function(e) {
                                    var t = U.GamePlayerManager.getPlayerBySid(e[0]);
                                    t || (t = new n(e[0])), t.sid = e[0], t.x = e[1], t.y = e[2], t.dir = e[3], t.buildIndex = e[4], 
                                    t.weaponIndex = e[5], t.weaponVariant = e[6], t.team = e[7], t.isLeader = e[8], 
                                    t.skinIndex = e[9], t.tailIndex = e[10], t.iconIndex = e[11], t.zIndex = e[12], 
                                    U.ActivePlayerManager.addPlayer(t), t.sid === U.myPlayer.sid && Object.assign(U.myPlayer, t);
                                })), function cacheItems() {
                                    U.myPlayer.inventory = {};
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
                                    } ], t = 0; t < e.length; t++) for (var r = e[t], n = r.category, p = r.start, y = r.end, m = r.subtract, h = p; h < y; h++) {
                                        var g = document.getElementById("actionBarItem".concat(h));
                                        if (g && null !== g.offsetParent) {
                                            U.myPlayer.inventory[n] = m ? h - 16 : h;
                                            break;
                                        }
                                    }
                                }();
                            }(t[0]);
                            break;

                          case "5":
                            !function updateLeaderboard(e) {
                                U.LeaderboardManager.updateLeaderboard(e);
                            }(t[0]);
                            break;

                          case "6":
                            !function loadGameObject(e) {
                                A(e, 8).forEach((function(e) {
                                    var t = U.GameObjectManager.getGameObjectBySid(e[0]);
                                    t || (t = new E(e[0])), t.x = e[1], t.y = e[2], t.ownerSid = e[3], t.type = e[4], 
                                    t.sid = e[0], t.dir = e[5], t.scale = e[6], t.idk = e[7], U.GameObjectManager.addObject(t);
                                }));
                            }(t[0]);
                            break;

                          case "12":
                            !function killObject(e) {
                                U.GameObjectManager.removeObjectBySid(e);
                            }(t[0]);
                            break;

                          case "13":
                            !function killObjects(e) {
                                U.GameObjectManager.removeObjectsByOwnerSid(e);
                            }(t[0]);
                            break;

                          default:
                            console.log("Unknown packet: " + e);
                        }
                        U.emit("packet", {
                            packet: e,
                            data: t
                        });
                    }(m[0], m[1].slice(0));
                }))), m && m[0]) {
                    var g = msgpack_decode(m[0]);
                    if (!function handleClientPackets(e, t) {
                        var r = !0;
                        return "ch" === e && (r = function sendChat(e) {
                            var t = U.CommandManager, r = t.prefix;
                            if (e.startsWith(r)) {
                                var n = t.commands, p = e.split(" ")[0].slice(r.length), y = e.split(" ").slice(1), m = n[p];
                                return !m || (m.run(m, y), !1);
                            }
                            return !0;
                        }(t[0])), r;
                    }(g[0], g[1].slice(0))) return !0;
                }
                return Reflect.apply(e, t, m);
            }
        });
    }();
    var U = new G;
    Object.defineProperty(Function.prototype, 69, {
        get: function() {
            return "MooMooJS_beta" === this.name ? U : null;
        }
    });
})();