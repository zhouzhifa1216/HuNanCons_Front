<template>
  <div
    class="sidebar"
    :class="{ 'is-collapsed': collapsed }"
    :data-background-color="backgroundColor"
    :data-active-color="activeColor"
  >
    <!--
            Tip 1: you can change the color of the sidebar's background using: data-background-color="white | black | darkblue"
            Tip 2: you can change the color of the active button using the data-active-color="primary | info | success | warning | danger"
        -->
    <!-- -->
    <div class="sidebar-wrapper" id="style-3">
      <div class="logo">
        <a href="#" class="simple-text">
          <div class="logo-img">
            <img src="@/assets/img/logo.png" alt="" />
          </div>
          <span v-if="!collapsed">{{ title }}</span>
        </a>
      </div>
      <slot> </slot>
      <ul class="nav">
        <!--By default vue-router adds an active class to each route link. This way the links are colored when clicked-->
        <slot name="links">
          <sidebar-link
            v-for="(link, index) in sidebarLinks"
            :key="index"
            :to="link.path"
            :name="collapsed ? '' : link.name"
            :icon="link.icon"
            :collapsed="collapsed" 
          >
          </sidebar-link>
        </slot>
      </ul>
      <moving-arrow v-if="!collapsed" :move-y="arrowMovePx"> </moving-arrow>
    </div>
  </div>
</template>
<script>
import MovingArrow from "./MovingArrow.vue";
import SidebarLink from "./SidebarLink";
export default {
  props: {
    title: {
      type: String,
      default: "存量建设用地管理系统",
    },
    backgroundColor: {
      type: String,
      default: "black",
      validator: (value) => {
        let acceptedValues = ["white", "black", "darkblue"];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    activeColor: {
      type: String,
      default: "success",
      validator: (value) => {
        let acceptedValues = [
          "primary",
          "info",
          "success",
          "warning",
          "danger",
        ];
        return acceptedValues.indexOf(value) !== -1;
      },
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
    collapsed: { // 新增 prop
      type: Boolean,
      default: false,
    },
  },
  provide() {
    return {
      autoClose: this.autoClose,
      addLink: this.addLink,
      removeLink: this.removeLink,
    };
  },
  components: {
    MovingArrow,
    SidebarLink,
  },
  computed: {
    /**
     * Styles to animate the arrow near the current active sidebar link
     * @returns {{transform: string}}
     */
    arrowMovePx() {
      return this.linkHeight * this.activeLinkIndex;
    },
  },
  data() {
    return {
      linkHeight: 65,
      activeLinkIndex: 0,
      windowWidth: 0,
      isWindows: false,
      hasAutoHeight: false,
      links: [],
    };
  },
  methods: {
    findActiveLink() {
      this.links.forEach((link, index) => {
        if (link.isActive()) {
          this.activeLinkIndex = index;
        }
      });
    },
    addLink(link) {
      const index = this.$slots.links && this.$slots.links.length > 0 ? this.$slots.links.indexOf(link.$vnode) : -1;
      if (index !== -1) {
         this.links.splice(index, 0, link);
      } else {
         this.links.push(link); // Fallback if slot is used differently or for programmatically added links
      }
    },
    removeLink(link) {
      const index = this.links.indexOf(link);
      if (index > -1) {
        this.links.splice(index, 1);
      }
    },
  },
  mounted() {
    this.$watch("$route", this.findActiveLink, {
      immediate: true,
    });
  },
};
</script>
<style lang="scss" scoped> // 或者 <style scoped>
/* 请根据 DashboardLayout.vue 中定义的 $sidebar-width 和 $sidebar-collapsed-width 进行调整 */
.sidebar {
  width: 260px; /* 默认宽度 */
  transition: width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);
}

.sidebar.is-collapsed {
  width: 70px; /* 折叠后的宽度 */
}

.sidebar.is-collapsed .logo .simple-text span {
  display: none;
}

.sidebar.is-collapsed .logo .simple-text {
  padding-left: 0;
  padding-right: 0;
  justify-content: center;
}
.sidebar.is-collapsed .logo .logo-img {
  margin-left: 0;
}


/* 假设 SidebarLink 内部的文字在 <p> 标签内 */
.sidebar.is-collapsed .nav li > a p {
  display: none;
}

/* 调整 SidebarLink 中图标的样式 (如果需要) */
.sidebar.is-collapsed .nav li > a .sidebar-icon { /* 假设图标 class 为 sidebar-icon */
  margin-right: 0;
  font-size: 20px; /* 可选：调整图标大小 */
}
.sidebar.is-collapsed .nav li > a {
  padding-left: 10px; /* 根据需要调整内边距 */
  padding-right: 10px;
  justify-content: center;
}
.sidebar-wrapper { // 或者其他侧边栏的主要容器选择器
  background-color: #132a66 !important; // 添加这行来设置背景颜色
}

</style>
