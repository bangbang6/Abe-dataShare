<template>
  <el-card class="request-list">
    <div slot="header" class="clearfix">
      <span>申请列表</span>
    </div>
    <div class="list">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :color="activity.color"
          :timestamp="activity.timestamp"
          placement="top"
        >
          <div>
            向username申请
            <span :style="{color:'#009DFF'}">AAA</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div class="tag">
        <el-tag type="danger" effect="dark" size="mini">最新</el-tag>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activities: [{
        content: '2018-04-12 20:46',
        timestamp: '2018-04-12 20:46',
        color: '#D71E1E'
      }, {
        content: '2018-04-12 20:46',
        timestamp: '2018-04-03 20:46',
        color: '#D71E1E'
      }, {
        content: '2018-04-12 20:46',
        timestamp: '2018-04-03 20:46',
        color: '#D71E1E'

      }, {
        content: '2018-04-12 20:46',
        timestamp: '2018-04-03 20:46',
        color: '#D71E1E'

      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  position: relative;
  .tag {
    position: absolute;
    left: 180px;
    top: 0px;
  }
}
</style>
