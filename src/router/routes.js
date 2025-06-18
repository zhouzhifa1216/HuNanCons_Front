// 延迟加载路由组件
const DashboardLayout = () => import(/* webpackChunkName: "layout" */ "@/layout/dashboard/DashboardLayout.vue");
const NotFound = () => import(/* webpackChunkName: "error" */ "@/pages/NotFoundPage.vue");
const Login = () => import(/* webpackChunkName: "auth" */ "@/pages/Login.vue");
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ "@/pages/Dashboard.vue");
const UserProfile = () => import(/* webpackChunkName: "user" */ "@/pages/UserProfile.vue");
const Notifications = () => import(/* webpackChunkName: "notifications" */ "@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "ui" */ "@/pages/Icons.vue");
const Maps = () => import(/* webpackChunkName: "maps" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "ui" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "tables" */ "@/pages/TableList.vue");

/**
 * 路由配置
 * meta信息说明:
 * - requiresAuth: 是否需要身份验证
 * - title: 页面标题，用于面包屑、标签页等显示
 * - icon: 路由图标
 * - roles: 允许访问此路由的角色列表 (如果需要基于角色控制访问)
 */
const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { 
      requiresAuth: false,
      title: "登录"
    }
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    meta: { 
      requiresAuth: true,
      title: "网页标题"
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { 
          title: "数据监控 ",
          icon: "ti-panel"
        }
      },
      {
        path: "stats",
        name: "stats",
        component: UserProfile,
        meta: { 
          title: "用户统计",
          icon: "ti-user"
        }
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
        meta: { 
          title: "通知中心",
          icon: "ti-bell"
        }
      },
      {
        path: "icons",
        name: "icons",
        component: Icons,
        meta: { 
          title: "图标库",
          icon: "ti-pencil-alt" 
        }
      },
      {
        path: "maps",
        name: "maps",
        component: Maps,
        meta: { 
          title: "地图",
          icon: "ti-map" 
        }
      },
      {
        path: "typography",
        name: "typography",
        component: Typography,
        meta: { 
          title: "排版",
          icon: "ti-text" 
        }
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList,
        meta: { 
          title: "表格列表",
          icon: "ti-view-list-alt" 
        }
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
    meta: { 
      requiresAuth: false,
      title: "页面未找到"
    }
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
