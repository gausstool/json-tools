import { EditorState } from '@codemirror/state';
import { EditorView, keymap } from '@codemirror/view';
import { defaultKeymap } from '@codemirror/commands';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
// 语言映射
const languageMap: Record<string, () => Promise<any>> = {
  javascript: async () => (await import('@codemirror/lang-javascript')).javascript,
  json: async () => (await import('@codemirror/lang-json')).json,
  yaml: async () => (await import('@codemirror/lang-yaml')).yaml,
  sql: async () => (await import('@codemirror/lang-sql')).sql,
  'text/plain': async () => [],
};

export async function createEditorState(value: string, language: string) {
  const languageLoader = languageMap[language] || languageMap['text/plain'];
  const languageExtension = await languageLoader();
  return EditorState.create({
    doc: value,
    extensions: [vscodeDark, keymap.of([...defaultKeymap]), EditorView.lineWrapping, languageExtension()],
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
