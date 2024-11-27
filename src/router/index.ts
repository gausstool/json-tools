import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import EditorDiff from "../views/EditorDiff.vue";
import EditorDouble from "../views/EditorDouble.vue";

const routes = [
  { path: "", redirect: { path: "/json-format" } },
  {
    path: '/text-diff',
    component: EditorDiff
  },
  {
    path: '/text-size',
    component: EditorDouble
  },
  {
    path: '/url-parser',
    component: EditorDouble
  },
  {
    path: '/json-compress',
    component: EditorDouble
  },
  {
    path: '/json-format',
    component: EditorDouble
  },
  {
    path: '/json-sort',
    component: EditorDouble
  },
  {
    path: '/json-parser-deep',
    component: EditorDouble
  },
  {
    path: '/json-to-ts',
    component: EditorDouble
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
