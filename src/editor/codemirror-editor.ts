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
  return view;
}

export function addCommandSave(editor: EditorView, callback: () => void) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
      event.preventDefault();
      callback();
    }
  };
  editor.dom.addEventListener('keydown', handleKeyDown);
  return () => editor.dom.removeEventListener('keydown', handleKeyDown);
}
