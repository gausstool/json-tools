import { EnumTools } from './types';
const EditorDiff = () => import('@/views/PageEditorDiff.vue');
const EditorDouble = () => import('@/views/PageEditorDouble.vue');
const PageWelcome = () => import('@/views/PageWelcome.vue');

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
  {
    label: '文本 相关工具',
    value: '',
    component: EditorDouble,
    order: 1,
    space: true,
  },
  {
    icon: '🔀',
    label: 'TEXT 对比',
    value: EnumTools.TEXT_DIFF,
    component: EditorDiff,
    order: 2,
    description: '对比两个文本字符串的差异',
  },
  {
    icon: '📐',
    label: 'TEXT 大小',
    value: EnumTools.TEXT_SIZE,
    component: EditorDouble,
    order: 3,
    description: '计算文本字符串的字节大小',
  },
  {
    icon: '🔗',
    label: 'URL 解析',
    value: EnumTools.URL_PARSE,
    component: EditorDouble,
    order: 4,
    description: '解析 URL 字符串，提取协议、主机、端口、路径等信息',
  },
  {
    icon: '🌍',
    label: 'URL 编码',
    value: EnumTools.URL_ENCODE,
    component: EditorDouble,
    order: 6,
    description: '对 URL 字符串进行编码，替换特殊字符',
  },
  {
    icon: '🌎',
    label: 'URL 解码',
    value: EnumTools.URL_DECODE,
    component: EditorDouble,
    order: 7,
    description: '对 URL 字符串进行解码，恢复特殊字符',
  },
  {
    icon: '🔡',
    label: 'Base64 编码',
    value: EnumTools.BASE64_ENCODE,
    component: EditorDouble,
    order: 8,
    description: '对文本字符串进行 Base64 编码',
  },
  {
    icon: '🔠',
    label: 'Base64 解码',
    value: EnumTools.BASE64_DECODE,
    component: EditorDouble,
    order: 9,
    description: '对 Base64 编码的字符串进行解码',
  },
  {
    label: 'SQL 相关工具',
    value: '',
    component: EditorDouble,
    order: 100,
    space: true,
  },
  {
    icon: '⛃',
    label: 'SQL 压缩',
    value: EnumTools.SQL_COMPRESS,
    component: EditorDouble,
    order: 101,
    description: '压缩 SQL 语句，移除空格和注释',
  },
  {
    icon: '⛁',
    label: 'SQL 格式化',
    value: EnumTools.SQL_FORMAT,
    component: EditorDouble,
    order: 102,
    description: '格式化 SQL 语句，添加换行和缩进',
  },
  // JSON 核心工具
  {
    label: 'JSON 核心工具',
    value: '',
    component: EditorDouble,
    order: 200,
    space: true,
  },
  {
    icon: '{ }',
    label: 'JSON 压缩',
    value: EnumTools.JSON_COMPRESS,
    component: EditorDouble,
    order: 201,
    description: '压缩 JSON 字符串，移除空格和换行',
  },
  {
    icon: '{ }',
    label: 'JSON 格式化',
    value: EnumTools.JSON_FORMAT,
    component: EditorDouble,
    order: 202,
    description: '格式化 JSON 字符串，添加换行和缩进',
  },
  {
    icon: '{ }',
    label: 'JSON 深度排序',
    value: EnumTools.JSON_SORT,
    component: EditorDouble,
    order: 203,
    description: '对 JSON 对象进行深度排序',
  },
  {
    icon: '{ }',
    label: 'JSON 深度解析',
    value: EnumTools.JSON_PARSE_DEEP,
    component: EditorDouble,
    order: 204,
    description: '深度解析 JSON 字符串，支持嵌套对象和数组',
  },
  {
    icon: '{ }',
    label: 'JSON 嵌套转扁平',
    value: EnumTools.JSON_FLAT,
    component: EditorDouble,
    order: 205,
    description: '将嵌套的 JSON 对象转换为扁平结构',
  },
  {
    icon: '{ }',
    label: 'JSON 扁平转嵌套',
    value: EnumTools.JSON_NESTING,
    component: EditorDouble,
    order: 206,
    description: '将扁平的 JSON 对象转换为嵌套结构',
  },
  {
    icon: '{ }',
    label: 'JSON 对象转接口',
    value: EnumTools.JSON_TO_TS,
    component: EditorDouble,
    order: 207,
    description: '将 JSON 对象转换为 TypeScript 接口',
  },
  // 格式转换工具
  {
    label: '格式转换工具',
    value: '',
    component: EditorDouble,
    order: 300,
    space: true,
  },
  {
    icon: '{ }',
    label: 'JSON 转 Object',
    value: EnumTools.JSON_TO_OBJ,
    component: EditorDouble,
    order: 301,
    description: '将 JSON 字符串转换为 JavaScript 对象',
  },
  {
    icon: '{ }',
    label: 'Object 转 JSON',
    value: EnumTools.OBJ_TO_JSON,
    component: EditorDouble,
    order: 302,
    description: '将 JavaScript 对象转换为 JSON 字符串',
  },
  {
    icon: '{ }',
    label: 'JSON 转 YAML',
    value: EnumTools.JSON_TO_YAML,
    component: EditorDouble,
    order: 303,
    description: '将 JSON 字符串转换为 YAML 字符串',
  },
  {
    icon: '{ }',
    label: 'YAML 转 JSON',
    value: EnumTools.YAML_TO_JSON,
    component: EditorDouble,
    order: 304,
    description: '将 YAML 字符串转换为 JSON 字符串',
  },
  {
    icon: '{ }',
    label: 'JSON 转 CSV',
    value: EnumTools.JSON_TO_CSV,
    component: EditorDouble,
    order: 305,
    description: '将 JSON 字符串转换为 CSV 字符串',
  },
  {
    icon: '{ }',
    label: 'CSV 转 JSON',
    value: EnumTools.CSV_TO_JSON,
    component: EditorDouble,
    order: 306,
    description: '将 CSV 字符串转换为 JSON 字符串',
  },
  {
    label: '请求相关工具',
    value: '',
    component: EditorDouble,
    order: 400,
    space: true,
  },
  {
    icon: '🛡️',
    label: 'CSP 解析',
    value: EnumTools.CSP_PARSE,
    component: EditorDouble,
    order: 401,
    description: '解析 CSP 字符串，提取指令和值',
  },
  {
    icon: '🛡️',
    label: 'CSP 逆解析',
    value: EnumTools.CSP_UNPARSE,
    component: EditorDouble,
    order: 402,
    description: '将 CSP 指令和值转换为字符串',
  },
  {
    icon: '🌐',
    label: 'HTTP 缓存解读',
    value: EnumTools.HTTP_CACHE_ANALYZE,
    component: EditorDouble,
    order: 403,
    description: '解读 HTTP 缓存控制头，提取缓存策略',
  },
  {
    icon: '🌐',
    label: 'HTTP 跨域解读',
    value: EnumTools.HTTP_CORS_ANALYZE,
    component: EditorDouble,
    order: 404,
    description: '解读 HTTP 跨域资源共享头，提取允许的来源',
  },
].sort((a, b) => a.order - b.order);

// 按功能分类的工具配置
export const toolCategories = {
  textTools: tools.filter(tool => tool.order >= 100 && tool.order < 200),
  jsonTools: tools.filter(tool => tool.order >= 200 && tool.order < 300),
  sqlTools: tools.filter(tool => tool.order >= 300 && tool.order < 400),
};

// 导出默认路由配置
export const defaultTool = 'welcome';
