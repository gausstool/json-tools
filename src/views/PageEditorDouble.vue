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
import editorConsoleInstance from '../editor/console';
import {
  addCommandSave,
  addEditorIntoManageList,
  createEditorState,
  createEditorInstance,
  disposeEditorList,
} from '../editor/codemirror-editor';
import { processContent } from '../transform';
import { EnumTools } from '@/types';
import { EditorView } from '@codemirror/view';

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
  editorConsoleInstance.addConsole('\t[INFO]\t' + 'Save Success');
}

async function fetch(): Promise<void> {
  const key = `code-tools-${String(route.name)}`;
  await localforage.getItem(key).then(value => {
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
    }

    // 设置编辑器内容
    if (editor1) {
      const newState = createEditorState(initialContent, currentLanguage1);
      editor1.setState(newState);
    }
  });
  editorConsoleInstance.addConsole('\t[INFO]\t' + 'Fetch Success');
  excute();
}

const handleChange = () => {
  excute();
};

onMounted(async () => {
  const state1 = createEditorState('', currentLanguage1);
  const state2 = createEditorState('', currentLanguage2);
  if (!editor1Container.value || !editor2Container.value) return;
  editor1 = createEditorInstance(editor1Container.value, state1);
  editor2 = createEditorInstance(editor2Container.value, state2, { readOnly: true });

  addEditorIntoManageList(editor1);
  addEditorIntoManageList(editor2);
  await fetch();
  excute();

  addCommandSave(editor1, async () => {
    save();
  });

  // 使用 DOM 事件监听变化
  editor1.dom.addEventListener('input', handleChange);
});

// 清理函数
onUnmounted(() => {
  if (editor1) {
    editor1.dom.removeEventListener('input', handleChange);
  }
});

watch(route, async () => {
  await fetch();
});

onUnmounted(() => {
  disposeEditorList();
});

async function excute(): Promise<void> {
  if (!editor1) return;
  const value1 = editor1.state.doc.toString();
  const type = route.name as EnumTools;
  try {
    const [value, flag] = await processContent(value1, type);
    const newState = createEditorState(value, currentLanguage2);
    editor2?.setState(newState);

    if (flag === 'unrealized') {
      editorConsoleInstance.addConsole('\t[WARN]\t' + 'Format Unrealized');
    }
    if (flag === 'success') {
      editorConsoleInstance.addConsole('\t[INFO]\t' + 'Format Success');
    }
  } catch (error: any) {
    const newState = createEditorState('', currentLanguage2);
    editor2?.setState(newState);
    editorConsoleInstance.addConsole('\t[Error]\t' + error.message);
  }
}
</script>
