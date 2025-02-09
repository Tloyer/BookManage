<template>
  <div class="">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅管理</el-breadcrumb-item>
      <el-breadcrumb-item>图书借阅列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!--搜索-->
    <el-form :inline="true" :model="query" ref="refSearch" label-width="80px">
      <el-form-item label="书籍名称" prop="bookName">
        <el-input v-model.trim="query.bookName"></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="bookAuthor">
        <el-input v-model.trim="query.userName"></el-input>
      </el-form-item>
      <el-button type=success @click="searchByParams">搜索</el-button>
    </el-form>
    <el-table v-if="borrowInfoList.length > 0" :data="borrowInfoList" border style="width: 100%">
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="书名" prop="bookName"></el-table-column>
      <el-table-column label="借书时间" prop="borrowTime">
        <template #default="{ row }">
          {{ row.borrowTime | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="用户" prop="userName"></el-table-column>
      
      <!-- 操作列 -->
      <el-table-column label="操作" v-if="$root.$data.canEdit" width="150">
        <template #default="{ row }">
          <el-tooltip class="item" effect="dark" content="归还书籍" placement="top" :enterable="false">
            <el-button type="primary" size="mini" @click="returnBook(row)">
              归还
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>


    <!-- 分页 -->
    <el-pagination v-if="borrowInfoList.length > 0" background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page.pageNum" :page-sizes="[5, 10, 20, 50, 100]" :page-size="page.pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      borrowInfoList: [],
      page: {//分页查询条件
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pages: 0
      },
      query: {//条件查询条件
        bookName: "",
        userName: ""
      },
      borrowInfo: {
        userId: "",
        bookId: ""
      }
    };
  },

  methods: {
    async getBorrowInfoList() {
      this.clearSearchParams();
      await this.getBorrowInfoListByPage();
    },

    async getBorrowInfoListByPage() {
      const {data: res} = await this.$http.post(
        "/borrow/search?pageNum=" + this.page.pageNum + "&pageSize=" + this.page.pageSize,
        this.query
      );
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      this.page.total = res.data.total;//数据总条数
      this.page.pages = res.data.pages;//页数
      this.borrowInfoList = res.data.records;
    },

    returnBook(info) {
      this.$confirm("归还" + info.userName + "借阅的" + info.bookName + "?", "提示", {
        confirmButtonText: "确定", cancelButtonText: "取消", type: "success",
      }).then(async () => {
        this.borrowInfo.userId = info.userId;
        this.borrowInfo.bookId = info.bookId;
        const {data: res} = await this.$http.delete("/borrow", {data: this.borrowInfo});
        if (res.code !== 200) return this.$message.error(res.msg);
        await this.getBorrowInfoList();
        this.$message.success("归还成功");
      }).catch(() => {
        this.$message.info("已取消归还");
      });
    },

    /* 改变页面大小 */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getBorrowInfoListByPage();
    },

    /* 改变当前页码 */
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getBorrowInfoListByPage();
    },

    // 清空搜索条件
    clearSearchParams() {
      this.query = {//条件查询条件
        bookName: "",
        userName: ""
      };
    },

    // 点击搜索
    async searchByParams() {
      this.page.pageNum = 1;
      // 这里要等待此方法结果
      await this.getBorrowInfoListByPage();
      if (this.borrowInfoList.length === 0) {
        this.$message.warning("没有符合条件的记录！");
        this.clearSearchParams();
        return this.getBorrowInfoListByPage();
      }
    },
  },

  filters: {
    formatTime(value) {
      return moment(value).format('YYYY年MM月DD日 HH:mm:ss');
    },
  },

  created() {
    this.getBorrowInfoList();
  }
};
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
