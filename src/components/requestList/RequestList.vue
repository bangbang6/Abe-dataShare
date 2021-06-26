<template>
  <el-card class="request-list">
    <div slot="header" class="clearfix">
      <span>申请列表</span>
    </div>
    <div v-if="list.length" class="list">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in list"
          :key="index"
          color="#D71E1E"
          :timestamp="item.applyTime.split('.')[0]"
          placement="top"
        >
          <div :style="{height:'40px',lineHeight:'40px'}">
            <span>向{{item.applierName}}申请</span>
            <span :style="{color:'#009DFF',marginLeft:'5px'}">{{item.attributes}}</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div class="tag" v-if="list.length">
        <el-tag type="danger" effect="dark" size="mini">最新</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getUserApplyAttributes } from '@/api/role'
export default {
  data () {
    return {
      list: []
    }
  },
  async mounted () {
    const list = await getUserApplyAttributes()
    console.log('list', list)
    this.list = list
  }
}
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  .tag {
    position: absolute;
    left: 200px;
    top: 0px;
  }
}
</style>
