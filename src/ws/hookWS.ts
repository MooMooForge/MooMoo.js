import decode from "../lib/decode.js";
import { handlePacket } from "./handlePacket";
import { ws } from "../index";

export default function hookWS() {
    WebSocket = new Proxy(WebSocket, {
        construct(target: any, args) {
            ws.ws = Reflect.construct(target, args);
            ws.addEventListener("message", (e: any) => {
                let data = e.data;
                try {
                    let decoded = decode(data);
                    let [packet, [...packetData]] = decoded;
                    handlePacket(packet, packetData);
                } catch (e) {
                    throw new Error(e);
                }
            });
            return ws;
        }
    });
}
