<template>
  <div class="container">
    <el-row class="vcenter mt30">
      <el-col :span="6" :offset="4">
        <div class="vline vcenter"><p class="font">所有服务</p> </div>
      </el-col>
      <el-col :span="3" :offset="7">
        <div class="vline vcenter"><p class="font">服务数量：{{ slength }}</p></div>
      </el-col>
    </el-row>
    <el-row class="mt50">
      <el-col :span="16" :offset="4">
        <el-collapse accordion @change="handleChange">
          <el-collapse-item v-for="item in servicecList" :key="item.specid" :title="item.specid" :name="item.specid">
            <ul v-for="spec in showSpecList" :key="spec.path" >
              <div>
                <el-row class="bbline">
                  <el-col :span="8">
                    {{ spec.subSpec }}
                  </el-col>
                  <el-col :span="2" :offset="14">
                    <el-button size="mini" type="text" >编辑</el-button>
                  </el-col>
                </el-row>
              </div>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import { config } from '@/utils/request'
import { getUsername } from '@/utils/auth'
export default {
  name: 'Dashboard',
  data() {
    return {
      // activeNames: ['1'],
      servicecList: [],
      showSpecList: [],
      username: '',
      slength: 0
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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
          this.slength = data.length
          this.servicecList = data
        })
    },
    handleChange(val) {
      console.log(val)
      const url = config.base_url + '/listspec?username=' + this.username + '&service=' + val
      axios
        .get(url)
        .then(response => {
          const data = response.data
          this.showSpecList = data
        })
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
  ul{
    padding-left: 0px;
  }
  .bg{
    background: #E9EEF3;
  }
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .mt30{
    margin-top: 30px;
  }
  .vline{
    height: 50px;
    border-left: 5px solid lightsteelblue;
  }
  .font{
    font-size: 20px;
    margin-left: 20px;
  }
  .bbline{
    border-bottom: 1px solid lightgrey;
  }
  .mt50{
    margin-top: 55px;
  }
</style>
