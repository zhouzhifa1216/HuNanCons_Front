<template>
  <div class="wrapper">
    <side-bar>
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
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>
    </div>
  </div>
</template>
<style lang="scss"></style>
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
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
