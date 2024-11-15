import { json2ts } from 'json-ts';

function parseJSON(obj: any): Record<string, any> | string {
  if (typeof obj === 'string' && obj.startsWith('{')) {
    try {
      return parseJSON(JSON.parse(obj));
    } catch (error) {
      return obj;
    }
  } else if (Array.isArray(obj)) {
    return obj.map(item => parseJSON(item));
  } else if (typeof obj === 'object' && obj !== null) {
    for (let key in obj) {
      obj[key] = parseJSON(obj[key]);
    }
    return obj;
  } else {
    return obj;
  }
}

function jsonCompress(input: string){
  const object = JSON.parse(input);
  return JSON.stringify(object);
}

function jsonFormat(input: string) {
  const object = JSON.parse(input);
  return JSON.stringify(object, null, 2);
}

function jsonParser(input: string) {
  const object = parseJSON(input);
  return JSON.stringify(object, null, 2);
}

function sortObject(obj:any) {
  return Object.keys(obj).sort().reduce(function (result:any, key) {
      result[key] = obj[key];
      return result;
  }, {});
}

function jsonSort(input: string) {
  return JSON.stringify(sortObject(JSON.parse(input)), null ,2)
}

function urlParser(input: string) {
  const object = new URL(input);
  const map: Record<string, string> = {};
  const params = object.searchParams;
  console.log(params)
  params.forEach((value, key) => {
    map[key] = value
  })
  return JSON.stringify({
    href: object.href,
    protocol: object.protocol,
    host: object.host,
    hostname: object.hostname,
    port: object.port,
    pathname: object.pathname,
    hash: object.hash,
    search: object.search,
    searchParams: map,
  }, null, 2);
}

export async function processContent(input: string, type: string) {
  console.log('processContent', type)
  let output = "";
  let flag = "success";
  
  if (type === "/json-compress") {
    try {
      output = jsonCompress(input)
    } catch (error) {
      flag = "failure"
      output = 'JSON 解析失败';
    }
  } else if (type === "/json-format") {
    try {
      output = jsonFormat(input)
    } catch (error) {
      flag = "failure"
      output = 'JSON 解析失败';
    }
  } else if (type === "/json-parser-deep") {
    try {
      output = jsonParser(input);
    } catch (error) {
      flag = "failure"
      output = 'JSON 解析失败';
    }
  } else if (type === "/json-sort") {
    try {
      output = jsonSort(input);
    } catch (error) {
      flag = "failure"
      output = 'JSON 解析失败';
    }
  } else if (type === "/json-to-ts") {
    try {
      output = json2ts(input);
    } catch (error) {
      flag = "failure"
      output = 'JSON 解析失败';
    }
  } else if (type === "/url-parser") {
    try {
      output = urlParser(input)
    } catch (error) {
      flag = "failure"
      output = 'URL 解析失败';
    }
  } else {
    output = input;
  }
  return [output, flag];
}
