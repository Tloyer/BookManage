<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{path:'/home'}">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
</el-breadcrumb>
<el-button type=primary @click="dialogAddOpened=true">新增</el-button>
<el-table :data="users" border style="width: 100%">
  <el-table-column label="用户名" prop="userName"></el-table-column>
  <el-table-column label="用户身份">
    <template #default="{ row }">
      {{ $root.$data.roles[row.roleId].n }}
    </template>
  </el-table-column>
  <el-table-column label="操作" width="150">
    <template #default="{ row }">
      <el-tooltip v-if="row.userId !== $root.$data.userStatus.userId" class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(row.userId)"></el-button>
      </el-tooltip>
    </template>
  </el-table-column>
</el-table>

<el-dialog title="新增用户" :visible.sync="dialogAddOpened" width="50%" :close-on-click-modal="false" @closed="dialogAddClosed">
    <el-form :model="formAdd" :rules="formAddRules" ref="refAdd" label-width="120px">
        <el-form-item label="用户名" prop="username"><el-input v-model="formAdd.username"></el-input></el-form-item>
        <el-form-item label="初始密码" prop="pw"><el-input v-model="formAdd.pw" show-password></el-input></el-form-item>
        <el-form-item label="确认密码" prop="cfm"><el-input v-model="formAdd.cfm" show-password></el-input></el-form-item>
        <el-form-item label="用户身份" prop="roleId"><el-select v-model="formAdd.roleId">
            <el-option v-for="role,roleId in $root.$data.roles" :key="roleId" :label="role.n" :value="roleId"></el-option>
        </el-select></el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddOpened=false">取消</el-button>
        <el-button type=primary @click="submitAdd">确定</el-button>
    </span>
</el-dialog>
</div>
</template>

<script>
export default {
    data() {
        var validatePw2 = (rule,value,callback) => {
            if (value !== this.formAdd.pw) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            users:[],
            dialogAddOpened:false,
            formAdd:{username:"",pw:"",cfm:"",roleId:"2"},
            formAddRules:{
                username:[{required:true,message:"请输入用户名",trigger:"blur"},{min:3,max:10,message:"用户名长度应为 3～10 字符",trigger:"blur"}],
                pw:[{required:true,message:"请输入密码",trigger:"blur"},{min:6,max:16,message:"密码长度应为 6～16 字符",trigger:"blur"}],
                cfm:[{validator:validatePw2,trigger:"blur"}],
            },
        };
    },
    methods: {
        async getList() {
            const {data:res} = await this.$http.get("/book/user/list");
            if (res.code!==200) return this.$message.error(res.msg);
            this.users = res.data;
        },
        dialogAddClosed() {
            this.$refs.refAdd.resetFields();
        },
        async submitAdd() {
            this.$refs.refAdd.validate(async (valid) => {
                if (!valid) return;
                let {data:res} = await this.$http.post("/book/user/register", {username:this.formAdd.username, password:this.formAdd.pw, roleId:this.formAdd.roleId});
                if (res.code!==200) return this.$message.error(res.msg);
                this.$message.success("新增用户成功！");
                this.getList();
                this.dialogAddOpened = false;
            });
        },
        deleteUser(id) {
            this.$confirm("此操作将永久删除该用户。是否继续？", "提示", {
                confirmButtonText:"确定", cancelButtonText:"取消", type:"warning",
            }).then(async () => {
                const {data:res} = await this.$http.delete("/book/user/"+id);
                if (res.code!==200) return this.$message.error(res.msg);
                this.getList();
                this.$message.success("已删除。");
            }).catch(() => {
                this.$message.info("已取消操作。");
            });
        },
    },
    created() {
        this.getList();
    },
};
</script>
<style scoped>
table .el-button {margin-bottom:0;}
</style>
