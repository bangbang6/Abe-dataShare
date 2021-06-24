<template>
  <div class="role">
    <el-card class="request">
      <div slot="header" class="clearfix">
        <span>属性申请</span>
      </div>
      <div class="request-content">
        <div class="user-request">
          <div class="header">
            <div class="key">申请对象:</div>
            <div class="value">{{ user }}</div>
          </div>
          <div class="user-list">
            <el-radio-group v-model="user">
              <el-radio label="user1" />
              <el-radio label="user2" />
              <el-radio label="user3" />
            </el-radio-group>
          </div>
        </div>
        <div class="role-request">
          <div class="header">
            <div class="wrapper">
              <div class="key">申请属性:</div>
              <div class="value">{{ roles }}</div>
            </div>
            <el-button type="primary" size="mini">申请</el-button>
          </div>
          <div class="user-list">
            <el-checkbox-group v-model="roleList">
              <el-checkbox label="role1" />
              <el-checkbox label="role2" />
              <el-checkbox label="role3" />
              <el-checkbox label="role4" />
              <el-checkbox label="role5" />
            </el-checkbox-group>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
              small
              class="pagination"
            />
          </div>
        </div>
      </div>
    </el-card>
    <request-list></request-list>
  </div>
</template>

<script>
import RequestList from '@/components/requestList/RequestList.vue'
export default {
  components: { RequestList },
  data () {
    return {
      user: 'user1',
      roleList: ['role1', 'role3']
    }
  },
  computed: {
    roles () {
      if (this.roleList.length === 0) return ''
      return this.roleList.join(',')
    }
  }
}
</script>

<style lang="scss" scoped>
.role {
  padding: 20px;
  box-sizing: border-box;
  .request-content {
    height: 320px;
    display: flex;
    .user-request {
      padding-right: 40px;
      box-sizing: border-box;
      flex: 1 0 50%;
      .header {
        font-size: 14px;
        height: 30px;
        align-items: center;
        display: flex;
      }
      .user-list {
        margin-top: 10px;
        .el-radio-group {
          display: flex;
          flex-direction: column;
          width: 90%;

          .el-radio {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            &.is-checked {
              margin-right: 0px !important;
            }
          }
          .el-radio:nth-child(odd) {
            background: #ecebeb;
          }
        }
      }
    }
    .role-request {
      padding-left: 40px;
      box-sizing: border-box;
      flex: 1 0 50%;
      .header {
        height: 40px;
        font-size: 14px;
        display: flex;
        line-height: 40px;

        align-items: center;
        justify-content: space-between;
        .wrapper {
          display: flex;
          align-items: center;
        }
      }
      .user-list {
        background: #fbfbfb;
        padding-bottom: 20px;
        box-sizing: border-box;
        .el-checkbox-group {
          width: 90%;
          display: flex;
          flex-direction: column;

          .el-checkbox {
            display: inline-block;
            height: 40px;
            line-height: 40px;
            border-bottom: #bbbbbb 1px solid;
            width: 92%;
            margin-left: 4%;

            padding-right: 10px;
            margin-right: 0px !important;
            box-sizing: border-box;
          }
        }
        .pagination {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
  }
}
</style>
