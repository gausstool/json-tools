import { EnumTools } from './types'
import EditorDiff from './views/EditorDiff.vue'
import EditorDouble from './views/EditorDouble.vue'

interface ITool {
  label: string // 显示的名称
  icon: string // 图标的 URL 或路径
  value: EnumTools
  component: any // 对应的组件
  order: number // 排序顺序
}

export const tools: ITool[] = [
  // 文本相关工具
  { label: 'TEXT 对比', icon: '', value: EnumTools.TEXT_DIFF, component: EditorDiff, order: 101 },
  { label: 'TEXT 大小', icon: '', value: EnumTools.TEXT_SIZE, component: EditorDouble, order: 102 },
  { label: 'URL 解析', icon: '', value: EnumTools.URL_PARSE, component: EditorDouble, order: 103 },
  { label: 'Base64 编码', icon: '', value: EnumTools.BASE64_ENCODE, component: EditorDouble, order: 104 },
  { label: 'Base64 解码', icon: '', value: EnumTools.BASE64_DECODE, component: EditorDouble, order: 105 },

  // JSON 核心工具
  { label: 'JSON 压缩', icon: '', value: EnumTools.JSON_COMPRESS, component: EditorDouble, order: 201 },
  { label: 'JSON 格式化', icon: '', value: EnumTools.JSON_FORMAT, component: EditorDouble, order: 202 },
  { label: 'JSON 排序', icon: '', value: EnumTools.JSON_SORT, component: EditorDouble, order: 203 },
  { label: 'JSON 深度解析', icon: '', value: EnumTools.JSON_PARSE_DEEP, component: EditorDouble, order: 204 },
  { label: 'JSON 嵌套转扁平', icon: '', value: EnumTools.JSON_FLAT, component: EditorDouble, order: 205 },
  { label: 'JSON 扁平转嵌套', icon: '', value: EnumTools.JSON_NESTING, component: EditorDouble, order: 206 },
  { label: 'Object 转 JSON', icon: '', value: EnumTools.OBJ_TO_JSON, component: EditorDouble, order: 207 },
  { label: 'JSON 转 Object', icon: '', value: EnumTools.JSON_TO_OBJ, component: EditorDouble, order: 208 },
  { label: 'JSON 转 YAML', icon: '', value: EnumTools.JSON_TO_YAML, component: EditorDouble, order: 209 },
  { label: 'YAML 转 JSON', icon: '', value: EnumTools.YAML_TO_JSON, component: EditorDouble, order: 210 },
  { label: 'JSON 转 CSV', icon: '', value: EnumTools.JSON_TO_CSV, component: EditorDouble, order: 211 },
  { label: 'CSV 转 JSON', icon: '', value: EnumTools.CSV_TO_JSON, component: EditorDouble, order: 212 },
  { label: 'JSON 转 TypeScript', icon: '', value: EnumTools.JSON_TO_TS, component: EditorDouble, order: 213 },

  // SQL 相关工具
  { label: 'SQL 格式化', icon: '', value: EnumTools.SQL_FORMAT, component: EditorDouble, order: 301 },
].sort((a, b) => a.order - b.order)

// 按功能分类的工具配置
export const toolCategories = {
  textTools: tools.filter(tool => tool.order >= 100 && tool.order < 200),
  jsonTools: tools.filter(tool => tool.order >= 200 && tool.order < 300),
  sqlTools: tools.filter(tool => tool.order >= 300 && tool.order < 400),
}

// 导出默认路由配置
export const defaultTool = EnumTools.JSON_FORMAT
