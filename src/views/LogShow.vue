<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统管理</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 日志导出 -->
        <el-button type="primary" @click="exportPageToExcel">导出当前页面数据</el-button>
        <el-button type="primary" @click="exportTotalToExcel">导出全部日志数据</el-button>
        <!--  日志列表  -->
        <el-table border stripe :data="infoList">
            <el-table-column prop="actionTime" label="操作时间" width="150px"></el-table-column>
            <el-table-column prop="userName" label="操作人"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column label="操作类型">
                <template slot-scope="scope">
                    <span v-if="scope.row.actionType == 1">新增</span>
                    <span v-if="scope.row.actionType == 2">修改</span>
                    <span v-if="scope.row.actionType == 3">删除</span>
                    <span v-if="scope.row.actionType == 4">上传</span>
                    <span v-if="scope.row.actionType == 5">登录</span>
                    <span v-if="scope.row.actionType == 6">退出</span>
                </template>
            </el-table-column>
            <el-table-column prop="description" label="操作内容" width="500px"></el-table-column>
            <el-table-column label="删除日志" width="80px">
                <template slot-scope="scope">
                    <el-button type="danger" icon="el-icon-delete" size="mini"
                        @click="deleteLogById(scope.row.logId)" />
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="page.pageNum" :page-sizes="[10, 20, 50, 100]" :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
    </div>
</template>
<script>
    import { handleDownload } from '@/utils/ExportUtils'
    export default {
        data() {
            return {
                npage: 1,
                infoList: [],
                page: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 10,
                    pages: 0
                },
                columns: ['日志ID', '用户ID', '角色ID', '操作时间', '操作类型', '操作内容', '用户名', '角色名'],
                fileName: '日志记录'
            }
        },
        methods: {
            /* 删除指定日志记录 */
            deleteLogById(logId) {
                this.$confirm('此操作将永久删除该日志信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    /* 从返回值(Promise)中结构出data字段值，重命名为res */
                    const { data: res } = await this.$http.delete("//user/log/list/delete/" + logId);
                    if (res.code !== 200) {
                        return this.$message.error(res.msg);
                    }
                    /* 重新获取用户列表 */
                    this.getInfoListByPage();
                    /* 删除成功 */
                    this.$message.success("删除成功");
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            /* 分页查询数据 */
            async getInfoListByPage() {
                const { data: res } = await this.$http.get(
                    "/book/user/log/listByPage?pageNum=" + this.page.pageNum + "&pageSize=" + this.page.pageSize
                );
                if (res.code != 200) {
                    return this.$message.error(res.msg);
                }
                this.page.total = res.data.total;
                this.page.pages = res.data.pages;
                this.infoList = res.data.records;
            },
            // 导出当前页数据到文件
            exportPageToExcel() {
                if (!this.infoList || this.infoList.length < 1) {
                    return this.$message.error("暂无可导出数据")
                }
                handleDownload(this.infoList, this.columns, this.fileName)
            },
            /* 导出全部日志数据到文件 */
            async exportTotalToExcel() {
                // 重新获取全部数据
                const { data: res } = await this.$http.get("/book/user/log/list");
                if (res.code !== 200) {
                    return this.$message.error(res.msg);
                }
                if (!res.data || res.data.length < 1) {
                    return this.$message.error("暂无可导出数据")
                }
                handleDownload(res.data, this.columns, this.fileName)
            },
            /* 改变页面大小 */
            handleSizeChange(val) {
                this.page.pageSize = val;
                this.getInfoListByPage();
            },
            /* 改变当前页码 */
            handleCurrentChange(val) {
                this.page.pageNum = val;
                this.getInfoListByPage();
            }
        },
        created() {
            // this.getInfoList();
            this.getInfoListByPage();
        }
    }
</script>
<style lang="">
</style>
