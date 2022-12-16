import Player from "./Player"

class Alliance {
    public Leader: Player
    public Members: Player[]
    public Name: string

    public constructor(leader: Player, name: string) {
        this.Leader = leader
        this.Name = name
    }

    public setAliancePlayers(players: Player[]) {
        this.Members = players
    }
}

export default Alliance