import { MooMoo } from "../../../../../app";
import isElementVisible from "./isElementVisible";
// skid alert
function cacheItems() {
    MooMoo.myPlayer.inventory = {};

    for (let i=0;i<9;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.primary = i;
        }
    }

    for (let i=9;i<16;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.secondary = i;
        }
    }

    for (let i=16;i<19;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.food = i - 16;
        }
    }

    for (let i=19;i<22;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.wall = i - 16;
        }
    }

    for (let i=22;i<26;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.spike = i - 16;
        }
    }

    for (let i=26;i<29;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.mill = i - 16;
        }
    }

    for (let i=29;i<31;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.mine = i - 16;
        }
    }

    for (let i=31;i<33;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.boostPad = i - 16;
            MooMoo.myPlayer.inventory.trap = i - 16;
        }
    }

    for (let i=33;i<39;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString())) && i != 36){
            MooMoo.myPlayer.inventory.turret = i - 16;
        }
    }
    MooMoo.myPlayer.inventory.spawnPad = 36;
    for (let i=36;i<37;i++){
        if (isElementVisible(document.getElementById("actionBarItem" + i.toString()))){
            MooMoo.myPlayer.inventory.spawnPad = i - 16;
        }
    }

}

export default cacheItems;