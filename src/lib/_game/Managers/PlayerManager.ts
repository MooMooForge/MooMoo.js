import Player from "../types/Player";

class PlayerManager {

    players:Player[];

    constructor() {
        this.players = [];
    }

    addPlayer(player:Player) {
        this.players.push(player);
    }

    removePlayer(player:Player) {
        this.players.splice(this.players.indexOf(player), 1);
    }

    removePlayerBySid(sid: number) {
        this.players.splice(this.players.findIndex(player => player.sid === sid), 1);
    }

    removePlayerById(id: string) {
        this.players.splice(this.players.findIndex(player => player.id === id), 1);
    }

    getPlayerBySid(sid: number) {
        return this.players.find(player => player.sid === sid);
    }

    getPlayerById(id: string) {
        return this.players.find(player => player.id === id);
    }

    clearPlayers() {
        this.players = [];
    }

}

export default PlayerManager;