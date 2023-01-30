import { onmessagecallback } from "../../../ws/hookWS";

class PacketInterceptor {
    private clientCallbacks: Map<number, Function> = new Map();
    private serverCallbacks: Map<number, Function> = new Map();
    private lastCallbackId: number = 0;

    public addCallback(type: "client" | "server", callback: Function): number {
        let callbacks: Map<number, Function>;
        if (type === "client") {
            callbacks = this.clientCallbacks;
        } else if (type === "server") {
            callbacks = this.serverCallbacks;
        }
        const callbackId = this.lastCallbackId++;
        callbacks.set(callbackId, callback);
        return callbackId;
    }

    public removeCallback(callbackId: number) {
        this.clientCallbacks.delete(callbackId);
        this.serverCallbacks.delete(callbackId);
    }

    public applyClientCallbacks(packet: any) {
        if(!this.clientCallbacks.size) return packet;
        for (const [id, callback] of this.clientCallbacks) {
            packet = callback(packet) || packet;
        }
        return packet;
    }

    public applyServerCallbacks(packet: any) {
        if(!this.serverCallbacks.size) return packet;
        for (const [id, callback] of this.serverCallbacks) {
            packet = callback(packet)
        }
        return packet;
    }

    public getOriginalServerCallback() {
        return onmessagecallback;
    }
}

export default PacketInterceptor;