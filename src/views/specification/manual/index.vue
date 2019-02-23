<template>
  <div>
    <el-row class="mtop">
      <el-col :span="20" :offset="2">
        <el-steps :active="active" simple finish-status="success">
          <el-step title="添加服务" icon="el-icon-upload">
            <el-row>
              <el-col :span="9" :offset="2">
                <img src="@/assets/image/service.jpg" class="limage">
              </el-col>
              <el-col :span="10" :offset="1" class="rcenter">
                <p><strong>SerivceName</strong>(required)</p>
                <el-input v-model="SerivceName" placeholder="请输入服务名"/>
                <p style="margin-top: 40px;"><strong>ServiceAddr </strong>(optional)</p>
                <el-input v-model="ServiceAddr" placeholder="请输入服务名"/>
              </el-col>
            </el-row>
          </el-step>
          <el-step title="添加文档" icon="el-icon-document"/>
          <el-step title="编写规约" icon="el-icon-edit"/>
        </el-steps>
      </el-col>
    </el-row>
    <el-row v-show="step1 === true">
      <h2 class="hcenter">Basic information of the Web Service Testing</h2>
      <el-col :span="9" :offset="2">
        <img src="@/assets/image/service.jpg" class="image1">
      </el-col>
      <el-col :span="10" :offset="1" class="rcenter">
        <p><strong>SerivceName</strong>(required)</p>
        <el-input v-model="SerivceName" placeholder="请输入服务名"/>
        <p style="margin-top: 40px;"><strong>ServiceAddr </strong>(optional)</p>
        <el-input v-model="ServiceAddr" placeholder="请输入服务名"/>
      </el-col>
    </el-row>
    <el-row v-show="step2 === true">
      <h2 class="hcenter">Add your SpecDoc of Service</h2>
      <el-col :span="9" :offset="2">
        <img src="@/assets/image/specdoc.jpg" class="image2">
      </el-col>
      <el-col :span="10" :offset="1" class="rcenter">
        <p><strong>DocName </strong>(required)</p>
        <el-input v-model="DocName" placeholder="请输入文档名"/>
        <p style="margin-top: 40px;"><strong>Package</strong>(optional)</p>
        <el-input v-model="Package" placeholder="请输入包名"/>
      </el-col>
    </el-row>
    <el-row v-show="step3 === true">
      <h2 class="hcenter">Write your Spec</h2>
      <el-col :span="1" :offset="20">
        <el-upload
          v-show="active >= 2"
          ref="upload"
          :limit="3"
          :action="local"
          :on-success="success"
          name="file"
          class="">
          <el-button type="text">打开本地规约</el-button>
        </el-upload>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-input v-model="specContent" type="textarea" rows="15"/>
      </el-col>
    </el-row>
    <el-row class="mtop">
      <el-col v-show="active !== 0" :span="1" :offset="2">
        <el-button type="primary" @click="pre">
          上一步
        </el-button>
      </el-col>
      <el-col :span="1" :offset="18">
        <el-button v-show="active <= 1" type="primary" @click="next" >
          下一步
        </el-button>

        <el-button v-show="active >= 2" type="primary" @click="save" >
          保存
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { config } from '../../../utils/request'
import axios from 'axios'
import { getUsername } from '../../../utils/auth'

export default {
  name: 'Manual',
  data() {
    return {
      local: config.base_url + '/spec',
      specContent: '',
      active: 0,
      SerivceName: '',
      ServiceAddr: '',
      DocName: '',
      Package: '',
      isActive: true,
      step1: true,
      step2: false,
      step3: false
    }
  },
  methods: {
    next() {
      if (this.active === 0) {
        this.active = this.active + 1
        this.step3 = false
        this.step2 = true
        this.step1 = false
      } else if (this.active === 1) {
        this.active = this.active + 1
        this.step3 = true
        this.step2 = false
        this.step1 = false
      }
    },
    pre() {
      if (this.active === 1) {
        this.active = this.active - 1
        this.step3 = false
        this.step2 = false
        this.step1 = true
      } else if (this.active === 2) {
        this.active = this.active - 1
        this.step3 = false
        this.step2 = true
        this.step1 = false
      } else if (this.active === 3) {
        this.active = this.active - 2
        this.step3 = false
        this.step2 = true
        this.step1 = false
      }
    },
    save() {
      if (this.active === 2) {
        this.active = this.active + 1
      }
      if (this.SerivceName === '') {
        this.$message.error('服务名为空!')
      }
      if (this.DocName === '') {
        this.$message.error('规约名为空!')
      }
      if (this.specContent !== '') {
        const url = config.base_url + '/save'
        axios
          .post(url, {
            username: getUsername(),
            SpecID: this.SerivceName,
            specdoc: this.DocName,
            content: this.specContent
          })
          .then(response => {
            this.$message({
              message: '上传成功！',
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$message.error('你还未填写规约!')
      }
    },
    success(response, file, fileList) {
      this.specContent = response.data
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>
  .step1{
    display: none;
  }
  .hcenter{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .rcenter{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    justify-items: center;
    align-content: center;
  }
  .mtop{
    margin-top: 35px;
    display: flex;
    flex-direction: row;
  }
  .image1{
    /*border: 1px solid lightslategray;*/
    box-shadow: lightgray 5px 5px 8px 5px;
  }
  .image2{
    width: 500px;
    height: 334px;
    /*border: 1px solid lightslategray;*/
    box-shadow: lightgray 5px 5px 8px 5px;
  }
</style>

