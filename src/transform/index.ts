import { EnumTools } from '../types';
import { jsonCompress } from './modules/json-compress';
import { jsonFlat } from './modules/json-flat';
import { jsonFormat } from './modules/json-format';
import { jsonParseDeep } from './modules/json-parse-deep';
import { jsonSort } from './modules/json-sort';
import { jsonNesting } from './modules/json-nesting';
import { json2yaml, yaml2json } from './modules/json-yaml';
import { csv2json, json2csv } from './modules/json-csv';
import { json2Object, object2Json } from './modules/json-object';

type ToolFunction = (input: string) => string | Promise<string>;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.JSON_COMPRESS]: jsonCompress,
  [EnumTools.JSON_FORMAT]: jsonFormat,
  [EnumTools.JSON_PARSE_DEEP]: jsonParseDeep,
  [EnumTools.JSON_SORT]: jsonSort,
  [EnumTools.JSON_FLAT]: jsonFlat,
  [EnumTools.JSON_NESTING]: jsonNesting,
  [EnumTools.JSON_TO_CSV]:  json2csv, // Placeholder for JSON to CSV function
  [EnumTools.CSV_TO_JSON]: csv2json,
  [EnumTools.JSON_TO_TS]: async (input: string) => {
    const { Json2Ts } = await import('@gausszhou/json-to-ts');
    return new Json2Ts().convert(input);
  },
  [EnumTools.JSON_TO_YAML]: json2yaml,
  [EnumTools.YAML_TO_JSON]: yaml2json,
  [EnumTools.OBJ_TO_JSON]: object2Json,
  [EnumTools.JSON_TO_OBJ]: json2Object,
};

export async function processContent(input: string, type: EnumTools) {
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  console.log('processContent', type)
  let output = "";
  let flag = "success";
  try {
    const result = methodMap[type](input);
    if (result instanceof Promise) {
      output = await result;
    } else {
      output = result;
    }
  } catch (error) {
    flag = "failure";
    output = error instanceof Error ? error.message : '处理失败';
  }
  return [output, flag];
}

