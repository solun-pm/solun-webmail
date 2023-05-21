export function extractContentOutsideTags(input: string): string[] {
    let regex = /([^<>]+)(?:<[^>]*>)?/g;
    let matches = [];
    let match;

    while ((match = regex.exec(input)) !== null) {
        matches.push(match[1].trim());
    }

    return matches;
}
