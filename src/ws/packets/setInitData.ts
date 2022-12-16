import Alliance from "../../lib/_game/types/Alliance";
import Player from "../../lib/_game/types/Player";

import { MooMoo } from "../../../app";

type teamObj = {
    teams: Array<any>
}

function setInitData(data: teamObj) {
    let teams = data.teams;
    for (let i = 0; i < teams.length; i++) {
        let team = teams[i];
        let name = team.sid;
        let owner = team.owner;
        let alliance = new Alliance(new Player(owner), name);
        MooMoo.teams.push(alliance);
    }
}

export default setInitData