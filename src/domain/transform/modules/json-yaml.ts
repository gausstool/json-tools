import yaml from 'js-yaml';

export function json2yaml(input: string): string {
    const obj = JSON.parse(input);
    return yaml.dump(obj);
}

export function yaml2json(input: string): string {
    const obj = yaml.load(input);
    return JSON.stringify(obj, null, 2);
}