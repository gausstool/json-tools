function modifyObject(obj: any, path: string, value: any): Record<string, any> {
    const keys = path.split('.');
    let current = obj;
    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value; // 最后一个键设置值
        } else {
            current[key] = {}; // 中间的键创建空对象
            current = current[key]; // 移动到下一级
        }
    })
    return obj;
}

export function jsonNesting(text: string): string {
    const obj = JSON.parse(text);
    const result: Record<string, any> = {};
    Object.keys(obj).forEach(key => {
        modifyObject(result, key, obj[key]);
    })
    return JSON.stringify(result, null, 2); // 返回格式化后的字符串
}