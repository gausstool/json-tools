import { createRouter, createWebHistory } from 'vue-router'
import { tools, defaultTool } from '../config'

// 动态生成路由配置
const routes = [
  { path: '', redirect: { name: defaultTool } },
  {
    path: '/',
    children: tools.filter(tool => tool.component).map(tool => ({
      name: tool.value,
      component: tool.component,
      path: tool.value, // 使用工具名称作为路径
    })),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
