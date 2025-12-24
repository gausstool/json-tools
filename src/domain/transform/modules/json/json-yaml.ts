export async function json2yaml(input: string): Promise<string> {
    const obj = JSON.parse(input);
    const yaml = await import('js-yaml');
    return yaml.dump(obj);
}

export async function yaml2json(input: string): Promise<string> {
    const yaml = await import('js-yaml');
    const obj = yaml.load(input);
    return JSON.stringify(obj, null, 2);
}