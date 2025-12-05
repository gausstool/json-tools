import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { yaml } from '@codemirror/lang-yaml';
import { sql } from '@codemirror/lang-sql';
import { defaultKeymap } from '@codemirror/commands';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
// 语言映射
const languageMap: Record<string, any> = {
  javascript: javascript,
  json: json,
  yaml: yaml,
  sql: sql,
  'text/plain': () => [],
};

// 编辑器实例管理
let editorList: EditorView[] = [];

export function createEditorState(value: string, language: string) {
  const languageExtension = languageMap[language] ? languageMap[language]() : [];

  return EditorState.create({
    doc: value,
    extensions: [languageExtension, vscodeDark, keymap.of([...defaultKeymap]), EditorView.lineWrapping],
  });
}

export function createEditorInstance(
  $container: HTMLElement,
  state: EditorState,
  options?: {
    readOnly?: boolean;
  }
) {
  const view = new EditorView({
    state,
    parent: $container,
    ...options,
  });

  editorList.push(view);
  return view;
}

export function createEditorDiff($container: HTMLElement) {
  // CodeMirror 6 的 diff 编辑器需要额外的实现
  // 这里暂时返回一个简单的编辑器实例
  const state = createEditorState('', 'text/plain');
  return createEditorInstance($container, state);
}

export function addEditorIntoManageList(editor: EditorView) {
  editorList.push(editor);
}

export function disposeEditorList() {
  editorList.forEach(editor => {
    editor.destroy();
  });
  editorList = [];
}

export function addCommandSave(editor: EditorView, callback: () => void) {
  // CodeMirror 6 的快捷键处理方式不同
  // 这里可以通过 DOM 事件监听来实现
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      callback();
    }
  };

  editor.dom.addEventListener('keydown', handleKeyDown);

  // 返回清理函数
  return () => {
    editor.dom.removeEventListener('keydown', handleKeyDown);
  };
}

// container
let fileCounter = 0;
export function createEditorContainer() {
  const $container = document.createElement('div');
  $container.id = 'container-' + fileCounter.toString(10);
  $container.className = 'container';
  fileCounter += 1; // id++
  return $container;
}

export function addContainer($parent: HTMLElement, $children: HTMLElement) {
  if ($parent) {
    $parent.appendChild($children);
  } else {
    console.log($parent, 'is not a HTMLElement');
  }
}

export default {};
