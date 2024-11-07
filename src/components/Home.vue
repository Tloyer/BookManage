<template>
  <!-- 页面容器布局 -->
  <el-container class="home-container">
    <!-- 页面头部 -->
    <el-header>
      <div>
        <!-- 头像 -->
        <img
          src="../assets/img/logo.jpg"
          style="width: 50px; height: 50px;"
        />
        <span>图书管理系统</span>
      </div>
      <div class="right">
        <span>{{ $root.$data.userStatus.userName }}（{{ $root.$data.userStatus.roleName.replace(/（.*）$/, '') }}）</span>
        <el-dropdown @command="neDropdown">
                    <span class="el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="pw">修改密码</el-dropdown-item>
            <el-dropdown-item v-if="$root.$data.canEdit" command="list">用户管理</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <el-container>
      <!-- 页面侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '270px'">
        <!-- 折叠标志 -->
        <div class="menu_collapse" @click="isCollapse = !isCollapse">
          |||
        </div>
        <!-- 菜单导航 -->
        <el-menu class="el-menu-vertical-demo" unique-opened
                 @open="handleOpen" @close="handleClose"
                 background-color="#333744" text-color="#fff"
                 active-text-color="#409EFF" :collapse="isCollapse"
                 :collapse-transition="false" router
                 :default-active="this.$route.path"
                 @select="handleSelect">
          <!-- 一级菜单
              开启路由模式，会将index作为访问路径
              menuList中的项，它的path值，并不是以 / 开头的
          -->
          <el-submenu :index="menu1.path" v-for="(menu1, index) in menuList"
                      :key="menu1.name + index" v-if="menu1.path !== '/sys' || $root.$data.canEdit">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="menu1.meta.icon" class="menu-icon"></i>
              <!-- 文本 -->
              <span v-text="menu1.name"></span>
            </template>

            <template v-if="menu1.children!=null">
              <!-- 二级菜单 -->
              <el-menu-item
                :index="menu2.path"
                v-for="(menu2, index) in menu1.children"
                :key="menu2.name + index"
                v-if="menu2.hidden">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{ menu2.name }}</span>
              </el-menu-item>
            </template>

          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 页面主体区域 -->
        <el-main>
          <!-- Main -->
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>

        <el-footer>
          <span>Copyright © 2024 BIT</span>
        </el-footer>

      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import bus from '../utils/eventBus'

export default {
  components: {},
  data() {
    return {
      menuList: [],// 左侧菜单列表
      isCollapse: false,// 是否折叠左侧菜单
      lastPath: ''
    };
  },
  methods: {
    // 退出登录按钮点击事件
    async logout() {
      let {data: res} = await this.$http.post("/book/user/logout", {});
      this.$message.success(res.msg);
      // 清空jwt令牌
      window.sessionStorage.clear();
      // 重新跳转到登录页面
      await this.$router.push("/login");
      this.$root.$data.userStatus = {};
      this.$root.clearLogin();
    },
    async checkUserStatus() {
      if (!(await this.$root.checkLogin())) {
        this.$message.error("未登录！");
        await this.$router.push("/login");
      }
    },

    // 获取所有菜单
    getMenuList() {
      this.menuList = this.$router.options.routes.filter(
        (route) => route.hidden
      );
    },

    handleOpen(key, keyPath) {
      console.log('open')
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log('close')
      console.log(key, keyPath);
    },

    handleSelect(key, keyPath) {
      if (key === '/test') {
        bus.$emit('flush')
      }
      console.log('select')
      console.log(key, keyPath)
    },

    neDropdown(command) {
      switch (command) {
        case "pw":
          this.$router.push("/user/pwd");
          break;
        case "list":
          this.$router.push("/user/list");
          break;
      }
    }
  },
  created() {
    //获取菜单列表
    this.getMenuList();
    this.checkUserStatus();
  },
};
</script>

<style lang='less' scoped>
.home-container {
  height: 100%;
}

/* 侧边栏背景 */
.el-aside {
  background-color: #333744;
  /* 去除原有边框，二级菜单比有边界线突出 */

  .el-menu {
    border-right: none;
  }
}

/* 标题栏样式 */
.el-header {
  background-color: #24242c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  color: white;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  .right {
    font-size: 14px;

    .el-dropdown {
      color: #dad9da;

    }
  }
}

/* 主体区域背景 */
.el-main {
  background-color: #eaedf1;
}

.el-footer {
  background-color: #eaedf1;
  height: 30px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

/* 图标和文字间距 */
.iconfont {
  margin-right: 10px;
}

/* 菜单折叠标志的样式 */
.menu_collapse {
  background-color: #4a5064;
  text-align: center;
  letter-spacing: 0.2em;
  font-size: 10px;
  line-height: 24px;
  color: #eeee;
  cursor: pointer;
}

/* 菜单项前边的图标 */
.menu-icon {
  margin-right: 5px;
  width: 12px;
}
</style>
