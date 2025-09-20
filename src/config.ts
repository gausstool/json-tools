import { EnumTools } from "./types";

interface ITool {
  label: string; // 显示的名称
  icon: string; // 图标的 URL 或路径
  value: EnumTools;
}

export const tools: ITool[] = [
  {
    label: "TEXT 对比",
    icon: "",
    value: EnumTools.TEXT_DIFF,
  },
  {
    label: "TEXT 大小",
    icon: "",
    value: EnumTools.TEXT_SIZE,
  },
  {
    label: "URL 解析",
    icon: "",
    value: EnumTools.URL_PARSE,
  },
  {
    label: "JSON 压缩",
    icon: "",
    value: EnumTools.JSON_COMPRESS,
  },
  {
    label: "JSON 格式化",
    icon: "",
    value: EnumTools.JSON_FORMAT,
  },
  {
    label: "JSON 排序",
    icon: "",
    value: EnumTools.JSON_SORT,
  },
  {
    label: "JSON 深度解析",
    icon: "",
    value: EnumTools.JSON_PARSE_DEEP,
  },
  {
    label: "JSON 嵌套转扁平",
    icon: "",
    value: EnumTools.JSON_FLAT,
  },
  {
    label: "JSON 扁平转嵌套",
    icon: "",
    value: EnumTools.JSON_NESTING,
  },
  {
    label: "JSON 转 YAML",
    icon: "",
    value: EnumTools.JSON_TO_YAML,
  },
  {
    label: "YAML 转 JSON",
    icon: "",
    value: EnumTools.YAML_TO_JSON,
  },
  {
    label: "JSON 转 CSV",
    icon: "",
    value: EnumTools.JSON_TO_CSV,
  },
  {
    label: "CSV 转 JSON",
    icon: "",
    value: EnumTools.CSV_TO_JSON,
  },
    {
    label: "JSON 转 TypeScript",
    icon: "",
    value: EnumTools.JSON_TO_TS,
  },
];
