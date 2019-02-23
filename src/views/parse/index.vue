<template>
  <div>
    <el-row class="mtop">
      <el-col :span="6" :offset="4" class="choose">
        <p>选择服务：</p>
        <el-select v-model="Service" placeholder="请选择" @change="showSpec">
          <el-option
            v-for="item in servicecList"
            :key="item.specid"
            :label="item.specid"
            :value="item.specid"/>
        </el-select>
      </el-col>
      <el-col :span="6" :offset="1" class="choose">
        <p>选择规约：</p>
        <el-select v-model="SpecDoc" placeholder="请选择">
          <el-option
            v-for="item in specDocList"
            :key="item.subSpec"
            :label="item.subSpec"
            :value="item.subSpec"/>
        </el-select>
      </el-col>
      <el-col :span="1" :offset="1" class="choose">
        <el-button @click="openSpec">打开</el-button>
      </el-col>
      <!--<el-col :span="1" :offset="1" class="choose">-->
      <!--<el-upload-->
      <!--ref="upload"-->
      <!--:limit="3"-->
      <!--:on-success="success"-->
      <!--name="file"-->
      <!--action="http://localhost:8000/spec"-->
      <!--class="">-->
      <!--<el-button type="primary">本地加载</el-button>-->
      <!--</el-upload>-->
      <!--</el-col>-->
    </el-row>

    <el-row class="mtop">
      <el-col :span="7" :offset="4">
        <el-input v-model="ltext" :rows="25" type="textarea" disabled/>
      </el-col>
      <el-col :span="1" class="choose" style="margin-left: 15px">
        <el-button
          v-loading.fullscreen.lock="fullscreenLoading"
          type="primary"
          icon="el-icon-d-arrow-right"
          circle
          @click="parse"/>
      </el-col>
      <el-col :span="7">
        <el-input v-model="rtext" :rows="25" type="textarea" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import { config } from '@/utils/request'
import { getUsername } from '@/utils/auth'
export default {
  name: 'Parse',
  data() {
    return {
      username: '',
      input5: '',
      Service: '',
      servicecList: [],
      SpecDoc: '',
      specDocList: [],
      ltext: '规约',
      rtext: '解析结果',
      path: '',
      fullscreenLoading: false
    }
  },
  mounted() {
    this.initService()
  },
  methods: {
    initService() {
      const username = getUsername('username')
      this.username = username
      const url = config.base_url + '/service?username=' + username
      axios
        .get(url)
        .then(response => {
          const data = response.data
          console.log(data)
          this.servicecList = data
        })
    },
    showSpec() {
      // console.log(event)
      const url = config.base_url + '/listspec?username=' + this.username + '&service=' + this.Service
      axios
        .get(url)
        .then(response => {
          const data = response.data
          this.specDocList = data
        })
    },
    openSpec() {
      this.ltext = ''
      const url = config.base_url + '/content?username=' + this.username + '&service=' + this.Service + '&doc=' + this.SpecDoc
      axios
        .get(url)
        .then(response => {
          const data = response.data
          this.ltext = data.data.content
          this.path = data.data.path
        })
    },
    parse() {
      this.fullscreenLoading = true
      const url = config.base_url + '/parse?username=' + this.username + '&path=' + this.path
      // const self = this
      axios
        .get(url)
        .then(response => {
          const data = response.data
          this.rtext = data.data
          this.fullscreenLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  .mtop{
    margin-top: 35px;
    display: flex;
    flex-direction: row;

  }
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width: 0px;
  }
  .choose{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
