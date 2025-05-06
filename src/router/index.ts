import { createRouter, createWebHashHistory } from "vue-router";
import EditorDiff from "../views/EditorDiff.vue";
import EditorDouble from "../views/EditorDouble.vue";
import { EnumTools } from "../types";

const routes = [
  { path: "", redirect: { name: "json-format" } },
  {
    path: "/",
    children: [
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
        name: EnumTools.JSON_FlAT,
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
  history: createWebHashHistory(),
  routes,
});

export default router;
