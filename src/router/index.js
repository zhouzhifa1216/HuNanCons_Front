import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { isAuthenticated, getToken } from "../api";

Vue.use(VueRouter);

// 创建路由实例
const router = new VueRouter({
  routes,
  linkActiveClass: "active",
  scrollBehavior(to, from, savedPosition) {
    // 页面滚动到顶部
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/**
 * 全局前置守卫
 * 处理身份验证逻辑
 */
router.beforeEach((to, from, next) => {
  // 显示加载指示器（如果需要）
  // NProgress.start();

  const token = getToken();
  const authenticated = isAuthenticated();

  // 检查路由是否需要权限
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 权限控制逻辑
  if (requiresAuth && !authenticated) {
    // 用户未登录，需要鉴权的页面重定向到登录
    next({
      path: "/login",
      query: { redirect: to.fullPath }, // 保存重定向信息
    });
  } else if (to.path === "/login" && authenticated) {
    // 用户已登录，尝试访问登录页，重定向到首页
    next("/dashboard");
  } else {
    // 正常导航
    next();
  }
});

/**
 * 全局后置钩子
 * 设置页面标题等
 */
router.afterEach((to, from) => {
  // 结束加载指示器（如果需要）
  // NProgress.done();

  // 设置页面标题
  const defaultTitle = "Vue Paper Dashboard";
  document.title = to.meta.title
    ? `${to.meta.title} - ${defaultTitle}`
    : defaultTitle;
});

/**
 * 路由错误处理函数
 */
router.onError((error) => {
  console.error("路由错误:", error);
  // 这里可以添加错误处理逻辑，如显示全局错误通知
});

export default router;
