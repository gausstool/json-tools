import { createRouter, createWebHashHistory } from "vue-router";
import EditorDiff from "../views/EditorDiff.vue";
import EditorDouble from "../views/EditorDouble.vue";

const routes = [
  { path: "", redirect: { name: "json-format" } },
  {
    path: '/',
    children: [
      {
        name: 'text-diff',
        path: 'text-diff',
        component: EditorDiff
      },
      {
        name: 'text-size',
        path: 'text-size',
        component: EditorDouble
      },
      {
        name: 'url-parser',
        path: 'url-parser',
        component: EditorDouble
      },
      {
        name: 'json-compress',
        path: 'json-compress',
        component: EditorDouble
      },
      {
        name: 'json-format',
        path: 'json-format',
        component: EditorDouble
      },
      {
        name: 'json-sort',
        path: 'json-sort',
        component: EditorDouble
      },
      {
        name: 'json-parser-deep',
        path: 'json-parser-deep',
        component: EditorDouble
      },
      {
        name: 'json-to-ts',
        path: 'json-to-ts',
        component: EditorDouble
      },
    ]
  },
  
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
