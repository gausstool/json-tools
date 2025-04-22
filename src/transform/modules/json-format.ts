export function jsonFormat(input: string) {
    const object = JSON.parse(input);
    return JSON.stringify(object, null, 2);
}