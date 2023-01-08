// ==UserScript==
// @name         MooMoo.io autoheal
// @version      1
// @description  MooMoo.js autoheal
// @author       Nuro
// @match        *://*.moomoo.io/*
// @require      https://greasyfork.org/scripts/456235-moomoo-js/code/MooMoojs.js?version=1136105
// @run-at       document-start
// ==/UserScript==

// https://nuroc.github.io/MooMoo.js/#installing-and-getting-started
const MooMoo = (function MooMooJS_beta() {})[69]

// https://github.com/NuroC/moomoo-in-depth/tree/main/protocol/server#updatehealth
MooMoo.addEventListener("updatehealth", (data) => {
    let sid = data[0]
    let health = data[1]
    
    // https://nuroc.github.io/MooMoo.js/Player#accessing-player-data-and-information
    if (MooMoo.myPlayer.sid === sid && health < 100) {

        // https://nuroc.github.io/MooMoo.js/Player#accessing-player-data-and-information
        let food = MooMoo.myPlayer.inventory.food;

        // https://nuroc.github.io/MooMoo.js/Player#placing-items
        MooMoo.myPlayer.place(food)
    }
})
