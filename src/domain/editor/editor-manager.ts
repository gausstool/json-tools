import { EditorView } from 'codemirror';

export class EditorManager {
  private static editorList: EditorView[] = [];
  public static addEditor(editor: EditorView) {
    this.editorList.push(editor);
  }
  public static dispose() {
    this.editorList.forEach(editor => {
      editor.destroy();
    });
    this.editorList = [];
  }
}
