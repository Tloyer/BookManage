<template>
  <div class="">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图书信息数据</el-breadcrumb-item>
      <el-breadcrumb-item>图书详细信息</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button v-if="$root.$data.canEdit && this.pageStatus === 0" type="primary" @click="addBookDetail">
      新 增
    </el-button>
    <el-button v-if="this.pageStatus === 0" @click="back">返 回</el-button>

    <el-form v-if="this.pageStatus === 1||this.pageStatus===2" :model="bookDetail"
             label-width="300px" size="small" :inline="true"
             :disabled="formDisable">

      <!--封面图片-->
<!--      <el-form-item label="试验图片" prop="image">
        <font v-if="this.pageStatus===1 && !bookDetail.image">无图片</font>
        <viewer>
          <img v-if="bookDetail.image" class="pic-area"
               :src="$http.defaults.baseURL + bookDetail.image" style="width: 60%;" />
        </viewer>
        <upload button-txt="上传图片" v-if="$root.$data.canEdit&&!bookDetail.image" path="/book/"
                :urlPath="'//upload?id='+bookDetail.bookId +'&image='+bookDetail.image"
                style="width: 60%;" @uploadSuccess="handleFileUploadSuccess">
        </upload>
        <upload button-txt="更新图片" v-if="$root.$data.canEdit&&bookDetail.image" path="/book/"
                :urlPath="'/d/upload?id=' + bookDetail.bookId +'&image='+bookDetail.image"
                style="width: 60%;" @uploadSuccess="handleFileUploadSuccess">
        </upload>
      </el-form-item>-->

      <el-form-item label="作 者" prop="author">
        <el-input v-model="bookDetail.author"></el-input>
      </el-form-item>
      <el-form-item label="名 称" prop="name">
        <el-input v-model="bookDetail.name"></el-input>
      </el-form-item>
      <el-form-item label="出版社" prop="publisher">
        <el-input v-model="bookDetail.publisher"></el-input>
      </el-form-item>
      <el-form-item label="发行时间" prop="time">
        <el-input v-model="bookDetail.time"></el-input>
      </el-form-item>
      <el-form-item label="内容简介" prop="introduction">
        <el-input v-model="bookDetail.introduction"></el-input>
      </el-form-item>
    </el-form>

    <div>
      <el-button v-if="this.$root.$data.canEdit && (this.pageStatus === 1||this.pageStatus===2)"
                 type="primary"
                 @click="editBookDetail">
        {{ buttonName }}
      </el-button>
      <el-button v-if="this.pageStatus === 1|| this.pageStatus===2" @click="back">返 回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 页面状态:0没有数据，1展示，2修改
      pageStatus: 1,
      buttonName: "编 辑",
      // 是否禁用表单
      formDisable: true,
      //数据是否存在
      isExist: false,
      bookDetail: {
        name: '三体',
        author: '刘慈溪',
        publisher: '人民邮电出版社',
        time: '2017',
        image: null,
        introduction: "这是一本科幻小说"
      }
    }
  },

  methods: {
    async getBookDetail() {
      let bookId = this.$route.params["bookId"];
      const {data: res} = await this.$http.get("/book/books/detail/" + bookId);
      if (res.code !== 200) {
        this.pageStatus = 0;
        return;
      }
      this.pageStatus = 1;
      this.bookDetail = res.data;
      this.isExist = true;
    },

    back() {
      this.$router.back();
    },

    addBookDetail() {
      this.pageStatus = 2;//编辑状态
      this.formDisable = false;
      this.buttonName = "保 存";
    },

    // 能够切换编辑/提交表单
    async editBookDetail() {
      if (this.formDisable === true) {
        this.pageStatus = 2;
        this.formDisable = false;
        this.buttonName = "保 存";
      } else if (this.pageStatus === 2) {
        this.bookDetail.bookId = this.$route.params["bookId"];
        this.pageStatus = 1;
        if (this.isExist) {//新增
          const {data: res} = await this.$http.put("/book/books/detail/", this.bookDetail);
          if (res.code !== 200) {
            return this.$message.error(res.msg);
          }
          this.$message.success(res.msg);
        } else {//编辑
          const {data: res} = await this.$http.post("/book/books/detail/", this.bookDetail);
          if (res.code !== 200) {
            return this.$message.error(res.msg);
          }
          this.$message.success(res.msg);
        }
        this.formDisable = true;
        this.buttonName = "编 辑"
      }
    },

    handleFileUploadSuccess(imgPath) {
      this.bookDetail.image = imgPath;
      this.$message.success("图片上传成功");
      // this.getInfo();
    },
  },

  created() {
    console.log("BookDetail")
    //this.getBookDetail()
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
