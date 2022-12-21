import decode from "../lib/_game/external/funcs/msgpack/decode.js";
import encode from "../lib/_game/external/funcs/msgpack/encode.js";

import handleServerPackets from "./handleServerPackets";
import handleClientPackets from "./handleClientPackets";

import { MooMoo } from "../app";

let _onmessage: boolean = false;

export default function hookWS() {

    WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
        apply(target, thisArg, args) {
            
            MooMoo.ws = thisArg;
            MooMoo.sendPacket = function (type: string) {
                let data = Array.prototype.slice.call(arguments, 1);
                let binary = encode([type, data]);

                MooMoo.ws.send(binary);
            }
            if (MooMoo.ws.readyState !== 1) return true;
            if (!_onmessage) {
                _onmessage = true;
                MooMoo.ws.addEventListener("message", (e: any) => {
                    let data = e.data;
                    let decoded = decode(data);
                    let [packet, [...packetData]] = decoded;
                    handleServerPackets(packet, packetData);
                })
            }
            if (args && args[0]) {
                let decoded = decode(args[0]);
                let [packet, [...packetData]] = decoded;
                let doSend = handleClientPackets(packet, packetData);
                if (!doSend) return true;
            }
            return Reflect.apply(target, thisArg, args);
        }
    });
}
