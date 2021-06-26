<template>
  <div class="user">
    <div class="user-info">
      <div class="left">
        <div class="key">用户名:</div>
        <div class="key">所属部门:</div>
      </div>
      <div class="right">
        <div class="value">{{ username }}</div>
        <div class="value">华中科技大学计算机学院</div>
      </div>
    </div>
    <div class="roles">
      <div class="now-role">
        <div class="title-wrapper">
          <div class="block" />

          <div class="title">现有属性</div>
        </div>
        <div class="list">
          <div class="list-item bold">
            <div class="paper-title">属性名</div>
            <div class="author">属性值</div>
          </div>
          <div
            v-for="(role,index) in nowRoles"
            :key="index"
            class="list-item"
            @click="handleClick(index)"
          >
            <div class="paper-title overflow">{{ role.roleKey }}</div>
            <div class="author overflow">{{ role.roleValue }}</div>
          </div>
        </div>
      </div>
      <div class="request-role">
        <div class="block" />
        <div class="title-wrapper">
          <div class="title">
            <div class="block" />
            <div>申请属性</div>
          </div>
          <el-radio-group v-model="sortRule" size="mini">
            <el-radio-button label="申请时间" />
            <el-radio-button label="名称" />
          </el-radio-group>
        </div>
        <div class="list">
          <div class="list-item bold">
            <div class="paper-title">属性名</div>
            <div class="author">属性值</div>
            <div class="give-person">审批者</div>
            <div class="status">状态</div>
            <div class="time">时间</div>
          </div>
          <div
            v-for="(role,index) in requestRoles"
            :key="index"
            class="list-item"
            @click="handleClick(index)"
          >
            <div class="paper-title overflow">{{ role.roleKey }}</div>
            <div class="author overflow">{{ role.roleValue }}</div>

            <div class="give-person">{{ role.targetUserName }}</div>
            <div class="status">
              <el-tag
                :type="role.type"
                size="mini"
                :style="{width:'80px',textAlign:'center'}"
              >{{ role.status }}</el-tag>
            </div>
            <div class="time">{{ role.applyTime.split('.')[0] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserApplyAttributes, getUserAttributes } from '@/api/role'
import { getToken } from '@/utils/auth'
export default {
  name: 'User',
  data () {
    return {
      username: getToken('abe-username'),
      nowRoles: [],
      requestRoles: [],
      sortRule: '申请时间'
    }
  },
  async mounted () {
    const requestRoles = await getUserApplyAttributes()
    this.requestRoles = requestRoles.map(item => ({
      ...item,
      roleKey: item.attributes.split(':')[0],
      roleValue: item.attributes.split(':')[1],
      status: item.state === 0 ? '待处理' : item.result === 1 ? '已同意' : '已拒绝',
      type: item.state === 0 ? 'primary' : item.result === 1 ? 'success' : 'danger'

    })
    )
    const nowRoles = await getUserAttributes()
    this.nowRoles = nowRoles.map(item => ({
      ...item,
      roleKey: item.split(':')[0],
      roleValue: item.split(':')[1]
    }))
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  padding-left: 20px;
  padding-top: 40px;
  font-size: 14px;
  .user-info {
    display: flex;
    .left {
      width: 120px;
      text-align: right;
      display: flex;
      flex-direction: column;
    }
    .right {
      display: flex;
      text-align: left;
      flex-direction: column;
    }
    .key,
    .value {
      margin-bottom: 20px;
    }
  }
  .roles {
    margin-top: 20px;
    padding-left: 60px;
    padding-right: 60px;
    box-sizing: border-box;

    .now-role {
      .title-wrapper {
        display: flex;
        align-items: center;
        .block {
          width: 10px;
          height: 10px;
          background: #d71e1e;
        }
        .title {
          font-size: 16px;
          font-weight: 500;

          margin-left: 10px;
        }
      }

      .list {
        margin-top: 20px;
        .list-item {
          padding-left: 20px;
          box-sizing: border-box;
          display: flex;
          border-bottom: 1px solid #eee;
          .paper-title,
          .author {
            height: 30px;
            padding: 0 10px;
            text-align: center;
            line-height: 30px;
            box-sizing: border-box;
            font-size: 12px;
          }
          .paper-title {
            width: 20%;
            text-align: left;
          }

          .author {
            width: 80%;
            text-align: left;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
          /* &.bold {
            font-weight: bold;
          } */
        }
      }
    }
    .request-role {
      margin-top: 40px;
      .title-wrapper {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 16px;
          font-weight: 500;
          display: flex;
          align-items: center;
          .block {
            width: 10px;
            height: 10px;
            background: #d71e1e;
            margin-right: 10px;
          }
        }
      }

      .list {
        margin-top: 20px;
        .list-item {
          padding-left: 20px;
          box-sizing: border-box;
          display: flex;
          border-bottom: 1px solid #eee;
          .paper-title,
          .author,
          .give-person,
          .time,
          .status {
            height: 20px;
            padding: 0 10px;
            text-align: center;
            font-size: 12px;
            line-height: 30px;
            height: 30px;
          }
          .status {
            width: 20%;
            text-align: left;
          }
          .paper-title {
            width: 20%;
            text-align: left;
          }
          .author {
            width: 20%;
            text-align: left;
          }
          .give-person {
            width: 20%;
            text-align: left;
          }
          .time {
            width: 20%;
            text-align: left;
          }
          .overflow {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: inline-block;
          }

          /* &:nth-child(odd) {
        background: #f2f2f2;
      }
      &:nth-child(even) {
        background: white;
      } */
          /* &.bold {
            font-weight: bold;
          } */
        }
      }
    }
  }
}
</style>
