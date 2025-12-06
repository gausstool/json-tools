import { EnumTools } from '../types';
import { jsonCompress } from './json-compress';
import { jsonFlat } from './json-flat';
import { jsonFormat } from './json-format';
import { jsonParseDeep } from './json-parse-deep';
import { jsonSort } from './json-sort';
import { jsonNesting } from './json-nesting';
import { json2yaml, yaml2json } from './json-yaml';
import { csv2json, json2csv } from './json-csv';
import { json2Object, object2Json } from './json-object';
import { json2Ts } from './json-ts';

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
  [EnumTools.JSON_TO_TS]: json2Ts,
  [EnumTools.JSON_TO_YAML]: json2yaml,
  [EnumTools.YAML_TO_JSON]: yaml2json,
  [EnumTools.OBJ_TO_JSON]: object2Json,
  [EnumTools.JSON_TO_OBJ]: json2Object,
};

export async function processContent(input: string, type: EnumTools) {
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  return await methodMap[type](input);
}

