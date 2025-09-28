export function encodeBase64(input: string) {
    return btoa(input);
}

export function decodeBase64(input: string) {
    return atob(input);
}
