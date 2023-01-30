import decode from "../lib/_game/external/funcs/msgpack/decode.js";
import encode from "../lib/_game/external/funcs/msgpack/encode.js";

import ServerManager from "../lib/_game/external/modules/Bot/server/ServerManager";

import handleServerPackets from "./handleServerPackets";
import handleClientPackets from "./handleClientPackets";

import SourceMapConfiguration from "../lib/_game/external/modules/features/SourceMapConfiguration";

import { MooMoo } from "../../app";

let _onmessage: boolean = false;
export let onmessagecallback: Function = null;

let injected = false;
let wsToken: string = null;

export default function hookWS() {

    WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
        apply(target, thisArg, args) {
            if (!wsToken) {
                wsToken = new URL(thisArg.url).search.split("token=")[1]
            }
            let currentToken = new URL(thisArg.url).search.split("token=")[1]

            if (wsToken !== currentToken) return Reflect.apply(target, thisArg, args);

            let PacketInterceptor = MooMoo.PacketInterceptor;
            args[0] = PacketInterceptor.applyClientCallbacks(args[0])
            MooMoo.ws = thisArg;
            MooMoo.PacketManager.addPacket()
            MooMoo.sendPacket = function (type: string) {
                let data = Array.prototype.slice.call(arguments, 1);
                let binary = encode([type, data]);

                thisArg.send(binary)
            }
            if (MooMoo.ws.readyState !== 1) return true;
            if (!_onmessage) {
                ServerManager.startInterval()
                _onmessage = true;
                SourceMapConfiguration.initialize()
            }
            let data = MooMoo.msgpack.decode(args[0]);
            let [packet, [...packetData]] = data;
            let doSend = handleClientPackets(packet, packetData);
            if (!doSend) return true;

            return Reflect.apply(target, thisArg, args);

        }
    });

    let onmessagesetter = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onmessage").set;
    Object.defineProperty(WebSocket.prototype, "onmessage", {
        set: function (callback) {
            onmessagecallback = callback;
            onmessagesetter.call(this, async function (event: any) {
                let PacketInterceptor = MooMoo.PacketInterceptor;
                let data = event.data;
                data = PacketInterceptor.applyServerCallbacks(data)
                let decoded = MooMoo.msgpack.decode(new Uint8Array(data));
                let [packet, [...packetData]] = decoded;
                handleServerPackets(packet, packetData);
                onmessagecallback({
                    data: data
                });
            })
        }
    })
}
