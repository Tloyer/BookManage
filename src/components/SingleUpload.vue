<template>
    <div>
        <!-- action必选参数，上传地址，bucket的外网访问域名 -->
        <el-upload :action="$http.defaults.baseURL+actionUrl" :multiple="false" 
            :file-list="fileList" :on-remove="handleRemove" :with-credentials="true"
            :on-success="handleUploadSuccess" :before-upload="beforeUpload">
            <el-button size="middle" type="primary">{{buttonTxt}}</el-button>
        </el-upload>
    </div>
</template>
<script>

    export default {
        name: 'SingleUpload',
        computed: {
            actionUrl() {
                if (this.urlPath.indexOf("?") != -1) {
                    return this.urlPath + "&path=" + this.path;
                } else {
                    return this.urlPath + "?path=" + this.path;
                }
            }
        },
        props: {
            buttonTxt: {
                type: String,
                required: false,
                default: '点击上传'
            },
            // 必须设置文件所在目录 如 /db1/organ/ 以 / 开头， 以 / 结尾
            path: {
                type: String,
                required: true,
            },
            // 必须设置上传路径
            urlPath: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                fileList: [],
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log("remove: file, fileList: ", file, fileList)
            },
            handleUploadSuccess(res, file) {
                console.log("上传成功...res: ", res, file)
                if (res.code != 200) {
                   return this.$message.error(res.msg);
                }
                this.fileList.pop()
                // this.fileList.push({ name: file.name, url: this.$http.defaults.baseURL + res.data});
                // 给父组件发送事件
                this.$emit('uploadSuccess',res.data);
            },
            beforeUpload(file) {
                let fileName = file.name;
                let index1 = fileName.lastIndexOf(".");
                if (index1 == -1) {
                    this.$message.error("上传失败，请检查文件格式！ ");
                    return false;
                }
                var type = fileName.substring(index1,fileName.length).toUpperCase();
                if (type !== ".JPG" && type !== ".PNG") {
                    this.$message.error("只允许上传JPG或PNG图片");
                    return false;
                }
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (!isLt10M) {
                    this.$message.error('上传图片大小不能超过10MB哦!');
                    return false;
                }
            }
        },
    }

</script>
<style>

</style>
