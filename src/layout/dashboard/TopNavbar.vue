<template>
  <nav class="navbar navbar-expand-lg ">
    <div class="container-fluid">
      <button @click="emitToggleCollapse" class="btn btn-sm">
        <i class="ti-menu-alt"></i> <!-- 或者其他你喜欢的图标 -->
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-panel"></i>
              <p>统计</p>
            </a>
          </li>
          <drop-down class="nav-item" title="5 条通知" title-classes="nav-link" icon="ti-bell">
            <a class="dropdown-item" href="#">通知 1</a>
            <a class="dropdown-item" href="#">通知 2</a>
            <a class="dropdown-item" href="#">通知 3</a>
            <a class="dropdown-item" href="#">通知 4</a>
            <a class="dropdown-item" href="#">其他通知</a>
          </drop-down>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="ti-settings"></i>
              <p>设置</p>
            </a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout">
              <i class="ti-power-off"></i>
              <p>退出登录</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { auth } from "../../api";

export default {
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
  },
  data() {
    return {
      activeNotifications: false,
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    logout() {
      auth.logout();
      this.$router.push('/login');
    },
    emitToggleCollapse() {
      this.$emit('toggle-sidebar-collapse');
    }
  },
};
</script>
<style>
.navbar .btn.btn-sm {
  background-color: transparent !important;
  border-color: transparent !important;
}

.navbar .btn.btn-sm i.ti-menu-alt {
  color: #333333 !important;
}
</style>
