import { EnumTools } from '@/types';
import localforage from 'localforage';
import { defineStore } from 'pinia';
import { onMounted, ref, unref } from 'vue';

function getJsonSafe<T>(json: string, defaultValue: T): T {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return defaultValue;
  }
}

const createDefaultTools = () => [
  EnumTools.JSON_COMPRESS,
  EnumTools.JSON_FORMAT,
  EnumTools.JSON_SORT,
  EnumTools.JSON_PARSE_DEEP,
  EnumTools.JSON_TO_TS,
];

export const useToolsStore = defineStore('tools', () => {
  const MAX_TOOLS = 8;
  const recentTools = ref<EnumTools[]>([]);
  
  function addRecentTool(tool: EnumTools) {
    // 如果已存在，先移除再放到最前
    if (recentTools.value.includes(tool)) {
      recentTools.value = recentTools.value.filter(t => t !== tool);
    } else if (recentTools.value.length >= MAX_TOOLS) {
      // 仅在新添加时才检查长度并移除最后一项
      recentTools.value.pop();
    }
    recentTools.value.unshift(tool);
    // 持久化到本地
    localforage.setItem('tools', JSON.stringify(unref(recentTools)));
  }

  onMounted(() => {
    localforage.getItem('tools').then(list => {
      const toolsList = getJsonSafe(list as string, createDefaultTools());      
      recentTools.value = toolsList.slice(0, MAX_TOOLS) as EnumTools[];  
    });
  });
  return { recentTools, addRecentTool };
});
