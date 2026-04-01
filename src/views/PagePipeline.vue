<template>
  <div class="page-pipeline">
    <div class="pipeline-container">
      <div class="pipeline-left">
        <div class="panel-header">转换函数</div>
        <div class="tool-list">
          <div
            v-for="tool in availableTools"
            :key="tool.value"
            class="tool-item"
            draggable="true"
            @dragstart="onDragStart($event, tool)"
          >
            <span class="tool-icon">{{ tool.icon }}</span>
            <span class="tool-label">{{ tool.label }}</span>
          </div>
        </div>
      </div>
      <div class="pipeline-right">
        <div class="panel-header">
          <span>函数堆栈</span>
          <button class="btn-run" @click="executePipeline">执行</button>
        </div>
        <div
          class="stack-container"
          @dragover.prevent
          @drop="onDrop"
        >
          <div v-if="stack.length === 0" class="empty-hint">
            从左侧拖拽函数到此处
          </div>
          <div
            v-for="(item, index) in stack"
            :key="index"
            class="stack-item"
            draggable="true"
            @dragstart="onStackDragStart($event, index)"
            @dragover.prevent
            @drop="onStackDrop($event, index)"
          >
            <span class="stack-index">{{ index + 1 }}</span>
            <span class="stack-icon">{{ item.icon }}</span>
            <span class="stack-label">{{ item.label }}</span>
            <span class="stack-value">{{ item.value }}</span>
            <button class="btn-remove" @click="removeFromStack(index)">×</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pipeline-editors">
      <div class="editor-section">
        <div class="editor-label">输入</div>
        <div ref="inputContainer" class="editor-container"></div>
      </div>
      <div class="editor-section">
        <div class="editor-label">输出</div>
        <div ref="outputContainer" class="editor-container"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { createEditorInstance, createEditorState } from '@/domain/editor/codemirror-editor';
import { processContent } from '@/domain/transform/modules';
import { tools, type ITool } from '@/domain/transform';
import { EditorView } from '@codemirror/view';
import { EditorManager } from '@/domain/editor/codemirror-editor-manager';

interface StackItem extends ITool {
  tempId?: number;
}

const inputContainer = ref<HTMLElement>();
const outputContainer = ref<HTMLElement>();

let editorInput: EditorView | null = null;
let editorOutput: EditorView | null = null;

const stack = ref<StackItem[]>([]);
let tempIdCounter = 0;

const availableTools = computed(() => {
  return tools.filter(tool => tool.value && !tool.space);
});

function onDragStart(event: DragEvent, tool: ITool) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({ type: 'tool', tool }));
    event.dataTransfer.effectAllowed = 'copy';
  }
}

function onStackDragStart(event: DragEvent, index: number) {
  if (event.dataTransfer) {
    event.dataTransfer.setData('application/json', JSON.stringify({ type: 'stack', index }));
    event.dataTransfer.effectAllowed = 'move';
  }
}

function onDrop(event: DragEvent) {
  if (!event.dataTransfer) return;
  const data = JSON.parse(event.dataTransfer.getData('application/json'));
  if (data.type === 'tool') {
    const newItem: StackItem = { ...data.tool, tempId: ++tempIdCounter };
    stack.value.push(newItem);
    executePipeline();
  }
}

function onStackDrop(event: DragEvent, targetIndex: number) {
  if (!event.dataTransfer) return;
  const data = JSON.parse(event.dataTransfer.getData('application/json'));
  if (data.type === 'stack') {
    const sourceIndex = data.index;
    if (sourceIndex === targetIndex) return;
    const item = stack.value.splice(sourceIndex, 1)[0];
    stack.value.splice(targetIndex, 0, item);
    executePipeline();
  }
}

function removeFromStack(index: number) {
  stack.value.splice(index, 1);
  executePipeline();
}

async function executePipeline() {
  if (!editorInput) return;
  const inputValue = editorInput.state.doc.toString();
  let currentValue = inputValue;

  for (const item of stack.value) {
    try {
      currentValue = await processContent(currentValue, item.value as any);
    } catch (error: any) {
      currentValue = `Error in ${item.label}: ${error.message}`;
      break;
    }
  }

  if (editorOutput) {
    const newState = await createEditorState(currentValue, 'javascript');
    editorOutput.setState(newState);
  }
}

const defaultInput = `{
  "name": "test",
  "value": 123
}`;

onMounted(async () => {
  const state1 = await createEditorState(defaultInput, 'javascript', { onchange: executePipeline });
  const state2 = await createEditorState('', 'javascript');
  if (inputContainer.value && outputContainer.value) {
    editorInput = createEditorInstance(inputContainer.value, state1);
    editorOutput = createEditorInstance(outputContainer.value, state2);
    EditorManager.addEditor(editorInput);
    EditorManager.addEditor(editorOutput);
  }
  executePipeline();
});
</script>

<style lang="scss" scoped>
.page-pipeline {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #272822;
}

.pipeline-container {
  display: flex;
  height: 200px;
  border-bottom: 1px solid #3e3d32;
}

.pipeline-left {
  width: 200px;
  border-right: 1px solid #3e3d32;
  display: flex;
  flex-direction: column;
}

.pipeline-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.panel-header {
  padding: 8px 12px;
  background-color: #1e1e1e;
  color: #cccccc;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.tool-item {
  padding: 6px 8px;
  margin-bottom: 4px;
  background-color: #3e3d32;
  border-radius: 4px;
  cursor: grab;
  color: #cccccc;
  font-size: 12px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: #4e4d42;
  }
}

.tool-icon {
  margin-right: 6px;
}

.stack-container {
  flex: 1;
  padding: 8px;
  overflow-x: auto;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.empty-hint {
  color: #666;
  font-size: 12px;
  padding: 20px;
}

.stack-item {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  background-color: #3e3d32;
  border-radius: 4px;
  cursor: grab;
  color: #cccccc;
  font-size: 12px;
  min-width: 120px;
}

.stack-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: #5c5a4a;
  border-radius: 50%;
  margin-right: 6px;
  font-size: 10px;
}

.stack-icon {
  margin-right: 6px;
}

.stack-value {
  margin-left: 6px;
  color: #888;
  font-size: 10px;
}

.btn-remove {
  margin-left: 8px;
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 14px;
  padding: 0 4px;
  &:hover {
    color: #ff6b6b;
  }
}

.btn-run {
  padding: 4px 12px;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: #45a049;
  }
}

.pipeline-editors {
  flex: 1;
  display: flex;
  min-height: 0;
}

.editor-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  &:first-child {
    border-right: 1px solid #3e3d32;
  }
}

.editor-label {
  padding: 4px 12px;
  background-color: #1e1e1e;
  color: #888;
  font-size: 11px;
}

.editor-container {
  flex: 1;
  overflow: hidden;
  :deep(.cm-editor) {
    height: 100%;
  }
}
</style>
