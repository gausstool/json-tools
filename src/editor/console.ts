import dayjs from "dayjs";
import { createEditorState, createEditorInstance } from "./codemirror-editor";

class EditorConsole {
  editor: any;
  container: HTMLElement;
  isShow: boolean = true;
  constructor() {
    const code = ``;
    const language = "text/plain";
    const state = createEditorState(code, language);
    
    // 创建容器
    this.container = document.createElement('div');
    this.container.style.height = '200px';
    this.container.style.borderTop = '1px solid #333';
    
    this.editor = createEditorInstance(this.container, state, {
      readOnly: true
    });
    this.initEvent()
  }
  initEvent(){
    window.addEventListener('keydown',(e)=>{
      if(e.key === '`' && e.ctrlKey){
        this.toggle()
      }
    })
  }
  addConsole(message: string) {
    const originMessage = this.editor.state.doc.toString();
    const now = dayjs().format("HH:mm:ss");
    const newContent = now + message + "\n" + originMessage;
    
    // 创建新的编辑器状态
    const newState = createEditorState(newContent, "text/plain");
    this.editor.setState(newState);
    
    // 滚动到顶部
    this.editor.dispatch({
      selection: { anchor: 0, head: 0 }
    });
  }
  toggle() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.show();
    } else {
      this.hidden();
    }
  }
  show() {
    this.container.parentElement!.style.display = "revert";
  }
  hidden() {
    this.container.parentElement!.style.display = "none";
  }
  mount(dom: HTMLElement) {
    dom.appendChild(this.container);
  }
  unmount() {
    this.container.parentElement!.removeChild(this.container);
  }
}

const editorConsole = new EditorConsole();
export default editorConsole;
