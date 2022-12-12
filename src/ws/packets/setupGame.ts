import { MooMoo } from "../../../app"

function setupGame (sid: any) {
   MooMoo.myPlayer = {};
   MooMoo.myPlayer.sid = sid;
}

export default setupGame