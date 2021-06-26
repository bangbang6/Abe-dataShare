<template>
  <div class="file">
    <el-card>
      <div slot="header" class="clearfix">
        <span>我的文件</span>
      </div>
      <my-file />
    </el-card>
    <el-card :style="{marginTop:'20px'}">
      <div slot="header" class="clearfix">
        <span>所有文件</span>
      </div>
      <all-file-tab />
    </el-card>
  </div>
</template>

<script>
import MyFile from '@/components/myfile/MyFile.vue'
import AllFileTab from '@/components/myfile/AllFileTab.vue'
export default {
  components: { MyFile, AllFileTab },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.file {
  width: 100%;
  padding: 20px;
  height: calc(100vh - 50px);
}
</style>
