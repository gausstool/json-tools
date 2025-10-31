function sortObject(obj: any) {
    return Object.keys(obj).sort().reduce(function (result: any, key) {
        result[key] = typeof obj[key] === 'object' ? sortObject(obj[key]) : obj[key];
        return result;
    }, {});
}

export function jsonSort(input: string) {
    return JSON.stringify(sortObject(JSON.parse(input)), null, 2)
}
