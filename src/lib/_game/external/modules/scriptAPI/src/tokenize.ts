function tokenize(script: string): string[] {
    return script.trim().split(/\n/);
}

export default tokenize