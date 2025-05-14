import { createRouter, createWebHistory } from "vue-router";
import { EnumTools } from "../types";
import EditorDiff from "../views/EditorDiff.vue";
import EditorDouble from "../views/EditorDouble.vue";

const routes = [
  { path: "", redirect: { name: "json-format" } },
  {
    path: "/",
    children: [
      {
        name: EnumTools.TEXT_DIFF,
        component: EditorDiff,
      },
      {
        name: EnumTools.TEXT_SIZE,
        component: EditorDouble,
      },
      {
        name: EnumTools.URL_PARSE,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_COMPRESS,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_FORMAT,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_SORT,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_PARSE_DEEP,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_TO_TS,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_FLAT,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_NESTING,
        component: EditorDouble,
      },
      {
        name: EnumTools.JSON_TO_YAML,
        component: EditorDouble,
      },
      {
        name: EnumTools.YAML_TO_JSON,
        component: EditorDouble,
      }
    ].map((route) => {
      return {
        ...route,
        path: route.name, // 使用工具名称作为路径
      }
    }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
