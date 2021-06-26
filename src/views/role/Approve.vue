<template>
  <div class="role-approve">
    <el-card>
      <div class="header">
        <div class="role">
          <div class="key">属性:</div>
          <div class="value">
            <el-input v-model="role" type="primary" size="mini" clearable />
          </div>
        </div>
        <div class="date">
          <div class="key">日期:</div>
          <div class="value">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              size="mini"
              end-placeholder="结束日期"
              clearable
            />
          </div>
        </div>
        <el-button type="primary" size="mini">查询</el-button>
      </div>
      <div class="header2">
        <el-button type="primary" icon="el-icon-delete" size="mini">删除</el-button>
        <el-button size="mini" @click="handleMutipleRequest">批量操作</el-button>
      </div>
      <el-table
        ref="multipleTable"
        size="mini"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="(row,index)=>judgeSelect(row,index)"
        />
        <el-table-column label="属性" width="120">
          <template slot-scope="scope">{{ scope.row.attributes }}</template>
        </el-table-column>
        <el-table-column prop="applyRemarks" label="申请备注" width="240" />
        <el-table-column prop="applierName" label="申请人" />
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type"
              size="mini"
              :style="{width:'80px',textAlign:'center'}"
            >{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="applyTime" label="申请时间" />
        <el-table-column prop="..." label="操作">
          <template slot-scope="scope">
            <div class="content">
              <span
                :class="{'pending':scope.row.state === 0 }"
                @click="e=>handleClick(scope.row,1)"
              >通过</span>
              <span
                :class="{'pending':scope.row.state === 0 }"
                @click="e=>handleClick(scope.row,0)"
              >拒绝</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="批量操作" :visible.sync="dialogVisible" width="30%">
      <div>
        <span>备注:</span>
        <el-input size="mini" v-model="checkRemarks" :style="{width:'320px',marginLeft:'20px'}"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="e=>handleMutiClick(0)">拒 绝</el-button>
        <el-button type="primary" size="mini" @click="e=>handleMutiClick(1)">同 意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { doMultipleApply, doSingleApply, getApplyList } from '@/api/role'
import { Message, Notification } from 'element-ui'
export default {
  data () {
    return {
      role: '',
      date: [],
      list: [],
      checkRemarks: '',
      chooseList: [],
      dialogVisible: false
    }
  },
  async mounted () {
    const list = await getApplyList()
    console.log('list', list)
    this.list = list.map(item => ({
      ...item,
      applyTime: item.applyTime.split('.')[0],
      status: item.state === 0 ? '待审核' : item.result === 1 ? '已同意' : '已拒绝',
      type: item.state === 0 ? 'primary' : item.result === 1 ? 'success' : 'danger'
    }))
  },
  methods: {
    judgeSelect (row, index) {
      if (row.state === 0) {
        return true
      } else {
        return false
      }
    },
    async handleClick (row, op) {
      if (row.state === 1) return
      const res = await doSingleApply({
        id: row.id,
        result: op,
        checkRemarks: this.checkRemarks
      })
      console.log('res', res)
      if (res) {
        Message({
          message: '审批成功',
          type: 'success',
          duration: 1000
        })
      }
    },
    handleMutipleRequest (e) {
      this.dialogVisible = true
    },
    async handleMutiClick (op) {
      if (op === 0 && this.checkRemarks === '') {
        Notification.error({
          title: '拒绝',
          message: '请填写拒绝原因',
          duration: 1000

        })
        return
      }
      const str = this.chooseList.map(item => ({
        id: item.id, result: op, checkRemarks: this.checkRemarks
      }))
      const res = await doMultipleApply(str)
      console.log('res2', res)
      this.dialogVisible = false
    },
    handleSelectionChange (list) {
      this.chooseList = list
    }

  }
}
</script>

<style lang="scss" scoped>
.role-approve {
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 50px);
  .el-card {
    height: 100%;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .role,
      .date {
        display: flex;
        align-items: center;
        .key {
          letter-spacing: 1px;
          margin-right: 10px;
        }
      }
    }
    .header2 {
      margin-top: 20px;
    }
    .el-table {
      margin-top: 20px;
      .content {
        span {
          margin-left: 2px;
          cursor: pointer;
        }
        .pending {
          color: #1890ff;
        }
      }
    }
  }
}
</style>
