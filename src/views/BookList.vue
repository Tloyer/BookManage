<template>
  <div class="">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息数据库</el-breadcrumb-item>
      <el-breadcrumb-item>图书列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button v-if="$root.$data.canEdit" type=primary @click="dialogAddTestOpened = true">新增</el-button>
    <el-button v-if="$root.$data.canEdit" type=primary @click="dialogAddTestOpened = true">新增</el-button>
    <el-button type=success @click="dialogSearchOpened = true">搜索</el-button>
    <router-link :to="'/detail/' + 1">详情信息</router-link>
  </div>
</template>

<script>
import bus from '../utils/eventBus'

export default {
  data() {
    return {
    };
  },

  methods: {
  },

  created() {
  },
}
</script>

<style lang='less' scoped>
table .el-button {
  margin-bottom: 0;
}

#detail img {
  width: 260px;
}

.link-data {
  cursor: pointer;
  text-decoration: underline;
}

.el-ue {
  line-height: normal;
}

.page-table .el-button {
  margin: 3px 5px !important;
}

.test-result a {
  margin: 5px 25px;
  /* 取消下划线 */
  text-decoration: none;
  /* 取消选中时的背景色 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  // color: #06F;
  cursor: pointer;
}

/* 已读时的字体颜色 */
.test-result a {
  color: #06F;
  text-decoration: none;
}

/* 未访问的链接 */
.test-result a:hover {
  color: #F00;
  text-decoration: underline;
}

/* 鼠标移动到链接上 */
</style>
