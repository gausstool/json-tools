export async function json2csv(input: string): Promise<string> {
    const papaparse = await import('papaparse');
    const obj = JSON.parse(input);
    return papaparse.unparse(obj);
}

export async function csv2json(input: string): Promise<string> {
    const papaparse = await import('papaparse');
    const obj = papaparse.parse(input, { header: true });
    return JSON.stringify(obj.data, null, 2);
}