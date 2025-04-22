export function jsonFlat(text: string, prefix = ''): string {
    const obj = JSON.parse(text);
    const result: Record<string, any> = {};

    function traverse(currentObj: any, currentPrefix: string, callback: (prefix: string, value: any) => void) {
        if (typeof currentObj !== 'object' || currentObj === null) {
            callback(currentPrefix, currentObj)
            return;
        }

        for (const key in currentObj) {
            if (currentObj.hasOwnProperty(key)) {
                const newPrefix = currentPrefix ? `${currentPrefix}.${key}` : key;
                traverse(currentObj[key], newPrefix, callback);
            }
        }
    }

    traverse(obj, prefix, (key: string, value: any) => {
        console.log(key, value);
        
        result[key] = value;
    })
    console.log('jsonFlat', result)
    return JSON.stringify(result, null, 2); // 返回格式化后的字符串
}

