import chunk from "../external/funcs/chunk";
import { MooMoo } from "../../../../app";
import Player from "../Player";

class Leaderboardmanager {
    leaderboard: Map<any, any>;

    constructor() {
        this.leaderboard = new Map();
    }

    updateLeaderboard(data: Array<any>) {
        let arr = chunk(data, 3);
        let players = data.length / 3;

        arr.forEach((playerData: Array<any>, index: number) => {
            let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(playerData[0]);

            if(!tmpPlayer) {
                tmpPlayer = new Player(playerData[0]);
                tmpPlayer.sid = playerData[0];
                tmpPlayer.name = playerData[1];
                MooMoo.GamePlayerManager.addPlayer(tmpPlayer);
            }

            this.leaderboard.set(index + 1, {
                player: tmpPlayer,
                sid: playerData[0],
                name: playerData[1],
                score: playerData[2]
            })
        })
    }

    clearLeaderboard() {
        this.leaderboard = new Map();
    }
}

export default Leaderboardmanager;