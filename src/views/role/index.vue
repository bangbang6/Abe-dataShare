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
            <div class="value">{{ userWord }}</div>
          </div>
          <div class="user-list">
            <el-radio-group v-model="user" @change="handleUserChange">
              <el-radio v-for="item in allUsers" :key="item.id" :label="item.id">{{ item.username }}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="role-request">
          <div class="header">
            <div class="wrapper">
              <div class="key">申请属性:</div>
              <div class="value">{{ roles }}</div>
            </div>
            <el-button type="primary" size="mini" @click="dialogVisible= true">申请</el-button>
          </div>
          <div v-if="roleList.length" class="user-list">
            <el-checkbox-group v-model="requestRoles">
              <el-checkbox v-for="item in roleList" :key="item" :label="item" />
            </el-checkbox-group>
            <!-- <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
              small
              class="pagination"
            />-->
          </div>
          <div v-else class="empty">
            <Empty description="暂无属性哦" image="@/assets/empty.png" />
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog title="申请理由" :visible.sync="dialogVisible" width="30%">
      <div>
        <span>备注:</span>
        <el-input size="mini" v-model="applyRemarks" :style="{width:'320px',marginLeft:'20px'}"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="mini" @click="handleApply">申请</el-button>
      </span>
    </el-dialog>
    <request-list />
  </div>
</template>

<script>
import RequestList from '@/components/requestList/RequestList.vue'
import { applyForAttributes, getAllUsers, getOtherUserAttributes } from '@/api/role'
import Empty from '@/components/empty/Empty.vue'
import { Message } from 'element-ui'
export default {
  components: { RequestList, Empty },
  data () {
    return {
      user: 0,
      roleList: [],
      allUsers: [],
      requestRoles: [],
      roles: '',
      dialogVisible: false,
      applyRemarks: ""
    }
  },
  computed: {

    userWord () {
      if (this.user === 0) return ''
      return this.allUsers.filter((item) => item.id === this.user)[0].username
    }
  },
  watch: {
    requestRoles: function (newV) {
      console.log('newV', newV)
      if (newV.length === 0) {
        this.roles = ''
      } else {
        this.roles = newV.join(',')
      }
    }
  },
  async mounted () {
    const allusers = await getAllUsers()
    console.log('allusers', allusers)
    this.allUsers = allusers
    this.user = this.allUsers[0].id
    this.handleUserChange(this.user)
  },
  methods: {
    async handleUserChange (e) {
      console.log('e', e)
      this.roleList = []
      this.requestRoles = []
      this.roles = ''
      const roles = await getOtherUserAttributes(e)
      console.log('roles', roles)

      if (!roles) {
        this.roleList = []
      } else {
        this.roleList = roles
      }
    },
    async handleApply () {
      if (!this.userWord || !this.roles) return
      const res = await applyForAttributes({
        targetUserName: this.userWord,
        attributes: this.roles,
        applyRemarks: this.applyRemarks
      })
      if (res) {
        Message({
          message: '申请成功',
          duration: 1000,
          type: 'success'
        })

      }
      this.dialogVisible = false
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
        height: 260px;

        .el-radio-group {
          height: 260px;
          overflow-y: auto;
        }
        .el-radio-group {
          display: flex;
          flex-direction: column;
          width: 90%;

          .el-radio {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding-left: 10px;
            margin-right: 0px !important;
            /* &.is-checked {
              margin-right: 0px !important;
            } */
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
        height: 260px;

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
      .empty {
        background: #fbfbfb;
        padding-bottom: 20px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
