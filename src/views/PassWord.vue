<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item>修改密码</el-breadcrumb-item>
</el-breadcrumb>
<el-form :model="formPw" :rules="formPwRules" ref="refPw" label-width="120px">
    <el-form-item label="新密码" prop="pw"><el-input v-model="formPw.pw" show-password></el-input></el-form-item>
    <el-form-item label="确认密码" prop="cfm"><el-input v-model="formPw.cfm" show-password></el-input></el-form-item>
    <el-form-item>
        <el-button type=primary @click="submitPw">确定</el-button>
    </el-form-item>
</el-form>
</div>
</template>

<script>
export default {
    data() {
        var validatePw2 = (rule,value,callback) => {
            if (value !== this.formPw.pw) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            formPw:{pw:"",cfm:""},
            formPwRules:{
                pw:[{required:true,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"密码长度应为 6～16 字符",trigger:"blur"}],
                cfm:[{validator:validatePw2,trigger:"blur"}],
            },
        };
    },
    methods: {
        async submitPw() {
            this.$refs.refPw.validate(async (valid) => {
                if (!valid) return;
                let {data:res} = await this.$http.post("/dnd/user/change-pw", {username:this.$root.$data.userStatus.userName, password:this.formPw.pw});
                if (res.code!=200) return this.$message.error(res.msg);
                this.$message.success("修改密码成功！");
                this.$router.push("/home");
            });
        },
    },
};
</script>
<style scoped>
</style>
