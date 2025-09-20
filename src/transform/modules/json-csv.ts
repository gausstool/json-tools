import papaparse from 'papaparse';

export function json2csv(input: string): string {
    const obj = JSON.parse(input);
    return papaparse.unparse(obj);
}

export function csv2json(input: string): string {
    const obj = papaparse.parse(input, { header: true });
    return JSON.stringify(obj.data, null, 2);
}