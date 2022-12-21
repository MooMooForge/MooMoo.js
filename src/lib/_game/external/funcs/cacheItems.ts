import { MooMoo } from "../../../../app";
function cacheItems() {
    MooMoo.myPlayer.inventory = {};

    const inventoryCategories = [
        { category: "primary", start: 0, end: 9 },
        { category: "secondary", start: 9, end: 16 },
        { category: "food", start: 16, end: 19, subtract: true },
        { category: "wall", start: 19, end: 22, subtract: true },
        { category: "spike", start: 22, end: 26, subtract: true },
        { category: "mill", start: 26, end: 29, subtract: true },
        { category: "mine", start: 29, end: 31, subtract: true },
        { category: "boostPad", start: 31, end: 33, subtract: true },
        { category: "trap", start: 31, end: 33, subtract: true },
        { category: "turret", start: 33, end: 36, subtract: true },
        { category: "spawnPad", start: 36, end: 37, subtract: true }
    ];

    for (let i = 0; i < inventoryCategories.length; i++) {
        const { category, start, end, subtract } = inventoryCategories[i];
        for (let j = start; j < end; j++) {
            const element = document.getElementById(`actionBarItem${j}`);
            if (element && element.offsetParent !== null) {
                MooMoo.myPlayer.inventory[category] = subtract ? j - 16 : j;
                break;
            }
        }
    }
}

export default cacheItems;
