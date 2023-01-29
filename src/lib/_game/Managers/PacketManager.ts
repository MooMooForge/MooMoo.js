import EventEmitter from "../external/funcs/EventEmitter";

class PacketManager {
    private _packetCountPerMinute: number = 0;
    private _packetCountPerSecond: number = 0;
    private _packetTime: number = 60;

    private _eventEmitter: EventEmitter;

    private _intervalIdPerMinute: ReturnType<typeof setInterval>;
    private _intervalIdPerSecond: ReturnType<typeof setInterval>;

    private readonly _packetLimitPerMinute: number = 5400;
    private readonly _packetLimitPerSecond: number = 120;

    constructor() {
        this._eventEmitter = new EventEmitter();
    }

    public initialize(): void {
        this._startTimerPerMinute();
        this._startTimerPerSecond();
    }

    public addPacket(): void {
        this._packetCountPerSecond++;
        this._packetCountPerMinute++;
        const kickPercentagePerMinute = this.getKickPercentagePerMinute();
        if (kickPercentagePerMinute >= 100) {
            this._eventEmitter.emit("Kick", kickPercentagePerMinute);
        }
    }

    public getKickPercentagePerMinute(): number {
        return (this._packetCountPerMinute / this._packetLimitPerMinute) * 100;
    }

    public getKickPercentagePerSecond(): number {
        return (this._packetCountPerSecond / this._packetLimitPerSecond) * 100;
    }

    public getPacketCountPerMinute(): number {
        return this._packetCountPerMinute;
    }

    public getPacketCountPerSecond(): number {
        return this._packetCountPerSecond;
    }

    public getPacketTime(): number {
        return this._packetTime;
    }

    private _startTimerPerMinute(): void {
        this._intervalIdPerMinute = setInterval(() => {
            this._resetPacketCountPerMinute();
        }, 60000);
    }

    private _startTimerPerSecond(): void {
        this._intervalIdPerSecond = setInterval(() => {
            if (this._packetCountPerSecond > this._packetLimitPerSecond) {
                this._eventEmitter.emit("Kick", this.getKickPercentagePerSecond());
            }
            this._resetPacketCountPerSecond();
        }, 1000);
    }

    private _resetPacketCountPerMinute(): void {
        this._packetCountPerMinute = 0;
        this._packetTime = 60;
    }
    private _resetPacketCountPerSecond(): void {
        this._packetCountPerSecond = 0;
    }
}

export default PacketManager;
