<template>
<div>
    <h1 align="center">造价文件上传</h1>
    <el-upload drag multiple class="upload-excel" :action=url :before-upload="beforeUploadFile" :on-success="handleSuccess" :on-error="handleError">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将Excel文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">支持.xls格式，且大小不超过20MB</div>
    </el-upload>
</div>
</template>

<script>
export default {
    data() {
        return {
            url: "api/excel/upload",
        }
    },
    methods: {
        // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
        beforeUploadFile(file) {
            let extension = file.name.substring(file.name.lastIndexOf('.') + 1);
            let size = file.size / 1024 / 1024;
            if (extension !== 'xls') {
                this.$message.warning('只能上传后缀是.xls的文件');
                return false
            }
            if (size > 20) {
                this.$message.warning('文件大小不得超过20M');
                return false
            }
        },
        // 文件上传成功时的钩子
        handleSuccess(res, file, fileList) {
            this.$message.success(res);
        },
        // 文件上传失败时的钩子
        handleError(err, file, fileList) {
            this.$message.error(err);
        },

    }
}
</script>

<style>
.el-upload-dragger{
    width:560px !important;
    border: 2px dashed #d9d9d9 !important;
}
.el-upload__tip {
    font-size: 13px !important;
    margin-top: 7px;
}
.el-upload__text em {
    color: #0fee8d !important;
}
.el-upload-list {
    margin: 0 auto !important;
    padding: 0;
    list-style: none;
    width: 50% !important;
}
.el-upload-list__item-name {
    text-align: left !important;
}
</style>
