<template>
  <div class="result" style="position:absolute;width:80%;height:100%;z-index:999;background:white">
    <div class="header2" :style="{fontSize:'22px',textAlign:'center'}">{{ seeFileName }}</div>
    <textarea
      id="fileMessage"
      v-model="fileContent"
      name="result"
      :readonly="!seeOrChange"
      style="width:100%;height:80%;display:inline-block;border:none;font-size:16px;margin-top:20px;outline: none"
    />
    <div class="footer" style="display:flex;justify-content:flex-end">
      <el-button type="primary" @click="$router.back()">返回</el-button>
      <el-button v-if="seeOrChange" type="primary" @click="submitChangeFile">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['seeOrChange', 'seeFileName', 'fileContent'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
