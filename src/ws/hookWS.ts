import decode from "../lib/decode.js";
import { handlePacket } from "./handlePacket";
import MooMoo from "../index";

export default function hookWS() {
    WebSocket = new Proxy(WebSocket, {
        construct(target: any, args) {
            MooMoo.ws = Reflect.construct(target, args);
            MooMoo.ws.addEventListener("message", (e: any) => {
                let data = e.data;
                try {
                    let decoded = decode(data);
                    let [packet, [...packetData]] = decoded;
                    handlePacket(packet, packetData);
                } catch (e) {
                    throw new Error(e);
                }
            });
            return MooMoo.ws;
        }
    });

    WebSocket.prototype.send = new Proxy(WebSocket.prototype.send, {
        apply(target, thisArg, args) {
            MooMoo.debug("Sent: " + args[0]);
            return Reflect.apply(target, thisArg, args);
        }
    });
}


