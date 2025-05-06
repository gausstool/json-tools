export function jsonCompress(input: string) {
    const object = JSON.parse(input);
    return JSON.stringify(object);
}