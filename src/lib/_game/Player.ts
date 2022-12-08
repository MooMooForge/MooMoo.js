class Player {
    public id: number;
    public playerName: string;
    public x: number;
    public y: number;
    public team: string;

    constructor(id: number, playerName: string, x: number, y: number) {
        this.id = id;
        this.playerName = playerName;
        this.x = x;
        this.y = y;
    }
}

export default Player;