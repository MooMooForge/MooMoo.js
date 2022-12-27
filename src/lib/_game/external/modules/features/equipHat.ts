import { MooMoo } from "../../../../../../app";

import hats from "../../../../storage/hats";


function equipHatById(id: number) {
   let hatexists = false;
   hats.find((hat: any) => {
      if (hat.id == id) {
         hatexists = true;
         MooMoo.sendPacket("13c", 0, id, 0)
      }
   })
   if (!hatexists) {
      try {
      throw new Error("Error at equipHatById: Hat with id " + id + " does not exist");
      } catch (e) {
         console.log(e);
      }
   }
}

function equipHatByName(name: string) {
   let hatexists = false;
   hats.find((hat: any) => {
      if (hat.name == name) {
         hatexists = true;
         MooMoo.sendPacket("13c", 0, hat.id, 0)
      }
   })
   if (!hatexists) {
      try {
      throw new Error("Error at equipHatByName: Hat with name " + name + " does not exist");
      } catch (e) {
         console.log(e);
      }
   }
}

function equipHat(hatData: any) {
   if (typeof hatData == "number") {
      equipHatById(hatData);
   } else if (typeof hatData == "string") {
      equipHatByName(hatData);
   } else {
      try {
      throw new Error("Error at equipHat: hatData must be a number or string");
      } catch (e) {
         console.log(e);
      }
   }
}

export default equipHat;