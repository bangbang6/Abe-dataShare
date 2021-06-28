<template>
  <div class="upload-wrapper">
    <el-card>
      <div slot="header" class="clearfix">
        <span>文件上传</span>
        <el-button type="primary" size="mini" :style="{float:'right'}" @click="upload">上传</el-button>
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
          <div style="marginTop:20px" />
        </div>
        <div class="message">
          <div class="info">
            <span class="key">科室:</span>
            <span v-if="firstUpChainTx" class="value">
              {{ firstUpChainTx }}
              <i class="el-icon-circle-check" :style="{color:'#67c23a'}" />
            </span>
          </div>
          <div class="info">
            <span class="key">类型:</span>
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
        <el-divider />
        <div class="role">
          <div v-for="(item,index) in allRoles" class="item">
            <div class="key">{{ item.key }}:</div>
            <el-checkbox-group v-model="selectRolesList[index]">
              <el-checkbox v-for="role in item.value" :key="role" :label="role" />
            </el-checkbox-group>
          </div>
        </div>
        <div class="expression">策略表达式: {{ fileLegancy }}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { uploadFile } from '@/api/file'
import { getAllRoles } from '@/api/role'
import { Message, Notification } from 'element-ui'

export default {
  data () {
    return {
      action: '',
      grantReadRes: '',
      grantModifyRes: '',
      firstUpChainTx: '',
      secondUpChainTx: '',
      fileLegancy: '',
      allRoles: [],
      selectRolesList: []
    }
  },
  watch: {
    selectRolesList: {
      handler: function (newV) {
        this.fileLegancy = ''
        console.log('newV', newV)
        newV.forEach((item, index) => {
          if (item.length === 0) return
          else if (item.length === 1) {
            /* index !== 0 && (this.fileLegancy += ' and ' + item) */
            /* index === 0 &&  */(this.fileLegancy += item)
          } else {
            this.fileLegancy = this.fileLegancy + '('
            this.fileLegancy = this.fileLegancy + item.join(' or ')
            this.fileLegancy = this.fileLegancy + ')'
          }
          if (index < newV.filter(v => v.length > 0).length - 1) this.fileLegancy = this.fileLegancy + ' and '
        })
      },
      immediate: true
    }
  },
  async mounted () {
    const allRoles = await getAllRoles()
    this.allRoles = allRoles
    let length = allRoles.length
    while (length--) {
      this.selectRolesList.push([])
    }
  },

  methods: {
    uploadFile: function (param) {
      this.file = param.file
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)

      this.$refs.upload.abort(file)
    },
    async upload () {
      if (!this.file) {
        Notification.error({
          title: '拒绝',
          message: '请添加文件',
          duration: 1000

        })
        return
      }
      if (!this.fileLegancy) {
        Notification.error({
          title: '拒绝',
          message: '请填写上传策略',
          duration: 1000

        })
        return
      }
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('rules', this.fileLegancy)
      const res = await uploadFile(formData)
      console.log('res', res)
      if (res) {
        Message({
          message: '上传成功',
          duration: 1000,
          type: 'success'
        })
      }
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
          margin-right: 20px;
        }
      }
    }
  }
  .expression {
    font-size: 14px;
  }
}
</style>

