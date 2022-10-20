<template>
  <div class="">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息数据库</el-breadcrumb-item>
      <el-breadcrumb-item>图书列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-col span="2">
        <el-button v-if="$root.$data.canEdit" type=primary @click="dialogAddBookOpened = true">新增</el-button>
      </el-col>
      <el-col span="20">
        <!--搜索-->
        <el-form :inline="true" :model="query" ref="refSearch" label-width="80px">
          <el-form-item label="书籍名称" prop="bookName">
            <el-input v-model.trim="query.bookName"></el-input>
          </el-form-item>
          <el-form-item label="作者名称" prop="bookAuthor">
            <el-input v-model.trim="query.bookAuthor"></el-input>
          </el-form-item>
          <el-button type=success @click="searchByParams">搜索</el-button>
        </el-form>
      </el-col>
    </el-row>
    <table v-if="bookList.length > 0" class="page-table full-width center">
      <tr>
        <th>序号</th>
        <th>书名</th>
        <th>作者</th>
        <th>ISBN</th>
        <th>库存</th>
        <th style="width: 130px">详情</th>
        <th style="width: 150px">操作</th>
      </tr>
      <tr v-for="(item, index) in bookList" :key="index + ''">
        <td>{{ index + 1 }}</td>
        <td>{{ item.bookName }}</td>
        <td>{{ item.bookAuthor }}</td>
        <td>{{ item.ISBN }}</td>
        <td>{{ item.stock }}</td>
        <td class="test-result">
          <div>
            <router-link @click.native="gotoResults()"
                         :to="'/books/detail/' + item.bookId">书籍详情
            </router-link>
          </div>
        </td>
        <td>
          <template v-if="$root.$data.canEdit">
            <el-tooltip class=item effect=dark content="修改书籍信息" placement=top :enterable="false">
              <el-button type=primary icon="el-icon-edit" size=mini @click="editBookOpen(item.bookId)">
              </el-button>
            </el-tooltip>
            <el-tooltip class=item effect=dark content="删除书籍" placement=top :enterable="false">
              <el-button type=danger icon="el-icon-delete" size=mini @click="deleteBook(item.bookId)">
              </el-button>
            </el-tooltip>
          </template>
          <template v-else>
            <el-tooltip class=item effect=dark content="修改书籍信息" placement=top :enterable="false">
              <el-button type=primary size=mini @click="borrowBook(item)">
                借阅
              </el-button>
            </el-tooltip>
          </template>
        </td>
      </tr>
    </table>
    <!-- 分页 -->
    <el-pagination v-if="bookList.length > 0" background @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page.pageNum" :page-sizes="[5, 10, 20, 50, 100]" :page-size="page.pageSize"
                   layout="total, sizes, prev, pager, next, jumper" :total="page.total">
    </el-pagination>

    <!--新增-->
    <el-dialog title="新增图书" :visible.sync="dialogAddBookOpened" width="40%" :close-on-click-modal="false"
               @closed="dialogAddBookClosed">
      <el-form :model="formAddBook" :rules="formBookRules" ref="refAddBook" label-width="120px">
        <el-form-item label="书名" prop="bookName">
          <el-input v-model.trim="formAddBook.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="bookAuthor">
          <el-input v-model.trim="formAddBook.bookAuthor"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="ISBN">
          <el-input v-model.trim="formAddBook.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model.number.trim="formAddBook.stock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogAddBookOpened = false">取 消</el-button>
          <el-button type=primary @click="addBook">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="修改图书信息" :visible.sync="dialogEditBookOpened" width="40%" :close-on-click-modal="false">
      <el-form :model="formEditBook" :rules="formBookRules" ref="refEditBook" label-width="120px">
        <el-form-item label="书名" prop="bookName">
          <el-input v-model.trim="formEditBook.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="bookAuthor">
          <el-input v-model.trim="formEditBook.bookAuthor"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" prop="ISBN">
          <el-input v-model.trim="formEditBook.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model.number.trim="formEditBook.stock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEditBookOpened = false">取 消</el-button>
          <el-button type=primary @click="editBook">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dialogAddBookOpened: false,
      dialogEditBookOpened: false,
      dialogSearchOpened: false,
      bookList: [],
      formAddBook: {
        bookName: "",
        bookAuthor: "",
        ISBN: "",
        stock: 0
      },

      formEditBook: {},
      page: {//分页查询条件
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pages: 0
      },
      query: {//条件查询条件
        bookName: "",
        bookAuthor: ""
      },
      formBookRules: {
        bookName: [{required: true, message: "请输入书名", trigger: "blur"}],
        bookAuthor: [{required: true, message: "请输入作者", trigger: "blur"}],
        ISBN: [{required: true, message: "请输入ISBN", trigger: "blur"}],
        stock: [{required: true, message: "请输入库存", trigger: "blur"},
          {type: 'number', message: '库存必须为数字值', trigger: "blur"}]
      }
    };
  },

  methods: {
    async getBookList() {
      this.clearSearchParams();
      await this.getBookListByPage();
    },

    dialogAddBookClosed() {
      this.$refs.refAddBook.resetFields();
    },

    addBook() {
      this.$refs.refAddBook.validate(async (valid) => {
        if (!valid) return;
        console.log(this.formAddBook);
        let {data: res} = await this.$http.put("/book/", this.formAddBook);
        if (res.code !== 200) return this.$message.error(res.msg);
        this.dialogAddBookOpened = false;
        await this.getBookList();
        this.$message.success("新增书籍成功！");
      });
    },

    async editBookOpen(id) {
      // 先查询
      const {data: res} = await this.$http.get("/book/" + id);
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      this.formEditBook = res.data;
      this.dialogEditBookOpened = true;
    },

    editBook() {
      this.$refs.refEditBook.validate(async (valid) => {
        if (!valid) {
          return;
        }
        let {data: res} = await this.$http.post("/book/", this.formEditBook);
        if (res.code !== 200) {
          return this.$message.error(res.msg);
        }
        this.dialogEditBookOpened = false;
        await this.getBookList();
        this.$message.success("修改书籍信息成功！");
      });
    },

    deleteBook(id) {
      this.$confirm("此操作将永久删除该书籍信息，是否继续？", "提示", {
        confirmButtonText: "确定", cancelButtonText: "取消", type: "warning",
      }).then(async () => {
        const {data: res} = await this.$http.delete("/book/" + id);
        if (res.code !== 200) {
          return this.$message.error(res.msg);
        }
        this.getBookList();
        this.$message.success("删除成功");
      }).catch(() => {
        this.$message.info("已取消操作");
      });
    },

    borrowBook(book) {
      this.$confirm("借阅" + book.bookName + "?", "提示", {
        confirmButtonText: "确定", cancelButtonText: "取消", type: "success",
      }).then(async () => {
        const {data: res} = await this.$http.post("/borrow/" + book.bookId);
        if (res.code !== 200) return this.$message.error(res.msg);
        await this.getBookList();
        this.$message.success("借阅成功");
      }).catch(() => {
        this.$message.info("已取消借阅");
      });
    },

    /* 带条件，分页查询数据 */
    async getBookListByPage() {
      const {data: res} = await this.$http.post(
        "/book/search?pageNum=" + this.page.pageNum + "&pageSize=" + this.page.pageSize,
        this.query
      );
      if (res.code !== 200) {
        return this.$message.error(res.msg);
      }
      this.page.total = res.data.total;//数据总条数
      this.page.pages = res.data.pages;//页数
      this.bookList = res.data.records;
      this.dialogSearchOpened = false;
    },

    /* 改变页面大小 */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getBookListByPage();
    },

    /* 改变当前页码 */
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getBookListByPage();
    },

    // 清空搜索条件
    clearSearchParams() {
      this.query = {//条件查询条件
        bookName: "",
        bookAuthor: ""
      };
    },

    // 点击搜索
    async searchByParams() {
      this.page.pageNum = 1;
      // 这里要等待此方法结果
      await this.getBookListByPage();
      if (this.bookList.length == 0) {
        this.$message.warning("没有符合条件的记录！");
        this.clearSearchParams();
        return this.getBookListByPage();
      }
    },

    // 跳转前保留当前分页和搜索内容
    gotoResults() {
      // <a> 标签必须设置 href 属性以便识别 :visited 等
      // 有多种解决办法，这里选择了恢复 <router-link>，当然保留 <a> 也是另有办法的
      this.$root.$data.pageAndQueryCache = {
        page: this.page,
        query: this.query
      };
    }
  },

  created() {
    this.getBookList();
  },
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
