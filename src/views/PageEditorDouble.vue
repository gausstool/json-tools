<template>
  <div id="editor-double" class="page-editor-double">
    <div ref="editor1Container" class="container editor-container"></div>
    <div ref="editor2Container" class="container editor-container"></div>
  </div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { addCommandSave, createEditorState, createEditorInstance } from '@/domain/editor/codemirror-editor';
import { processContent } from '@/domain/transform/modules';
import { EnumTools } from '@/domain/transform/types';
import { EditorView } from '@codemirror/view';
import { EditorManager } from '@/domain/editor/editor-manager';

const codeJsonCompress = `{
  "foo": "bar",
  "hello": "world"
}`;
const codeJsonFormat = `{"foo":"bar","hello":"world"}`;
const codeJsonParser = `{\"d\":\"{\\\"c\\\":\\\"{\\\\\\\"b\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"a\\\\\\\\\\\\\\\":1}\\\\\\\"}\\\"}\"}`;
const codeJsonSort = `{
  "foo": "bar",
  "hello": "world",
  "a": 1,
  "d": 2,
  "c": 1,
  "b": {
    "c": 3,
    "b": 2,
    "a": 1
  }
}`;
const codeJson2Ts = `{
  "foo":"bar",
  "hello":"world",
  "test": {
    "a": 1
  }
}`;
const codeJsonFlat = `{
  "a1": {
    "a2": 1
  },
  "b1": {
    "a2": 2
  },
  "c1": {
    "a2": 3
  }
}`;
const codeJsonNesting = `{
  "a1.a2": 1,
  "b1.a2": 2,
  "c1.a2": 3
}`;

const codeJsonYaml = `{
  "name": "张三",
  "age": 30,
  "address": {
    "street": "人民路",
    "city": "北京"
  },
  "hobbies": ["阅读", "游泳"]
}`;

const codeYamlJson = `name: 张三
age: 30
address:
  street: 人民路
  city: 北京
hobbies:
  - 阅读
  - 游泳
`;
const codeJsonCsv = `[{
  "a1": 1,
  "a2": 2,
  "a3": 3
}]`;

const codeCsvJson = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`;

const codeObjectJson = `{
  a: 1,
  b: 2,
  c: 3
}`;

const codeJson2Obj = `{
  "a": 1,
  "b": 2,
  "c": 3
}`;

const codeSize = `计算字符串所占的内存字节数，
使用 UTF-8 和 UTF-16 的编码方式计算。
UTF-8 和 UTF-16 都是 Unicode 标准的字符编码方案，
但它们的设计选择导致了截然不同的特性和适用场景。
  - UTF-8 使用 1 到 4 个字节 的变长编码来表示一个字符。核心特点：向后兼容 ASCII。
  - UTF-16 使用 2 或 4 个字节 的变长编码来表示一个字符。核心特点：表示非 ASCII 字符通常只需要 2 个字节。
对于 CJK 文本（中文/日文/韩文），UTF-8 通常需要 3 个字节来表示一个字符，而 UTF-16 通常只需要 2 个字节。
对于英文文本，UTF-8 通常需要只需要 1 个字节，而 UTF-16 通常需要 2 个字节来表示一个字符。
因此，在英文文本中，UTF-8 通常是更节省空间的选择，而在 CJK 文本中，UTF-16 通常是更节省空间的选择。
由于 UTF-8 兼容 ASCII，因此在绝大多数现代应用中，UTF-8 是默认选择。`;

const codeTextSort = `3. 按字典序排序
1. 对文本进行排序
2. 每行一个字符串
`;

const codeBase64Encode = `你好世界`;
const codeBase64Decode = `5L2g5aW95LiW55WM`;
const codeUrlEncode = `你好世界`;
const codeUrlDecode = `%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C`;
const codeCspParse = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.example.com; style-src 'self' fonts.example.com; img-src 'self' data: example.com; font-src 'self' data: fonts.example.com; form-action 'self'`;
const codeCspUnparse = `{
  "default-src": ["'self'"],
  "script-src": ["'self'","'unsafe-inline'", "'unsafe-eval'", "cdn.example.com"],
  "style-src": ["'self'", "fonts.example.com"],
  "img-src": ["'self'", "data:", "example.com"],
  "font-src": ["'self'", "data:", "fonts.example.com"],
  "form-action": ["'self'"]
}`;

const codeHttpCacheAnalyze = `Content-Type: text/html
Content-Length: 1024
Date: Tue, 22 Feb 2022 22:22:22 GMT
Cache-Control: max-age=604800`;

const codeHttpCorsAnalyze = `Content-Type: application/json
Content-Length: 123
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: X-Custom-Header, X-Another-Header
Access-Control-Max-Age: 86400`;

const codeSqlFormat = `SELECT id, name, email, created_at FROM users WHERE status = 'active' AND created_at > '2023-01-01' ORDER BY created_at DESC LIMIT 10;`;

const codeSqlCompress = `SELECT 
  id, 
  name, 
  email, 
  created_at 
FROM 
  users 
WHERE 
  status = 'active' 
  AND created_at > '2023-01-01' 
ORDER BY 
  created_at DESC 
LIMIT 10;`;

const codeSemiSplit = `localhost;127.*;10.*;192.168.*`;
const codeCommaSPlit = `a,b,c`;
const codeLineSplit = `a
b
c
d
e
f`;
const editor1Container = ref<HTMLElement>();
const editor2Container = ref<HTMLElement>();

let editor1: EditorView | null = null;
let editor2: EditorView | null = null;
let currentLanguage1 = 'javascript';
let currentLanguage2 = 'javascript';

