<template>
  <div>
    <el-row>
      <el-col :span="8">
        <el-select v-model="controller" placeholder="请选择" @change="showUrl">
          <el-option
            v-for="item in urlList"
            :key="item.specid"
            :label="item.specid"
            :value="item.specid"/>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
// import { config } from '@/utils/request'
// import { getUsername } from '@/utils/auth'
export default {
  name: 'Index',
  data() {
    return {
      controller: '',
      urlList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const url = 'http://localhost:8001/v2/api-docs'
      axios
        .get(url)
        .then(res => {
          console.log(res)
          this.urlList = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    showUrl() {
      console.log(1)
    }
  }
}
</script>

<style scoped>

</style>
