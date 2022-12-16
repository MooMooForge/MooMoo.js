class GameObject {
    sid: number;
    x: number;
    y: number;
    dir: number;
    scale: number;
    idk: number;
    type: number;
    ownerSid: number;

    constructor(sid: number) {
        this.sid = sid;
    }
}

export default GameObject;