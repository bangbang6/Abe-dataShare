<template>
  <div class="backforward">
    <div class="header">
      <el-button size="mini" type="primary" @click="$router.back()">返回</el-button>
      <div class="title">{{ fileName }}的溯源信息</div>
      <div></div>
    </div>
    <div class="content">
      <div v-for="(item,index) in list" :key="index" class="block" :style="blockStyle(index)">
        <div class="rect">
          <div class="txId">{{item.fileName }}</div>
          <div class="originChain word">操作者: {{ item.user }}</div>
          <div class="user word">操作类型: {{ item.type_tx }}</div>
          <div class="destChain word">所在链: {{ item.dst_chain }}</div>
          <div class="operation word">操作时间: {{ item.createdTime.split('.')[0] }}</div>
        </div>
        <div class="icon">
          <i
            v-if="(index%5!==4) && index!==list.length-1"
            class="iconfont icon-arrowRight el-icon-right"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { backwardFile } from '@/api/file'
export default {
  data () {
    return {
      list: [],
      fileName: ''
    }
  },
  methods: {
    blockStyle (index) {
      const style = {
        left: (index % 5 * 240) + 'px',
        top: (Math.floor(index / 5) * 180) + 'px'

      }
      return style
    }
  },
  async mounted () {
    const id = this.$route.query.id
    if (!id) {
      Message({
        message: '文件不存在',
        duration: 1000,
        type: 'error'
      })
      this.$router.back()
    }
    const historys = await backwardFile(id)
    console.log('historys', historys)
    this.fileName = historys[0].fileName
    this.list = historys.map(item => ({
      ...item.record,
      fileName: item.fileName
    }))
  }
}
</script>

<style lang="scss" scoped>
.backforward {
  padding: 20px;
  box-sizing: border-box;
  height: calc(100vh - 50px);

  .header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .content {
    position: relative;
    height: 100%;
    margin-top: 40px;
    .block {
      top: 100px;
      position: absolute;

      display: flex;
      align-items: center;
      width: 240px;
      height: 140px;
      .rect {
        padding: 10px;
        box-sizing: border-box;
        width: calc(100vw / 5 - 80px);
        height: 140px;
        background-color: #213566;
        color: #c0c4cc;
        font-size: 12px;
        .txId {
          color: #18a1df;
          height: 30px;
          font-size: 16px;
        }
        .word {
          height: 18px;
        }
      }
      .icon {
        height: 40px;
        width: 40px;
        .icon-arrowRight {
          font-size: 40px;
          color: #327088;
          color: #18a1df;
        }
        .icon-arrowLeft-fill {
          font-size: 40px;
          color: #327088;
        }
        .icon-xiajiantou- {
          font-size: 40px;
          color: #327088;
        }
      }
    }
  }
}
</style>
