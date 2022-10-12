<template>
  <div class="">
  </div>
</template>

<script>
import bus from '../utils/eventBus'

export default {
  data() {
  },

  methods: {},

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
