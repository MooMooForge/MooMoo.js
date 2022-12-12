class Player {
    public id: string;
    public name: string;
    public x: number;
    public y: number;
    public team: string;
    public sid: number;

    constructor(sid: number) {
        this.sid = sid;
    }
}

export default Player;