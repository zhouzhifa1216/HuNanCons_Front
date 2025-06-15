<template>
  <div class="wrapper" :class="{ 'nav-collapsed': isSidebarCollapsed }">
    <side-bar :collapsed="isSidebarCollapsed">
      <template slot="links">
        <sidebar-link to="/dashboard" name="数据监控" icon="ti-panel" />
        <sidebar-link to="/maps" name="地图" icon="ti-map" />
        <sidebar-link to="/table-list" name="数据表" icon="ti-view-list-alt" />
        <sidebar-link to="/typography" name="排版" icon="ti-text" />
        <sidebar-link to="/icons" name="图标" icon="ti-pencil-alt2" />
        <sidebar-link to="/notifications" name="通知" icon="ti-bell" />
        <sidebar-link to="/stats" name="用户" icon="ti-user" />
      </template>
      <mobile-menu>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-panel"></i>
            <p>统计</p>
          </a>
        </li>
        <drop-down
          class="nav-item"
          title="5 条通知"
          title-classes="nav-link"
          icon="ti-bell"
        >
          <a class="dropdown-item">通知 1</a>
          <a class="dropdown-item">通知 2</a>
          <a class="dropdown-item">通知 3</a>
          <a class="dropdown-item">通知 4</a>
          <a class="dropdown-item">其他通知</a>
        </drop-down>
        <li class="nav-item">
          <a class="nav-link">
            <i class="ti-settings"></i>
            <p>设置</p>
          </a>
        </li>
        <li class="divider"></li>
      </mobile-menu>
    </side-bar>
    <div class="main-panel">
      <top-navbar @toggle-sidebar-collapse="toggleCollapse"></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss">
$sidebar-width: 260px; // 侧边栏默认宽度 (请根据实际情况调整)
$sidebar-collapsed-width: 70px; // 侧边栏折叠后的宽度 (请根据实际情况调整)

.wrapper {
  .main-panel {
    // transition: margin-left 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1); // 如果你的 sidebar 是 position: fixed
    transition: width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
    width: calc(100% - #{$sidebar-width}); // 默认情况下 main-panel 的宽度
  }

  &.nav-collapsed {
    .main-panel {
      // margin-left: $sidebar-collapsed-width; // 如果你的 sidebar 是 position: fixed
      width: calc(100% - #{$sidebar-collapsed-width}); // sidebar 折叠后 main-panel 的宽度
    }
  }
}
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    DashboardContent,
    MobileMenu,
  },
  data() {
    return {
      isSidebarCollapsed: false, // 新增：侧边栏折叠状态
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    // 新增：切换侧边栏折叠状态的方法
    toggleCollapse() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    },
  },
};
</script>
