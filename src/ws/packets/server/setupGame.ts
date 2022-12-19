import { MooMoo } from "../../../../app"

import place from "../../../lib/_game/external/modules/features/place";
import chat from "../../../lib/_game/external/modules/features/chat";

import equipHat from "../../../lib/_game/external/modules/features/equipHat";
import equipAccessory from "../../../lib/_game/external/modules/features/equipAccessory";

import unequipHat from "../../../lib/_game/external/modules/features/unequipHat";
import unequipAccessory from "../../../lib/_game/external/modules/features/unequipAccessory";

import buyHat from "../../../lib/_game/external/modules/features/buyHat";
import buyAccessory from "../../../lib/_game/external/modules/features/buyAccessory";

function setupGame (sid: any) {
   MooMoo.myPlayer = {};
   MooMoo.myPlayer.sid = sid;
   
   // set player functions (features)
   MooMoo.myPlayer.place = place;
   MooMoo.myPlayer.chat = chat;

   MooMoo.myPlayer.equipHat = equipHat;
   MooMoo.myPlayer.equipAccessory = equipAccessory;

   MooMoo.myPlayer.unequipHat = unequipHat;
   MooMoo.myPlayer.unequipAccessory = unequipAccessory;

   MooMoo.myPlayer.buyHat = buyHat;
   MooMoo.myPlayer.buyAccessory = buyAccessory;
}






export default setupGame