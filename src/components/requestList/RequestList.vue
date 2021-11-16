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
            <span>向{{item.targetUserName}}申请</span>
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
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  async mounted () {

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
