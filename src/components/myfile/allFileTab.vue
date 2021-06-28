<template>
  <div class="all-file">
    <el-tabs v-model="channelId" type="border-card" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(item,index) in channels"
        :key="item.id"
        :label="item.channelName"
        :data-tab="`${index}`"
      >
        <div class="header">
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            size="mini"
          />
          <div class="wrapper">
            <el-input v-model="fileName" type="primary" size="mini" clearable placeholder="请输入文件名" />
            <el-button
              slot="append"
              icon="el-icon-search"
              type="primary"
              size="mini"
              @click="search"
            />
          </div>
        </div>
        <el-table
          ref="multipleTable"
          size="mini"
          :data="list.slice((page-1)*6,page*6)"
          style="{width: 100%,height: 450px}"
          tooltip-effect="dark"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="文件名" width="200">
            <template slot-scope="scope">{{ scope.row.dataName }}</template>
          </el-table-column>
          <el-table-column prop="dataSize" label="文件大小" />
          <el-table-column prop="decryptionRules" label="加密策略" show-overflow-tooltip />
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/user'
import { getAllFile, unCodeFile } from '@/api/file'
import { Message } from 'element-ui'
export default {
  data () {
    return {
      channelId: 0,
      channels: [],
      date: [],
      fileName: '',
      list: [],
      listAll: [],
      operations: [],
      page: 1

    }
  },
  async mounted () {
    this.operations = [

      {
        id: 3,

        content: '追踪',
        icon: 'el-icon-position'
      },
      {
        id: 4,

        content: '解密',
        icon: 'el-icon-reading'
      }
    ]
    this.channels = await getAllChannel()
    console.log('this.channels', this.channels)
    const list = await getAllFile()
    const listArr = []
    for (const key in list) {
      listArr.push(list[key])
    }
    this.listAll = listArr

    this.list = this.listAll[0].map(item => ({
      ...item,
      dataSize: (item.dataSize / (1024)).toFixed(2) + 'KB'
    }))
    console.log('list', this.list)
  },
  methods: {
    handlePageChange (page) {
      this.page = page
    },
    handleTabClick (tab) {
      console.log('tab', tab.$el.dataset.tab)
      const tabIndex = +tab.$el.dataset.tab
      this.list = this.listAll[tabIndex]
      console.log('this.list', this.list)
    },
    search () {

    },
    async handleClick (row, opId) {
      if (opId === 4) {
        const res = await unCodeFile({
          dataId: row.id
        })
        console.log('res', res)
        if (res) {
          Message({
            type: 'success',
            duration: 1000,
            message: '解密成功,请在我的文件查看'
          })
          this.$emit('uncode')
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.all-file {
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
