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
        throw console.debug("msgpack array:", r), new Error("Invalid byte value '" + e + "' at index " + (t - 1) + " in the MessagePack binary data (length " + r.length + "): Expecting a range of 0 to 255. This is not a byte array.")
    }

    function f(e) {
        let n = 0,
            i = !0;
        for (; e-- > 0;)
            if (i) {
                let e = r[t++];
                n += 127 & e, 128 & e && (n -= 128), i = !1
            } else n *= 256, n += r[t++];
        return n
    }

    function o(e) {
        let n = 0;
        for (; e-- > 0;) n *= 256, n += r[t++];
        return n
    }

    function u(e) {
        let n = new DataView(r.buffer, t, e);
        return t += e, 4 === e ? n.getFloat32(0, !1) : 8 === e ? n.getFloat64(0, !1) : void 0
    }

    function a(e, n) {
        e < 0 && (e = o(n));
        let i = r.subarray(t, t + e);
        return t += e, i
    }

    function l(r, e) {
        r < 0 && (r = o(e));
        let t = {};
        for (; r-- > 0;) t[i()] = i();
        return t
    }

    function c(r, e) {
        r < 0 && (r = o(e));
        let t = [];
        for (; r-- > 0;) t.push(i());
        return t
    }

    function d(e, n) {
        e < 0 && (e = o(n));
        let i = t;
        return t += e,
            function(r, e, t) {
                let n = e,
                    i = "";
                for (t += e; n < t;) {
                    let e = r[n++];
                    if (e > 127)
                        if (e > 191 && e < 224) {
                            if (n >= t) throw new Error("UTF-8 decode: incomplete 2-byte sequence");
                            e = (31 & e) << 6 | 63 & r[n++]
                        } else if (e > 223 && e < 240) {
                        if (n + 1 >= t) throw new Error("UTF-8 decode: incomplete 3-byte sequence");
                        e = (15 & e) << 12 | (63 & r[n++]) << 6 | 63 & r[n++]
                    } else {
                        if (!(e > 239 && e < 248)) throw new Error("UTF-8 decode: unknown multibyte start 0x" + e.toString(16) + " at index " + (n - 1));
                        if (n + 2 >= t) throw new Error("UTF-8 decode: incomplete 4-byte sequence");
                        e = (7 & e) << 18 | (63 & r[n++]) << 12 | (63 & r[n++]) << 6 | 63 & r[n++]
                    }
                    if (e <= 65535) i += String.fromCharCode(e);
                    else {
                        if (!(e <= 1114111)) throw new Error("UTF-8 decode: code point 0x" + e.toString(16) + " exceeds UTF-16 reach");
                        e -= 65536, i += String.fromCharCode(e >> 10 | 55296), i += String.fromCharCode(1023 & e | 56320)
                    }
                }
                return i
            }(r, i, e)
    }

    function w(r, n) {
        r < 0 && (r = o(n));
        let i = o(1),
            u = a(r);
        return 255 === i ? function(r) {
            if (4 === r.length) {
                let e = (r[0] << 24 >>> 0) + (r[1] << 16 >>> 0) + (r[2] << 8 >>> 0) + r[3];
                return new Date(1e3 * e)
            }
            if (8 === r.length) {
                let t = (r[0] << 22 >>> 0) + (r[1] << 14 >>> 0) + (r[2] << 6 >>> 0) + (r[3] >>> 2),
                    n = (3 & r[3]) * e + (r[4] << 24 >>> 0) + (r[5] << 16 >>> 0) + (r[6] << 8 >>> 0) + r[7];
                return new Date(1e3 * n + t / 1e6)
            }
            if (12 === r.length) {
                let e = (r[0] << 24 >>> 0) + (r[1] << 16 >>> 0) + (r[2] << 8 >>> 0) + r[3];
                t -= 8;
                let n = f(8);
                return new Date(1e3 * n + e / 1e6)
            }
            throw new Error("Invalid data length for a date value.")
        }(u) : {
            type: i,
            data: u
        }
    }
};

export default decode;