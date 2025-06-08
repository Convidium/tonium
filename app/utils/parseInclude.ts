function parseInclude(includeArr: string[]): Record<string, any> {
    const result: Record<string, any> = {};
    for (const path of includeArr) {
        const parts = path.split('.');
        let curr = result;
        for (let i = 0; i < parts.length; i++) {
            const key = parts[i];
            if (i === parts.length - 1) {
                curr[key] = true;
            } else {
                curr[key] = curr[key] || { include: {} };
                curr = curr[key].include;
            }
        }
    }
    return result;
}

export default parseInclude;