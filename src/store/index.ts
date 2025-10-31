import { EnumTools } from '@/types';
import localforage from 'localforage';

const createDefaultTools = () => [
  EnumTools.JSON_COMPRESS,
  EnumTools.JSON_FORMAT,
  EnumTools.JSON_SORT,
  EnumTools.JSON_PARSE_DEEP,
  EnumTools.JSON_TO_TS,
];

class Store {
  private tools: EnumTools[] = createDefaultTools();
  maxTools = 8;
  constructor() {
    localforage.getItem('tools').then((tools) => {
      const list = tools as EnumTools[] || createDefaultTools();
      this.tools = list.slice(0, this.maxTools);
    });
  }

  addTool(tool: EnumTools) {
    if (this.tools.includes(tool)) {
      // 将该工具移动到数组开头
      this.tools = this.tools.filter((t) => t !== tool);
      this.tools.unshift(tool);
      return;
    }
    if (this.tools.length >= this.maxTools) {
      this.tools.pop();
    }
    this.tools.unshift(tool);
    this.saveTools();
  }

  saveTools() {
    localforage.setItem('tools', this.tools);
  }

  getTools() {
    return this.tools;
  }
}

export const store = new Store();
