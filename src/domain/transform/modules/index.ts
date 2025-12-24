import { EnumTools } from '../types';
import { jsonCompress } from './json/json-compress';
import { jsonFlat } from './json/json-flat';
import { jsonFormat } from './json/json-format';
import { jsonParseDeep } from './json/json-parse-deep';
import { jsonSort } from './json/json-sort';
import { jsonNesting } from './json/json-nesting';
import { json2yaml, yaml2json } from './json/json-yaml';
import { csv2json, json2csv } from './json/json-csv';
import { json2Object, object2Json } from './json/json-object';
import { json2Ts } from './json/json-ts';
import { cspParse } from './http/csp-parse';
import { cspUnparse } from './http/csp-unparse';
import { httpCacheAnalyze } from './http/http-cache-analyze';
import { httpCorsAnalyze } from './http/http-cors-analyze';
import { sqlCompress } from './sql/sql-compress';
import { sqlFormat } from './sql/sql-format';
import { encodeBase64, decodeBase64 } from './text/base64';
import { sizeofByte } from './text/size-of-byte';
import { textSort } from './text/text-sort';
import { semiSplit, commaSplit, lineSplit } from './text/text-split';
import { urlEncode, urlDecode } from './url/url-encode';
import { urlParse } from './url/url-parse';

type ToolFunction = (input: string) => string | Promise<string>;

export const methodMap: Record<EnumTools, ToolFunction> = {
  [EnumTools.JSON_COMPRESS]: jsonCompress,
  [EnumTools.JSON_FORMAT]: jsonFormat,
  [EnumTools.JSON_PARSE_DEEP]: jsonParseDeep,
  [EnumTools.JSON_SORT]: jsonSort,
  [EnumTools.JSON_FLAT]: jsonFlat,
  [EnumTools.JSON_NESTING]: jsonNesting,
  [EnumTools.JSON_TO_CSV]: json2csv, // Placeholder for JSON to CSV function
  [EnumTools.CSV_TO_JSON]: csv2json,
  [EnumTools.JSON_TO_TS]: json2Ts,
  [EnumTools.JSON_TO_YAML]: json2yaml,
  [EnumTools.YAML_TO_JSON]: yaml2json,
  [EnumTools.OBJ_TO_JSON]: object2Json,
  [EnumTools.JSON_TO_OBJ]: json2Object,
  [EnumTools.TEXT_DIFF]: (input: string) => input, // Placeholder for text diff function
  [EnumTools.TEXT_SORT]: textSort, // Placeholder for text sort function
  [EnumTools.TEXT_SIZE]: sizeofByte,
  [EnumTools.REGEX_TEST]: (input: string) => input, // Placeholder for regex test function
  [EnumTools.URL_PARSE]: urlParse,
  [EnumTools.URL_ENCODE]: urlEncode,
  [EnumTools.URL_DECODE]: urlDecode,
  [EnumTools.CSP_PARSE]: cspParse,
  [EnumTools.CSP_UNPARSE]: cspUnparse,
  [EnumTools.HTTP_CACHE_ANALYZE]: httpCacheAnalyze,
  [EnumTools.HTTP_CORS_ANALYZE]: httpCorsAnalyze,
  [EnumTools.BASE64_ENCODE]: encodeBase64,
  [EnumTools.BASE64_DECODE]: decodeBase64,
  [EnumTools.SQL_FORMAT]: sqlFormat,
  [EnumTools.SQL_COMPRESS]: sqlCompress,
  [EnumTools.SEMI_SPLIT]: semiSplit,
  [EnumTools.COMMA_SPLIT]: commaSplit,
  [EnumTools.LINE_SPLIT]: lineSplit,
};

export async function processContent(input: string, type: EnumTools) {
  if (!methodMap[type]) {
    throw new Error(`Unsupported type: ${type}`);
  }
  return await methodMap[type](input);
}
