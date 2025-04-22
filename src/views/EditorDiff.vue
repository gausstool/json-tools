<<template>
  <div id="editor-diff"></div>
</template>

<script setup lang="ts">
import localforage from 'localforage';
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import editorConsoleInstance from '../editor/console';
import {
  addCommandSave,
  addContainer,
  addEditorIntoManageList,
  createEditorContainer,
  createEditorDiff,
  createEditorModel,
  disposeEditorList
} from '../editor/editor';

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
  const code2 = model2.getValue();
  await localforage.setItem(`code-tools-${String(route.name)}`, JSON.stringify({code1, code2}))
  editorConsoleInstance.addConsole("\t[INFO]\t" + "Save Success")
}

async function fetch() {
  await localforage.getItem(`code-tools-${String(route.name)}`).then((value: any) => {
    const { code1, code2 } = JSON.parse(value);
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
});

onUnmounted(() => {
  disposeEditorList()
});
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