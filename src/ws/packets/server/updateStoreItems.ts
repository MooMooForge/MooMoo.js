import { MooMoo } from "../../../../app";

function updateStoreItems(data: any) {
    MooMoo.emit("updateStoreItems", data);
    MooMoo.emit("updatestoreitems", data);
    MooMoo.emit("us", data);
}

export default updateStoreItems;