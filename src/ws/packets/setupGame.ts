import { MooMoo } from "../../../app"

function setupGame (sid: any) {
   MooMoo.myPlayer = {};
   MooMoo.myPlayer.id = sid;
}

export default setupGame