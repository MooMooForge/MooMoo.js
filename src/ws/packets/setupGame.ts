import { MooMoo } from "../../../app"
import place from "../../lib/_game/external/modules/features/place";



function setupGame (sid: any) {
   MooMoo.myPlayer = {};
   MooMoo.myPlayer.sid = sid;
   MooMoo.myPlayer.place = place
   console.log(MooMoo.myPlayer)
}

export default setupGame