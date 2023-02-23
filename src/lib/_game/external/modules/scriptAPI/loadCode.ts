// valdiation
import parse from "./src/valdiation/parse";
import validate from "./src/valdiation/valdiate";

// tokenization
import tokenize from "./src/tokenize";

// commands
import commands from "./lib/commands";

// execution
import execute from "./src/execute";

// Step 4: Execution


// Test the parser and executor with your sample script
const script = `
  nameOfFunction<<<
  hit
  wait 100
  chat Hello World
  >>>
  `;
const tokens = tokenize(script);

