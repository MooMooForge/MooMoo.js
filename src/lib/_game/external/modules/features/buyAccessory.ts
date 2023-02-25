import { MooMoo } from "../../../../../../app";

import accessories from "../../../../storage/accessories";

function buyAccessoryById(id: number) {
    let accessoryexists = false;
    accessories.find((accessory: any) => {
        if (accessory.id == id) {
            accessoryexists = true;
            MooMoo.sendPacket("13c", 1, id, 1)
        }
    })
    if (!accessoryexists) {
        try {
        throw new Error("Error at buyAccessoryById: Accessory with id " + id + " does not exist");
        } catch (e) {
            console.log(e);
        }
    }
}

function buyAccessoryByName(name: string) {
    let accessoryexists = false;
    accessories.find((accessory: any) => {
        if (accessory.name == name) {
            accessoryexists = true;
            MooMoo.sendPacket("13c", 1, accessory.id, 1)
        }
    })
    if (!accessoryexists) {
        try {
        throw new Error("Error at buyAccessoryByName: Accessory with name " + name + " does not exist");
        } catch (e) {
            console.log(e);
        }
    }
}

function buyAccessory(accessoryData: any) {
    if (typeof accessoryData == "number") {
        buyAccessoryById(accessoryData);
    } else if (typeof accessoryData == "string") {
        buyAccessoryByName(accessoryData);
    } else {
        try {
        throw new Error("Error at buyAccessory: accessoryData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }
}

export default buyAccessory;