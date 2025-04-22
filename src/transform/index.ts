import { json2ts } from 'json-ts';
import { EnumTools } from '../types';
import { jsonCompress } from './modules/json-compress';
import { jsonFlat } from './modules/json-flat';
import { jsonFormat } from './modules/json-format';
import { jsonParseDeep } from './modules/json-parse-deep';
import { jsonSort } from './modules/json-sort';
import { sizeofByte } from './modules/size-of-byte';
import { urlParse } from './modules/url-parse';
import { jsonNesting } from './modules/json-nesting';

export const methodMap: Record<EnumTools, Function> = {
  "text-diff": (input: string) => input, // Placeholder for text diff function
  "text-size": sizeofByte,
  "url-parse": urlParse,
  "json-compress": jsonCompress,
  "json-format": jsonFormat,
  "json-parse-deep": jsonParseDeep,
  "json-sort": jsonSort,
  "json-flat": jsonFlat,
  "json-nesting": jsonNesting,
  "json-to-csv": (input: string) => input, // Placeholder for JSON to CSV function
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

