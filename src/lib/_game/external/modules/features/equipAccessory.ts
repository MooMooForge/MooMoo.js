import { MooMoo } from "../../../../../../app";

import accessories from "../../../../storage/accessories";

function equipAccessoryById(id: number) {
    let accessoryexists = false;
    accessories.find((accessory: any) => {
        if (accessory.id == id) {
            accessoryexists = true;
            MooMoo.sendPacket("13c", 0, id, 1)
        }
    })
    if (!accessoryexists) {
        try {
        throw new Error("Error at equipAccessoryById: Accessory with id " + id + " does not exist");
        } catch (e) {
            console.log(e);
        }
    }
}

function equipAccessoryByName(name: string) {
    let accessoryexists = false;
    accessories.find((accessory: any) => {
        if (accessory.name == name) {
            accessoryexists = true;
            MooMoo.sendPacket("13c", 0, accessory.id, 1)
        }
    })
    if (!accessoryexists) {
        try {
        throw new Error("Error at equipAccessoryByName: Accessory with name " + name + " does not exist");
        } catch (e) {
            console.log(e);
        }
    }
}

function equipAccessory(accessoryData: any) {
    if (typeof accessoryData == "number") {
        equipAccessoryById(accessoryData);
    } else if (typeof accessoryData == "string") {
        equipAccessoryByName(accessoryData);
    } else {
        try {
        throw new Error("Error at equipAccessory: accessoryData must be a number or string");
        } catch (e) {
            console.log(e);
        }
    }
}

export default equipAccessory;