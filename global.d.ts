// Define custom types
type CommandType = "command";
type FunctionType = "function";
type NodeType = CommandType | FunctionType;

type CustomError = ParseError | ValidationError;

type AstNode = FunctionNode | CommandNode;

interface CommandNode {
  type: CommandType;
  command: string;
  args: string[];
}

interface FunctionNode {
  type: FunctionType;
  name: string;
  body: CommandNode[];
}

interface FunctionTable {
  [name: string]: {
    call: () => void;
  };
}

interface CommandDefinition {
  exec: (args: string[]) => void | Promise<void>;
}

interface CommandTable {
  [key: string]: CommandDefinition;
}

interface IVultr {
  readonly servers: ReadonlyArray<{
    ip: string;
    scheme: string;
    region: string;
    index: number;
    games: ReadonlyArray<{
      playerCount: number;
      isPrivate: boolean;
    }>;
  }>;
}

interface IRecaptchaExecute {
  execute(token: string, action: { action: string }): Promise<string>;
}

interface Window {
  readonly vultr: IVultr;
  readonly grecaptcha: IRecaptchaExecute;
}

interface ParseError {
  type: "ParseError";
  message: string;
}

interface ValidationError {
  type: "ValidationError";
  message: string;
}
