import { MooMoo } from "../../../../app";

function killObject(data: Array<1>) {
    let sid = data[0];
    
    
    MooMoo.emit("killObject", data);
    MooMoo.emit("killobject", data);
    MooMoo.emit("12", sid);
    MooMoo.GameObjectManager.removeObjectBySid(sid);

}

export default killObject;
