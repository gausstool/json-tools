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
import { json2yaml, yaml2json } from './modules/json-yaml';
import { csv2json, json2csv } from './modules/json-csv';
import { json2Object, object2Json } from './modules/json-object';
import { encodeBase64 } from './modules/base64';
import { decodeBase64 } from './modules/base64';
import { sqlFormat } from './modules/sql-format';
import { sqlCompress } from './modules/sql-compress';

type ToolFunction = (input: string) => string;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.TEXT_DIFF]: (input: string) => input, // Placeholder for text diff function
  [EnumTools.TEXT_SIZE]: sizeofByte,
  [EnumTools.URL_PARSE]: urlParse,
  [EnumTools.JSON_COMPRESS]: jsonCompress,
  [EnumTools.JSON_FORMAT]: jsonFormat,
  [EnumTools.JSON_PARSE_DEEP]: jsonParseDeep,
  [EnumTools.JSON_SORT]: jsonSort,
  [EnumTools.JSON_FLAT]: jsonFlat,
  [EnumTools.JSON_NESTING]: jsonNesting,
  [EnumTools.JSON_TO_CSV]:  json2csv, // Placeholder for JSON to CSV function
  [EnumTools.CSV_TO_JSON]: csv2json,
  [EnumTools.JSON_TO_TS]: json2ts,
  [EnumTools.JSON_TO_YAML]: json2yaml,
  [EnumTools.YAML_TO_JSON]: yaml2json,
  [EnumTools.OBJ_TO_JSON]: object2Json,
  [EnumTools.JSON_TO_OBJ]: json2Object,
  [EnumTools.BASE64_ENCODE]: encodeBase64,
  [EnumTools.BASE64_DECODE]: decodeBase64,
  [EnumTools.SQL_FORMAT]: sqlFormat,
  [EnumTools.SQL_COMPRESS]: sqlCompress,
};

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
    flag = "failure";
    output = error instanceof Error ? error.message : '处理失败';
  }  
  return [output, flag];
}

