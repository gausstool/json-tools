function sortObject(obj: any) {
    return Object.keys(obj).sort().reduce(function (result: any, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

export function jsonSort(input: string) {
    return JSON.stringify(sortObject(JSON.parse(input)), null, 2)
}
