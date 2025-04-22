import { json2ts } from 'json-ts';
import { jsonCompress } from './modules/json-compress';
import { jsonSort } from './modules/json-sort';
import { sizeofByte } from './modules/size-of-byte';
import { urlParse } from './modules/url-parse';
import { jsonFormat } from './modules/json-format';
import { jsonParseDeep } from './modules/json-parse-deep';
import { EnumTools } from '../types';

export const methodMap: Record<EnumTools, Function> = {
  "text-diff": (input: string) => input, // Placeholder for text diff function
  "text-size": sizeofByte,
  "url-parse": urlParse,
  "json-compress": jsonCompress,
  "json-format": jsonFormat,
  "json-parse-deep": jsonParseDeep,
  "json-sort": jsonSort,
  "json-to-ts": json2ts,
}

export async function processContent(input: string, type: EnumTools) {  
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  console.log('processContent', type)
  let output = "";
  let flag = "success";
  try {
    output = methodMap[type](input)
  } catch (error) {
    flag = "failure"
    output = 'JSON 解析失败';
  }  
  return [output, flag];
}

