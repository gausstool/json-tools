import { EnumTools } from './types';
import EditorDiff from './views/EditorDiff.vue';
import EditorDouble from './views/EditorDouble.vue';

interface ITool {
  label: string; // 显示的名称
  value: EnumTools | string;
  component: any; // 对应的组件
  order: number; // 排序顺序
  space?: true;
}

export const tools: ITool[] = [
  { label: 'JSON 转 TypeScript', value: EnumTools.JSON_TO_TS, component: EditorDouble, order: 1 },
  // 文本相关工具
  {
    label: '文本相关工具',
    value: '',
    component: EditorDouble,
    order: 100,
    space: true,
  },  
  { label: 'TEXT 对比', value: EnumTools.TEXT_DIFF, component: EditorDiff, order: 101 },
  { label: 'TEXT 大小', value: EnumTools.TEXT_SIZE, component: EditorDouble, order: 102 },
  { label: 'URL 解析', value: EnumTools.URL_PARSE, component: EditorDouble, order: 103 },
  { label: 'Base64 编码', value: EnumTools.BASE64_ENCODE, component: EditorDouble, order: 104 },
  { label: 'Base64 解码', value: EnumTools.BASE64_DECODE, component: EditorDouble, order: 105 },
  // JSON 核心工具
  {
    label: 'JSON 核心工具',
    value: '',
    component: EditorDouble,
    order: 200,
    space: true,
  },
  { label: 'JSON 压缩', value: EnumTools.JSON_COMPRESS, component: EditorDouble, order: 201 },
  { label: 'JSON 格式化', value: EnumTools.JSON_FORMAT, component: EditorDouble, order: 202 },
  { label: 'JSON 排序', value: EnumTools.JSON_SORT, component: EditorDouble, order: 203 },
  { label: 'JSON 深度解析', value: EnumTools.JSON_PARSE_DEEP, component: EditorDouble, order: 204 },
  { label: 'JSON 嵌套转扁平', value: EnumTools.JSON_FLAT, component: EditorDouble, order: 205 },
  { label: 'JSON 扁平转嵌套', value: EnumTools.JSON_NESTING, component: EditorDouble, order: 206 },

  // 类型转换工具
  {
    label: '类型转换工具',
    value: '',
    component: EditorDouble,
    order: 300,
    space: true,
  },
  { label: 'Object 转 JSON', value: EnumTools.OBJ_TO_JSON, component: EditorDouble, order: 301 },
  { label: 'JSON 转 Object', value: EnumTools.JSON_TO_OBJ, component: EditorDouble, order: 302 },
  { label: 'JSON 转 YAML', value: EnumTools.JSON_TO_YAML, component: EditorDouble, order: 303 },
  { label: 'YAML 转 JSON', value: EnumTools.YAML_TO_JSON, component: EditorDouble, order: 304 },
  { label: 'JSON 转 CSV', value: EnumTools.JSON_TO_CSV, component: EditorDouble, order: 305 },
  { label: 'CSV 转 JSON', value: EnumTools.CSV_TO_JSON, component: EditorDouble, order: 306 },
  // SQL 相关工具
  {
    label: 'SQL 相关工具',
    value: '',
    component: EditorDouble,
    order: 400,
    space: true,
  },
  { label: 'SQL 格式化', value: EnumTools.SQL_FORMAT, component: EditorDouble, order: 401 },
  { label: 'SQL 压缩', value: EnumTools.SQL_COMPRESS, component: EditorDouble, order: 402 },

].sort((a, b) => a.order - b.order);

// 按功能分类的工具配置
export const toolCategories = {
  textTools: tools.filter(tool => tool.order >= 100 && tool.order < 200),
  jsonTools: tools.filter(tool => tool.order >= 200 && tool.order < 300),
  sqlTools: tools.filter(tool => tool.order >= 300 && tool.order < 400),
};

// 导出默认路由配置
export const defaultTool = EnumTools.JSON_TO_TS;
