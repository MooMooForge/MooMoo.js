import { MooMoo } from "../../../../app"

import place from "../../../lib/_game/external/modules/features/place";
import chat from "../../../lib/_game/external/modules/features/chat";


function setupGame (sid: any) {
   MooMoo.myPlayer = {};
   MooMoo.myPlayer.sid = sid;
   
   // set player functions (features)
   MooMoo.myPlayer.place = place;
   MooMoo.myPlayer.chat = chat;
}

export default setupGame