const route: RouteLocationNormalizedLoaded = useRoute();

async function save(): Promise<void> {
  const code1 = editor1 ? editor1.state.doc.toString() : '';
  const key = `code-tools-${String(route.name)}`;
  await localforage.setItem(key, code1);
}

async function fetch(): Promise<void> {
  const key = `code-tools-${String(route.name)}`;
  await localforage.getItem(key).then(async value => {
    // 根据路由设置语言
    if (route.name == EnumTools.YAML_TO_JSON) {
      currentLanguage1 = 'yaml';
      currentLanguage2 = 'javascript';
    } else if (route.name == EnumTools.JSON_TO_YAML) {
      currentLanguage1 = 'javascript';
      currentLanguage2 = 'yaml';
    } else {
      currentLanguage1 = 'javascript';
      currentLanguage2 = 'javascript';
    }

    // 设置内容
    let initialContent = '';

    if (route.name == EnumTools.YAML_TO_JSON) {
      initialContent = (value as string) || codeYamlJson;
    } else if (route.name == EnumTools.JSON_TO_YAML) {
      initialContent = (value as string) || codeJsonYaml;
    } else if (route.name == EnumTools.JSON_COMPRESS) {
      initialContent = (value as string) || codeJsonCompress;
    } else if (route.name == EnumTools.JSON_FORMAT) {
      initialContent = (value as string) || codeJsonFormat;
    } else if (route.name == EnumTools.JSON_PARSE_DEEP) {
      initialContent = (value as string) || codeJsonParser;
    } else if (route.name == EnumTools.JSON_SORT) {
      initialContent = (value as string) || codeJsonSort;
    } else if (route.name == EnumTools.JSON_TO_TS) {
      initialContent = (value as string) || codeJson2Ts;
    } else if (route.name == EnumTools.JSON_FLAT) {
      initialContent = (value as string) || codeJsonFlat;
    } else if (route.name == EnumTools.JSON_NESTING) {
      initialContent = (value as string) || codeJsonNesting;
    } else if (route.name == EnumTools.JSON_TO_CSV) {
      initialContent = (value as string) || codeJsonCsv;
    } else if (route.name == EnumTools.CSV_TO_JSON) {
      initialContent = (value as string) || codeCsvJson;
    } else if (route.name == EnumTools.OBJ_TO_JSON) {
      initialContent = (value as string) || codeObjectJson;
    } else if (route.name == EnumTools.JSON_TO_OBJ) {
      initialContent = (value as string) || codeJson2Obj;
    } else if (route.name == EnumTools.TEXT_SIZE) {
      initialContent = codeSize;
    } else if (route.name == EnumTools.TEXT_SORT) {
      initialContent = codeTextSort;
    } else if (route.name == EnumTools.URL_PARSE) {
      initialContent = window.location.href;
    } else if (route.name == EnumTools.BASE64_ENCODE) {
      initialContent = codeBase64Encode;
    } else if (route.name == EnumTools.BASE64_DECODE) {
      initialContent = codeBase64Decode;
    } else if (route.name == EnumTools.URL_ENCODE) {
      initialContent = codeUrlEncode;
    } else if (route.name == EnumTools.URL_DECODE) {
      initialContent = codeUrlDecode;
    } else if (route.name == EnumTools.CSP_PARSE) {
      initialContent = codeCspParse;
    } else if (route.name == EnumTools.CSP_UNPARSE) {
      initialContent = codeCspUnparse;
    } else if (route.name == EnumTools.HTTP_CACHE_ANALYZE) {
      initialContent = codeHttpCacheAnalyze;
    } else if (route.name == EnumTools.HTTP_CORS_ANALYZE) {
      initialContent = codeHttpCorsAnalyze;
    } else if (route.name == EnumTools.SQL_FORMAT) {
      initialContent = codeSqlFormat;
    } else if (route.name == EnumTools.SQL_COMPRESS) {
      initialContent = codeSqlCompress;
    } else if (route.name == EnumTools.SEMI_SPLIT) {
      initialContent = codeSemiSplit;
    } else if (route.name == EnumTools.COMMA_SPLIT) {
      initialContent = codeCommaSPlit;
    } else if (route.name == EnumTools.LINE_SPLIT) {
      initialContent = codeLineSplit;
    }

    // 设置编辑器内容
    if (editor1) {
      const newState = await createEditorState(initialContent, currentLanguage1, { onchange: excute });
      editor1.setState(newState);
    }
  });
}

async function excute(): Promise<void> {
  if (!editor1) return;
  const value1 = editor1.state.doc.toString();
  const type = route.name as EnumTools;
  try {
    const value2 = await processContent(value1, type);
    const newState = await createEditorState(value2, currentLanguage2);
    editor2?.setState(newState);
  } catch (error: any) {
    const newState = await createEditorState(error.message, currentLanguage2);
    editor2?.setState(newState);
  }
}
onMounted(async () => {
  const state1 = await createEditorState('', currentLanguage1, { onchange: excute });
  const state2 = await createEditorState('', currentLanguage2);
  if (!editor1Container.value || !editor2Container.value) return;
  editor1 = createEditorInstance(editor1Container.value, state1);
  editor2 = createEditorInstance(editor2Container.value, state2);
  EditorManager.addEditor(editor1);
  EditorManager.addEditor(editor2);
  await fetch();
  excute();
  addCommandSave(editor1, async () => {
    save();
    excute();
  });
});

watch(route, async () => {
  await fetch();
  excute();
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
