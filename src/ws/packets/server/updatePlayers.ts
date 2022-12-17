import chunk from "../../../lib/_game/external/funcs/chunk";
import { MooMoo } from "../../../../app";
import Player from "../../../lib/_game/types/Player";
import cacheItems from "../../../lib/_game/external/funcs/cacheItems";
function updatePlayers(data: Array<any>) {
    let arr = chunk(data, 13);

    MooMoo.ActivePlayerManager.clearPlayers();

    arr.forEach((playerData: Array<any>) => {
        let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(playerData[0]);

        if (!tmpPlayer) {
            tmpPlayer = new Player(playerData[0]);
        }
        tmpPlayer.sid = playerData[0];
        tmpPlayer.x = playerData[1];
        tmpPlayer.y = playerData[2];
        tmpPlayer.dir = playerData[3];
        tmpPlayer.buildIndex = playerData[4];
        tmpPlayer.weaponIndex = playerData[5];
        tmpPlayer.weaponVariant = playerData[6];
        tmpPlayer.team = playerData[7];
        tmpPlayer.isLeader = playerData[8];
        tmpPlayer.skinIndex = playerData[9];
        tmpPlayer.tailIndex = playerData[10];
        tmpPlayer.iconIndex = playerData[11];
        tmpPlayer.zIndex = playerData[12];

        MooMoo.ActivePlayerManager.addPlayer(tmpPlayer);

        if(tmpPlayer.sid === MooMoo.myPlayer.sid) {
            Object.assign(MooMoo.myPlayer, tmpPlayer);
        }
    });
    
    cacheItems();
}

export default updatePlayers;