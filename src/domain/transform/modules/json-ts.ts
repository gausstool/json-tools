export async function json2Ts(input: string): Promise<string> {
    const { Json2Ts } = await import('@gausszhou/json-to-ts');
    return new Json2Ts().convert(input);
}
