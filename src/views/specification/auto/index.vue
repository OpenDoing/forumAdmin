<template>
  <div>
    <el-row class="mtop">
      <el-col :span="6" :offset="4" class="choose">
        <p>请选择服务：</p>
        <el-select v-model="Service" placeholder="请选择">
          <el-option label="OnlineMedicalSystem" value="1"/>
          <el-option label="Stack" value="2"/>
          <el-option label="GoGrid" value="3"/>
        </el-select>
      </el-col>
      <el-col :span="4" class="choose">
        <el-input v-model="specname" placeholder="请输入规约名">
          <template slot="prepend">规约名：</template>
        </el-input>
      </el-col>
      <el-col :span="1" :offset="1" class="choose">
        <el-upload
          ref="upload"
          :limit="3"
          :on-success="success"
          name="file"
          action="http://localhost:8000/spec"
          class="">
          <el-button type="info">打开本地规约</el-button>
        </el-upload>
      </el-col>
      <el-col :span="2" :offset="1" class="choose">
        <el-button type="primary" style="margin-left: 60px" @click="save">
          保存
        </el-button>
      </el-col>

    </el-row>

    <el-row class="mtop">
      <el-col :span="15" :offset="4">
        <el-input v-model="textarea" :rows="25" type="textarea" class="specTextarea" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Auto',
  data() {
    return {
      specname: '',
      textarea: '',
      Service: '请选择服务',
      SpecDoc: '请选择guiyue'
    }
  },
  methods: {
    save() {
      if (this.specname === '') {
        this.$message.error('请填写规约名！')
      } else if (this.textarea === '') {
        this.$message.error('规约内容为空！')
      } else {
        this.$message({
          message: '上传成功！',
          type: 'success'
        })
      }
    },
    success(response, file, fileList) {
      this.textarea = response.data
      this.$refs.upload.clearFiles()
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
  .specTextarea{
    height: 400px;
  }
  .file{
    opacity: 0;
  }
  .line{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .choose{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
