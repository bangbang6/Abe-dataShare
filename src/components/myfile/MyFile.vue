<template>
  <div class="my-file">
    <div class="header">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        clearable
      />
      <div class="wrapper">
        <el-input v-model="fileName" type="primary" size="mini" clearable placeholder="请输入文件名" />
        <el-button slot="append" icon="el-icon-search" type="primary" size="mini" @click="search" />
      </div>
    </div>
    <el-table
      ref="multipleTable"
      size="mini"
      :data="list.slice((page-1)*6,page*6)"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="文件名" width="200">
        <template slot-scope="scope">{{ scope.row.dataName }}</template>
      </el-table-column>
      <el-table-column prop="dataSize" label="文件大小" />
      <el-table-column prop="channelName" label="所在channel" />
      <el-table-column label="...">
        <template slot-scope="scope">
          <el-tooltip
            v-for="item in operations"
            :key="item.id"
            class="item"
            effect="light"
            placement="bottom-start"
            style="margin-right: 5px"
            :content="item.content"
          >
            <el-link
              :icon="item.icon"
              style="font-size: 18px;color: #409EFF"
              @click="handleClick(scope.row,item.id)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="上传日期">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime.split('.')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更改日期">
        <template slot-scope="scope">
          <span>{{ scope.row.modifiedTime.split('.')[0] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="list.length"
      :page-size="6"
      size="mini"
      :style="{marginTop:'20px',textAlign:'center'}"
      @current-change="handlePageChange"
    />
    <div
      v-if="showTextarea"
      class="result"
      style="position:absolute;width:100%;height:88%;z-index:999;top:50px;background:white;padding:20px"
    >
      <div class="header2" :style="{fontSize:'22px',textAlign:'center'}">{{ seeFileName }}</div>
      <textarea
        id="fileMessage"
        v-model="fileContent"
        name="result"
        :readonly="!seeOrChange"
        style="width:100%;height:80%;display:inline-block;border:none;font-size:16px;margin-top:20px;outline: none"
      />
      <div class="footer" style="display:flex;justify-content:flex-end">
        <el-button type="primary" @click="showTextarea = false">返回</el-button>
        <el-button v-if="seeOrChange" type="primary" @click="submitChangeFile">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { backwardFile, getMyFile, previewFile, updateFile } from '@/api/file'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      fileName: '',
      date: [],
      list: [],
      operations: [],
      page: 1,
      seeFileName: '',
      fileContent: '',
      showTextarea: false,
      seeOrChange: true
    }
  },
  async mounted () {
    this.operations = [
      {
        id: 0,
        content: '预览',
        icon: 'el-icon-view'
      },
      {
        id: 1,

        content: '修改',
        icon: 'el-icon-edit'
      },
      {
        id: 2,

        content: '溯源',
        icon: 'el-icon-attract'
      },
      {
        id: 3,

        content: '追踪',
        icon: 'el-icon-position'
      }
    ]
    const list = await getMyFile()
    this.list = list.map(item => ({
      ...item,
      dataSize: (+item.dataSize / 1024).toFixed(2) + 'MB'

    })
    )
  },
  methods: {
    async handleClick (row, opId) {
      if (opId === 0) {
        const fileContent = await previewFile(row.id)
        console.log('fileContent', fileContent)
        if (fileContent) {
          this.fileContent = fileContent
          this.seeFileName = row.dataName
          this.showTextarea = true
          this.seeOrChange = false
        }
      } else if (opId === 1) {
        const fileContent = await previewFile(row.id)
        this.fileId = row.id
        if (fileContent) {
          this.fileContent = fileContent
          this.seeFileName = row.dataName
          this.showTextarea = true
          this.seeOrChange = true
        }
      } else if (opId === 2) {
        
        this.$router.push({
          path: '/info/backforward',
          query: {
            id: row.id
          }
        })
      }
    },
    handlePageChange (page) {
      this.page = page
    },
    async submitChangeFile () {
      const res = await updateFile({
        dataId: this.fileId,
        dataContent: this.fileContent
      })
      Message({
        type: 'success',
        duration: '1000',
        message: '文件修改成功'
      })
    },
    search (e) {

    },
    async reGetList () {
      const list = await getMyFile()
      this.list = list.map(item => ({
        ...item,
        dataSize: (+item.dataSize / 1024).toFixed(2) + 'MB'

      })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.my-file {
  height: 360px;
  position: relative;
  .header {
    display: flex;
    justify-content: space-between;
    .wrapper {
      display: flex;
    }
  }
  .el-table {
    margin-top: 20px;
  }
}
</style>
