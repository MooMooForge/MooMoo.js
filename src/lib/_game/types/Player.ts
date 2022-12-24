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
    health: number;
    zIndex: any; // idek what that is lmfaoo
    resources: any

    constructor(sid: number) {
        this.sid = sid;
        this.resources = {
            wood: 0,
            stone: 0,
            food: 0,
            points: 0,
            kills: 0

            
        };
    }
}

export default Player;