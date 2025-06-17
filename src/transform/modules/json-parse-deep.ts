function parseJSON(obj: any): Record<string, any> | string {
    if (typeof obj === 'string' && (obj.startsWith('{') || obj.startsWith('['))) {
        try {
            return parseJSON(JSON.parse(obj));
        } catch (error) {
            console.error(error);
            return obj;
        }
    } else if (Array.isArray(obj)) {
        return obj.map(item => parseJSON(item));
    } else if (typeof obj === 'object' && obj !== null) {
        for (const key in obj) {
            obj[key] = parseJSON(obj[key]);
        }
        return obj;
    } else {
        return obj;
    }
}

export function jsonParseDeep(input: string) {
    const object = parseJSON(input);
    return JSON.stringify(object, null, 2);
}
