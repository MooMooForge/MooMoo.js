import chunk from "../../../lib/_game/external/funcs/chunk";
import cacheItems from "../../../lib/_game/external/funcs/cacheItems";

import { MooMoo } from "../../../../app";

import Player from "../../../lib/_game/types/Player";
import GameObject from "../../../lib/_game/types/GameObject";

function updatePlayers(raw: Array<any>) {
    let data = raw[0];
    let arr = chunk(data, 13);

    MooMoo.ActivePlayerManager.clearPlayers();

    arr.forEach((playerData: Array<any>) => {
        let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(playerData[0]);

        if (!tmpPlayer) {
            tmpPlayer = new Player(playerData[0]);
            tmpPlayer.x = playerData[1];
            tmpPlayer.y = playerData[2];
        }
        tmpPlayer.sid = playerData[0];
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

        if (tmpPlayer.sid === MooMoo.myPlayer.sid) {
            Object.assign(MooMoo.myPlayer, tmpPlayer);
        }
        cacheItems();
    });

    MooMoo.emit("updatePlayers", data);
    MooMoo.emit("updateplayers", data);
    MooMoo.emit("33", data);
}

export function updateHookPosition(data: any) {
    if (this instanceof Player || this instanceof GameObject || this.isAI || !this.id) {
        //
    } else {
        let tmpPlayer = MooMoo.GamePlayerManager.getPlayerBySid(this.sid);
        if (tmpPlayer) {
            tmpPlayer.x = data;
            tmpPlayer.y = this.y;
            if (MooMoo.onPositionUpdate) {
                MooMoo.onPositionUpdate(tmpPlayer);
            }
        }

        MooMoo.GamePlayerManager.updatePlayer(this.sid, this);

    }
}

export default updatePlayers;