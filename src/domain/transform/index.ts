import { EnumTools } from './types';
import PageWelcome from '@/views/PageWelcome.vue';
const EditorDouble = () => import('@/views/PageEditorDouble.vue');

export interface ITool {
  icon?: string;
  label: string; // 显示的名称
  value: EnumTools | string;
  component: any; // 对应的组件
  order: number; // 排序顺序
  space?: boolean;
  description?: string;
}

export const tools: ITool[] = [
  // 欢迎页面
  { icon: '👋', label: '欢迎', value: 'welcome', component: PageWelcome, order: 0 },
  // JSON 核心工具
  {
    label: 'JSON 核心工具',
    value: '',
    component: EditorDouble,
    order: 600,
    space: true,
  },
  {
    icon: '{ }',
    label: 'JSON 压缩',
    value: EnumTools.JSON_COMPRESS,
    component: EditorDouble,
    order: 601,
    description: '压缩 JSON 字符串，移除空格和换行',
  },
  {
    icon: '{ }',
    label: 'JSON 格式化',
    value: EnumTools.JSON_FORMAT,
    component: EditorDouble,
    order: 602,
    description: '格式化 JSON 字符串，添加换行和缩进',
  },
  {
    icon: '{ }',
    label: 'JSON 深度排序',
    value: EnumTools.JSON_SORT,
    component: EditorDouble,
    order: 603,
    description: '对 JSON 对象进行深度排序',
  },
  {
    icon: '{ }',
    label: 'JSON 深度解析',
    value: EnumTools.JSON_PARSE_DEEP,
    component: EditorDouble,
    order: 604,
    description: '深度解析 JSON 字符串，支持嵌套对象和数组',
  },

  {
    icon: '📋',
    label: 'JSON 对象转接口',
    value: EnumTools.JSON_TO_TS,
    component: EditorDouble,
    order: 605,
    description: '将 JSON 对象转换为 TypeScript 接口',
  },
  // 格式转换工具

  {
    label: '格式转换工具',
    value: '',
    component: EditorDouble,
    order: 700,
    space: true,
  },
      {
    icon: '🧊',
    label: 'JSON 嵌套转扁平',
    value: EnumTools.JSON_FLAT,
    component: EditorDouble,
    order: 701,
    description: '将嵌套的 JSON 对象转换为扁平结构',
  },
  {
    icon: '🧊',
    label: 'JSON 扁平转嵌套',
    value: EnumTools.JSON_NESTING,
    component: EditorDouble,
    order: 702,
    description: '将扁平的 JSON 对象转换为嵌套结构',
  },
  {
    icon: '📦',
    label: 'JSON 转 Object',
    value: EnumTools.JSON_TO_OBJ,
    component: EditorDouble,
    order: 703,
    description: '将 JSON 字符串转换为 JavaScript 对象',
  },
  {
    icon: '📦',
    label: 'Object 转 JSON',
    value: EnumTools.OBJ_TO_JSON,
    component: EditorDouble,
    order: 704,
    description: '将 JavaScript 对象转换为 JSON 字符串',
  },
  {
    icon: '📄',
    label: 'JSON 转 YAML',
    value: EnumTools.JSON_TO_YAML,
    component: EditorDouble,
    order: 705,
    description: '将 JSON 字符串转换为 YAML 字符串',
  },
  {
    icon: '📄',
    label: 'YAML 转 JSON',
    value: EnumTools.YAML_TO_JSON,
    component: EditorDouble,
    order: 706,
    description: '将 YAML 字符串转换为 JSON 字符串',
  },
  {
    icon: '🧾',
    label: 'JSON 转 CSV',
    value: EnumTools.JSON_TO_CSV,
    component: EditorDouble,
    order: 707,
    description: '将 JSON 字符串转换为 CSV 字符串',
  },
  {
    icon: '🧾',
    label: 'CSV 转 JSON',
    value: EnumTools.CSV_TO_JSON,
    component: EditorDouble,
    order: 708,
    description: '将 CSV 字符串转换为 JSON 字符串',
  },
].sort((a, b) => a.order - b.order);


// 导出默认路由配置
export const defaultTool = 'welcome';
