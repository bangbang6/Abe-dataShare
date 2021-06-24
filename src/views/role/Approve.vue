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
        <el-button size="mini">批量操作</el-button>
      </div>
      <el-table
        ref="multipleTable"
        size="mini"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="属性" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="address" label="申请备注" width="240"></el-table-column>
        <el-table-column prop="name" label="申请人"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="time" label="更新时间"></el-table-column>
        <el-table-column prop="..." label="操作">
          <div class="content">
            <span>通过</span>
            <span>拒绝</span>
          </div>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      role: '',
      date: [],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
    }
  }
}
</script>

<style lang="scss" scoped>
.role-approve {
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 50px);
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
    }
  }
}
</style>
