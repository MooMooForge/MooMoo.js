import { MooMoo } from "../../../../app";

function updateItems(data: any) {
    MooMoo.emit("updateItems", data);
    MooMoo.emit("updateitems", data);
    MooMoo.emit("17", data);
}

export default updateItems;