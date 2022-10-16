<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/img/logo.png" alt=""/>
      </div>
      <div id="title">图书管理系统</div>
      <!-- 登录表单区域 -->
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef" label-width="0px" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-yonghu"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-suo" type="password"></el-input>
        </el-form-item>
        <!-- 登录和重置 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      rules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min: 6, max: 16, message: "长度在6到16个字符", trigger: "blur"}
        ],
      },
    };
  },

  methods: {
    // 提交登录请求
    submitForm() {
      this.$refs.loginFormRef.validate(async (valid) => {
        // 表单校验失败
        if (!valid) {
          console.log("error submit!!");
          return false;
        } else {
          const {data: res} = await this.$http.post("/book/user/login", this.loginForm);
          //登录失败
          if (res.code !== 200) {
            return this.$message.error(res.msg);
          }
          // 登录成功
          this.$message.success(res.msg);
          // 跳转到主页
          this.$root.$data.userStatus = res.data;
          this.$root.updatePriv();
          await this.$router.push("/home");
        }
      });
    },

    // 重置表单
    resetForm() {
      this.$refs.loginFormRef.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 320px;
  background-color: #ffff;
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* 头像区域 */

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eeee;
    border-radius: 50%;
    background-color: #ffff;
    box-shadow: 0 0 10px #eeee;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeee;
    }

    top: -40px;
  }
}

#title {
  margin-top: 40px;
  text-align: center;
  font-size: 24px;
}

/* 登录和重置按钮 */
.btns {
  display: flex;
  justify-content: flex-end;
}

/* 登录表单位置 */
.login_form {
  position: absolute;
  width: 100%;
  padding: 0 20px;
  bottom: 0;
  box-sizing: border-box;
}
</style>
