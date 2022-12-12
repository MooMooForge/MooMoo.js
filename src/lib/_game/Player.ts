class Player {
    id: string;
    name: string;
    x: number;
    y: number;
    team: string;
    sid: number;
    dir: number;
    buildIndex: number;
    weaponIndex: number;
    weaponVariant: number;
    isLeader: boolean;
    skinIndex: number;
    tailIndex: number;
    iconIndex: number;
    zIndex: any; // idek what that is lmfaoo

    constructor(sid: number) {
        this.sid = sid;
    }
}

export default Player;