<template>
  <div id="editor-double"></div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import editorConsoleInstance from '../editor/console';
import {
  addCommandSave,
  addContainer,
  addEditorIntoManageList,
  createEditorContainer,
  createEditorInstance,
  createEditorModel,
  disposeEditorList
} from '../editor/editor';
import { processContent } from '../transform';
import { EnumTools } from '@/types';

const codeSize = `计算字符串所占的内存字节数，使用UTF-8的编码方式计算`;
const codeJsonCompress = `{
  "foo": "bar",
  "hello": "world"
}`
const codeJsonFormat = `{"foo":"bar","hello":"world"}`;
const codeJsonParser = `{\"d\":\"{\\\"c\\\":\\\"{\\\\\\\"b\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"a\\\\\\\\\\\\\\\":1}\\\\\\\"}\\\"}\"}`;
const codeJsonSort = `{"foo":"bar","hello":"world","a": 1, "d": 2, "c": 1}`;
const codeJson2Ts = `{
  "foo":"bar",
  "hello":"world",
  "test": {
    "a": 1
  }
}`
const codeJsonFlat = `{"a1":{"a2":1},"b1":{"a2":2},"c1":{"a2": 3}}`;
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
`
const codeJsonCsv = `[{
  "a1": 1,
  "a2": 2,
  "a3": 3
}]`

const codeCsvJson = `Column 1,Column 2,Column 3,Column 4
1-1,1-2,1-3,1-4
2-1,2-2,2-3,2-4
3-1,3-2,3-3,3-4
4,5,6,7`

const codeObjectJson = `{
  a: 1,
  b: 2,
  c: 3
}`

const codeJson2Obj = `{
  "a": 1,
  "b": 2,
  "c": 3
}`

const codeBase64Encode = `你好世界`
const codeBase64Decode = `5L2g5aW95LiW55WM`
const codeUrlEncode = `你好世界`
const codeUrlDecode = `%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C`
const codeCspParse = `Content-Security-Policy: default-src 'self'; img-src 'self' example.com; script-src 'unsafe-inline' 'unsafe-eval' cdn.example.com; style-src 'self' fonts.example.com`

const codeSqlFormat = `SELECT id, name, email, created_at FROM users WHERE status = 'active' AND created_at > '2023-01-01' ORDER BY created_at DESC LIMIT 10;`

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
LIMIT 10;`

const code1 = ``;
const code2 = ``;
let model1 = createEditorModel(code1, "javascript");
let model2 = createEditorModel(code2, "javascript");
const $container1 = createEditorContainer();
const $container2 = createEditorContainer();
const editor1 = createEditorInstance($container1, model1);
const editor2 = createEditorInstance($container2, model2, { readOnly: true }); // 第二个编辑器为只读

const route = useRoute();

async function save() {
  const code1 = model1.getValue();
  const key = `code-tools-${String(route.name)}`;
  await localforage.setItem(key, code1)
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  const key = `code-tools-${String(route.name)}`;
  await localforage.getItem(key).then((value) => {

    if (route.name == EnumTools.YAML_TO_JSON) {
      model1 = createEditorModel('', 'yaml');
      editor1.setModel(model1)
      model2 = createEditorModel('', 'javascript');
      editor2.setModel(model2)
    } else if (route.name == EnumTools.JSON_TO_YAML) {
      model1 = createEditorModel('', 'javascript');
      editor1.setModel(model1)
      model2 = createEditorModel('', 'yaml');
      editor2.setModel(model2)
    } else if (route.name == EnumTools.SQL_FORMAT || route.name == EnumTools.SQL_COMPRESS) {
      model1 = createEditorModel('', 'sql');
      editor1.setModel(model1)
      model2 = createEditorModel('', 'sql');
      editor2.setModel(model2)
    } else {
      model1 = createEditorModel('', 'javascript');
      editor1.setModel(model1)
      model2 = createEditorModel('', 'javascript');
      editor2.setModel(model2)
    }
  
    if (route.name == EnumTools.YAML_TO_JSON) {
      model1.setValue(value as string || codeYamlJson)
    } 
    if (route.name == EnumTools.JSON_TO_YAML) {  
      model1.setValue(value as string || codeJsonYaml)
    }

    if (route.name == 'text-size') {
      model1.setValue(value as string || codeSize)
    }
    if (route.name == 'url-parse') {
      model1.setValue(value as string || window.location.href)
    }
    if (route.name == 'base64-encode') {
      model1.setValue(value as string || codeBase64Encode)
    }
    if (route.name == 'base64-decode') {
      model1.setValue(value as string || codeBase64Decode)
    }
    if (route.name == 'url-encode') {
      model1.setValue(value as string || codeUrlEncode)
    }
    if (route.name == 'url-decode') {
      model1.setValue(value as string || codeUrlDecode)
    }
    if (route.name == 'csp-parse') {
      model1.setValue(value as string || codeCspParse)
    }
    if (route.name == 'json-compress') {
      model1.setValue(value as string || codeJsonCompress)
    }
    if (route.name == 'json-format') {
      model1.setValue(value as string || codeJsonFormat)
    }
    if (route.name == 'json-parse-deep') {
      model1.setValue(value as string || codeJsonParser)
    }
    if (route.name == 'json-sort') {
      model1.setValue(value as string || codeJsonSort)
    }
    if (route.name == 'json-to-ts') {
      model1.setValue(value as string || codeJson2Ts)
    }
    if (route.name == 'json-flat') {
      model1.setValue(value as string || codeJsonFlat)
    }
    if (route.name == 'json-nesting') {
      model1.setValue(value as string || codeJsonNesting)
    }
    if (route.name == 'json-to-csv') {
      model1.setValue(value as string || codeJsonCsv)
    }
    if (route.name == 'csv-to-json') {
      model1.setValue(value as string || codeCsvJson)
    }
    
    if (route.name == 'obj-to-json') {
      model1.setValue(value as string || codeObjectJson)
    }
    if (route.name == 'json-to-obj') {
      model1.setValue(value as string || codeJson2Obj)
    }
    if (route.name == 'sql-format') {
      model1.setValue(value as string || codeSqlFormat)
    }
    if (route.name == 'sql-compress') {
      model1.setValue(value as string || codeSqlCompress)
    }
  })
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Fetch Success")
}

addCommandSave(editor1, async () => {
  save()
})

onMounted(async () => {
  addEditorIntoManageList(editor1);
  addEditorIntoManageList(editor2);
  addContainer(document.getElementById("editor-double") as HTMLElement, $container1);
  addContainer(document.getElementById("editor-double") as HTMLElement, $container2);
  await fetch()
});

watch(route, async () => {
  await fetch()
});

onUnmounted(() => {
  disposeEditorList()
});

async function excute() {
  const value1 = editor1.getValue();
  const type = route.name as EnumTools; // 默认类型为 text-size
  try {
    const [value, flag] = await processContent(value1, type);
    model2.setValue(value);
    if (flag === "unrealized") {
      editorConsoleInstance.addConsole("\t[WARN]\t" + "Format Unrealized");
    }
    if (flag === "success") {
      editorConsoleInstance.addConsole("\t[INFO]\t" + "Format Success");
    }
  } catch (error: any) {
    editor2.setValue("");
    editorConsoleInstance.addConsole("\t[Error]\t" + error.message);
  }
}

editor1.onDidChangeModelContent(() => {
  excute();
});
</script>

<style scoped>
#editor-double {
  width: 100%;
  height: 100%;
  display: flex;
}

</style>

<style>
#editor-double .container {
  width: 50%;
  height: 100%;
}
</style>
