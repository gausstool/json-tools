<<template>
  <div id="editor-diff"></div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { processContent } from '../utils/transform';
import {
  addCommandSave,
  addContainer,
  addEditorIntoManageList,
  createEditorContainer, 
  createEditorInstance, 
  createEditorModel, 
  disposeEditorList, 
  setModelLanguage,
  createEditorDiff
} from '../editor/editor';
import editorConsoleInstance from '../editor/console';

const code1 = `// 粘贴需要进行比对的代码
void main() {
    printf("hello, world");
}
`;

const code2 = `// 粘贴需要进行比对的代码
function main() { 
  console.log("Hello World!"); 
}
`;
const model1 = createEditorModel(code1, "javascript");
const model2 = createEditorModel(code2, "javascript");
const $container1 = createEditorContainer();
const editor1 = createEditorDiff($container1)

editor1.setModel({
  original: model1,
  modified: model2,
})

const route = useRoute();

async function save() {
  const code1 = model1.getValue();
  const code2 = model2.getValue()
  await localforage.setItem(`my-tools${route.path}`, JSON.stringify({code1, code2}))
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  await localforage.getItem(`my-tools${route.path}`).then((value: any) => {
    const {code1, code2} = JSON.parse(value);
    model1.setValue(code1)
    model2.setValue(code2)
  })
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Fetch Success")
}

addCommandSave(editor1, async () => {
  save()
})

onMounted(async () => {
  addEditorIntoManageList(editor1)
  addContainer(document.getElementById("editor-diff") as HTMLDivElement, $container1)
  await fetch()
  await excute()
});

onUnmounted(() => {
  disposeEditorList()
});

async function excute() {
}

// editor1.onDidChangeModelContent((e) => {
//   excute();
// });
</script>

<style scoped>
#editor-diff {
  width: 100%;
  height: 100%;
}

</style>

<style>
#editor-diff .container {
  width: 100%;
  height: 100%;
}
</style>