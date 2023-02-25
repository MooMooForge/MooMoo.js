import { MooMoo } from "../../../../../../app";

// valdiation
import parse from "./src/valdiation/parse";
import validate from "./src/valdiation/valdiate";

// tokenization
import tokenize from "./src/tokenize.coffee";

// commands
import commands from "./lib/commands";

// execution
import execute from "./src/execute";

// importing
function loadAPI() {
    MooMoo.scriptAPI = {
        parse,
        validate,
        tokenize,
        execute
    }
}

export default loadAPI