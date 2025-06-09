<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">{{ routeName }}</a>
      <button
        class="navbar-toggler navbar-burger"
        type="button"
        @click="toggleSidebar"
        :aria-expanded="$sidebar.showSidebar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
        <span class="navbar-toggler-bar"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a href="#" class="nav-link">
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
    }
  },
};
</script>
<style></style>
