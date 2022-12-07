const encode = function(e) {
    const t = 4294967296;
    let n, r, i = new Uint8Array(128),
        l = 0;
    return a(e), i.subarray(0, l);

    function a(e) {
        switch (typeof e) {
            case "undefined":
                o();
                break;
            case "boolean":
                ! function(e) {
                    s(e ? 195 : 194)
                }(e);
                break;
            case "number":
                ! function(e) {
                    if (isFinite(e) && Math.floor(e) === e)
                        if (e >= 0 && e <= 127) s(e);
                        else if (e < 0 && e >= -32) s(e);
                    else if (e > 0 && e <= 255) c([204, e]);
                    else if (e >= -128 && e <= 127) c([208, e]);
                    else if (e > 0 && e <= 65535) c([205, e >>> 8, e]);
                    else if (e >= -32768 && e <= 32767) c([209, e >>> 8, e]);
                    else if (e > 0 && e <= 4294967295) c([206, e >>> 24, e >>> 16, e >>> 8, e]);
                    else if (e >= -2147483648 && e <= 2147483647) c([210, e >>> 24, e >>> 16, e >>> 8, e]);
                    else if (e > 0 && e <= 0x10000000000000000) {
                        let n = e / t,
                            r = e % t;
                        c([211, n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r])
                    } else e >= -0x8000000000000000 && e <= 0x8000000000000000 ? (s(211), u(e)) : c(e < 0 ? [211, 128, 0, 0, 0, 0, 0, 0, 0] : [207, 255, 255, 255, 255, 255, 255, 255, 255]);
                    else r || (n = new ArrayBuffer(8), r = new DataView(n)), r.setFloat64(0, e), s(203), c(new Uint8Array(n))
                }(e);
                break;
            case "string":
                ! function(e) {
                    let t = function(e) {
                            let t = !0,
                                n = e.length;
                            for (let r = 0; r < n; r++)
                                if (e.charCodeAt(r) > 127) {
                                    t = !1;
                                    break
                                } let r = 0,
                                i = new Uint8Array(e.length * (t ? 1 : 4));
                            for (let t = 0; t !== n; t++) {
                                let l = e.charCodeAt(t);
                                if (l < 128) i[r++] = l;
                                else {
                                    if (l < 2048) i[r++] = l >> 6 | 192;
                                    else {
                                        if (l > 55295 && l < 56320) {
                                            if (++t >= n) throw new Error("UTF-8 encode: incomplete surrogate pair");
                                            let a = e.charCodeAt(t);
                                            if (a < 56320 || a > 57343) throw new Error("UTF-8 encode: second surrogate character 0x" + a.toString(16) + " at index " + t + " out of range");
                                            l = 65536 + ((1023 & l) << 10) + (1023 & a), i[r++] = l >> 18 | 240, i[r++] = l >> 12 & 63 | 128
                                        } else i[r++] = l >> 12 | 224;
                                        i[r++] = l >> 6 & 63 | 128
                                    }
                                    i[r++] = 63 & l | 128
                                }
                            }
                            return t ? i : i.subarray(0, r)
                        }(e),
                        n = t.length;
                    n <= 31 ? s(160 + n) : c(n <= 255 ? [217, n] : n <= 65535 ? [218, n >>> 8, n] : [219, n >>> 24, n >>> 16, n >>> 8, n]), c(t)
                }(e);
                break;
            case "object":
                null === e ? o() : e instanceof Date ? function(e) {
                    let n = e.getTime() / 1e3;
                    if (0 === e.getMilliseconds() && n >= 0 && n < 4294967296) c([214, 255, n >>> 24, n >>> 16, n >>> 8, n]);
                    else if (n >= 0 && n < 17179869184) {
                        let r = 1e6 * e.getMilliseconds();
                        c([215, 255, r >>> 22, r >>> 14, r >>> 6, r << 2 >>> 0 | n / t, n >>> 24, n >>> 16, n >>> 8, n])
                    } else {
                        let t = 1e6 * e.getMilliseconds();
                        c([199, 12, 255, t >>> 24, t >>> 16, t >>> 8, t]), u(n)
                    }
                }(e) : Array.isArray(e) ? f(e) : e instanceof Uint8Array || e instanceof Uint8ClampedArray ? function(e) {
                    let t = e.length;
                    c(t <= 15 ? [196, t] : t <= 65535 ? [197, t >>> 8, t] : [198, t >>> 24, t >>> 16, t >>> 8, t]), c(e)
                }(e) : e instanceof Int8Array || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || e instanceof Float32Array || e instanceof Float64Array ? f(e) : function(e) {
                    let t = 0;
                    for (let n in e) t++;
                    t <= 15 ? s(128 + t) : c(t <= 65535 ? [222, t >>> 8, t] : [223, t >>> 24, t >>> 16, t >>> 8, t]);
                    for (let t in e) a(t), a(e[t])
                }(e)
        }
    }

    function o(e) {
        s(192)
    }

    function f(e) {
        let t = e.length;
        t <= 15 ? s(144 + t) : c(t <= 65535 ? [220, t >>> 8, t] : [221, t >>> 24, t >>> 16, t >>> 8, t]);
        for (let n = 0; n < t; n++) a(e[n])
    }

    function s(e) {
        if (i.length < l + 1) {
            let e = 2 * i.length;
            for (; e < l + 1;) e *= 2;
            let t = new Uint8Array(e);
            t.set(i), i = t
        }
        i[l] = e, l++
    }

    function c(e) {
        if (i.length < l + e.length) {
            let t = 2 * i.length;
            for (; t < l + e.length;) t *= 2;
            let n = new Uint8Array(t);
            n.set(i), i = n
        }
        i.set(e, l), l += e.length
    }

    function u(e) {
        let n, r;
        e >= 0 ? (n = e / t, r = e % t) : (e++, n = Math.abs(e) / t, r = Math.abs(e) % t, n = ~n, r = ~r), c([n >>> 24, n >>> 16, n >>> 8, n, r >>> 24, r >>> 16, r >>> 8, r])
    }
};

export default encode;