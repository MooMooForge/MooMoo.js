import { MooMoo } from "../../../../../app";

import hats from "../../../../storage/hats";

function buyHatById(id: number) {
   let hatexists = false;
   hats.find((hat: any) => {
      if (hat.id == id) {
         hatexists = true;
         MooMoo.sendPacket("13c", 1, id, 0)
      }
   })
   if (!hatexists) {
      try {
      throw new Error("Error at buyHatById: Hat with id " + id + " does not exist");
      } catch (e) {
         console.log(e);
      }
   }
}

function buyHatByName(name: string) {
    let hatexists = false;
    hats.find((hat: any) => {
        if (hat.name == name) {
            hatexists = true;
            MooMoo.sendPacket("13c", 1, hat.id, 0)
        }
    })
    if (!hatexists) {
        try {
        throw new Error("Error at buyHatByName: Hat with name " + name + " does not exist");
        } catch (e) {
            console.log(e);
        }
    }
}

function buyHat(hatData: any) {
    if (typeof hatData == "number") {
        buyHatById(hatData);
    } else if (typeof hatData == "string") {
        buyHatByName(hatData);
    } else {
        try {
        throw new Error("Error at buyHat: hatData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }
}

export default buyHat;