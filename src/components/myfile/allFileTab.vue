<template>
  <div class="all-file">
    <el-tabs v-model="channelId" type="card" @tab-click="handleTabClick">
      <el-tab-pane v-for="(item,index) in channels" :key="item.id" :label="item.channelName">
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
          :data="list[index]"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="文件名" width="200">
            <template slot-scope="scope">{{ scope.row.dataName }}</template>
          </el-table-column>
          <el-table-column prop="dataSize" label="文件大小" />
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
      </el-tab-pane>
    </el-tabs>
    <div class="header" />
  </div>
</template>

<script>
import { getAllChannel } from '@/api/user'
import { getAllFile } from '@/api/file'
export default {
  data () {
    return {
      channelId: 0,
      channels: [],
      date: [],
      fileName: '',
      list: [],
      operations: []

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
        icon: 'el-icon-position'
      }
    ]
    this.channels = await getAllChannel()
    console.log('this.channels', this.channels)
    const list = await getAllFile()
    const listArr = []
    for (const key in list) {
      listArr.push(list[key])
    }
    this.list = listArr
    console.log('this.list', this.list)
  },
  methods: {
    handleTabClick (tab) {
      console.log('tab', tab)
    },
    search () {

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
}
</style>
