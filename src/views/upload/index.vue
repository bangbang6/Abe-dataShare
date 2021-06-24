<template>
  <div class="upload-wrapper">
    <el-card>
      <div slot="header" class="clearfix">
        <span>文件上传</span>
      </div>
      <div class="upload1">
        <div class="upload">
          <el-upload
            ref="upload"
            class="upload-demo"
            drag
            :action="action"
            multiple
            :http-request="uploadFile"
            :on-remove="handleRemove"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
          <div v-loading="loading" style="marginTop:20px" />
        </div>
        <div class="message">
          <div class="info">
            <span class="key">上传文件一次上链:</span>
            <span v-if="firstUpChainTx" class="value">
              {{ firstUpChainTx }}
              <i class="el-icon-circle-check" :style="{color:'#67c23a'}" />
            </span>
          </div>
          <div class="info">
            <span class="key">二次上链:</span>
            <span v-if="secondUpChainTx" class="value">
              {{ secondUpChainTx }}
              <i class="el-icon-circle-check" :style="{color:'#67c23a'}" />
            </span>
          </div>
          <div class="info">
            <span class="key">授权用户文件读取权限:</span>
            <span v-if="grantReadRes" class="value">
              <el-tag type="success">{{ grantReadRes === 'true'?'success':'fail' }}</el-tag>
            </span>
          </div>
          <div class="info">
            <span class="key">授权用户文件修改权限:</span>
            <span v-if="grantModifyRes" class="value">
              <el-tag type="success">{{ grantModifyRes === 'true'?'success':'fail' }}</el-tag>
            </span>
          </div>
        </div>
      </div>
      <div class="celue">
        <div class="name">文件上传策略</div>
        <el-divider></el-divider>
        <div class="role">
          <div class="item">
            <div class="key">职称:</div>
            <el-tag type="danger" effect="dark" size="mini">老师</el-tag>
            <el-tag type="danger" effect="dark" size="mini">学生</el-tag>
          </div>
        </div>
        <div class="expression">策略表达式:(a and b)</div>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      action: '',
      loading: false,
      channels: [],
      channel: '同济医院',
      grantReadRes: '',
      grantModifyRes: '',
      firstUpChainTx: '',
      secondUpChainTx: ''
    }
  },
  mounted () {
    /* checkChannel().then(res => {
      if (res.data.code === 200) {
        this.channels = res.data.data

      }s
    }) */
  },

  methods: {
    uploadFile: function (param) {
      const fileObject = param.file
      const formData = new FormData()
      formData.append('file', fileObject)
      this.loading = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.loading = false

      this.$refs.upload.abort(file)
    }

  }
}
</script>

<style scoped lang='scss'>
.upload-wrapper {
  padding: 20px;
  box-sizing: border-box;
  .upload1 {
    display: flex;
    .upload {
      width: 40%;
      height: 100%;
    }
    .message {
      width: 40%;
      height: 100%;
      height: 80%;
      background: white;
      .info {
        width: 100%;
        height: 20px;
        color: black;
        font-size: 14px;

        padding: 20px;
        box-sizing: border-box;

        .key {
          display: inline-block;
          width: 160px;
          text-align: right;
          margin-right: 10px;
        }
      }
    }
  }
  .celue {
    background: #faf9f9;
    widows: 100%;
    height: 400px;
    padding: 20px;
    box-sizing: border-box;
    .role {
      font-size: 14px;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        .key {
          color: #009dff;
          font-weight: bold;
        }
        .el-tag {
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }
  .expression {
    font-size: 14px;
  }
}
</style>
