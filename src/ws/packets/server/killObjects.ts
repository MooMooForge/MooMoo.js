import { MooMoo } from "../../../app";

function killObjects(ownerSid: number) {
    MooMoo.GameObjectManager.removeObjectsByOwnerSid(ownerSid);
}

export default killObjects;