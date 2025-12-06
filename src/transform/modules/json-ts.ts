import { Json2Ts } from '@gausszhou/json-to-ts';

export function json2Ts(input: string) {
    return new Json2Ts().convert(input);
}
