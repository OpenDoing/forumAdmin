<template>
  <div>
    <el-row class="mt_40 vcenter">
      <el-col :span="2" :offset="2">
        测试用例
      </el-col>
      <el-col :span="14">
        <el-select v-model="caseSelect" placeholder="请选择">
          <el-option
            v-for="item in cases"
            :key="item.value"
            :label="item.label"
            :value="item.value"/>
        </el-select>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="primary" @click="confirm">
          确认
        </el-button>
      </el-col>
    </el-row>
    <el-row class="vcenter">
      <el-col :span="9" :offset="2">
        <el-card class="border">
          <div slot="header">
            <span>单线TEG-I</span>
          </div>
          <img v-show="teg === true" src="@/assets/image/teg2.png" class="image">
        </el-card>
      </el-col>
      <el-col :span="1" class="vcenter">
        <el-button type="primary" icon="el-icon-d-arrow-right" circle style="margin-left: 15px;" @click="trans"/>
      </el-col>
      <el-col :span="9" style="margin-left: 15px;" >
        <el-card class="border">
          <div slot="header">
            <span>单线测试序列</span>
          </div>
          <el-input v-model="sequence" type="textarea" rows="18"/>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      teg: false,
      sequence: '',
      caseSelect: '',
      cases: [{
        value: '1',
        label: ' isEq(top(push(pop(st),1)),top(replace(st,1))),if isEq(isG(length(st),0),true)'
      },
      {
        value: '2',
        label: ' length(pop(pop(push(s,7)))) = length(pop(s)), if length(s) > 0'
      }
      ]
    }
  },
  methods: {
    confirm() {
      if (this.caseSelect === '') {
        this.$message.error('你还未选择测试用例!')
      } else {
        this.teg = true
      }
    },
    trans() {
      this.sequence = '_1=top(st)\n' +
        '_2=length(st)\n' +
        '_3=isG(_2,0)\n' +
        '_4=isEq(_3,true)\n' +
        'AssertTrue(_4)\n' +
        '_5=pop(st)\n' +
        '_6=push(_5,1)\n' +
        '_7=top(_6)\n' +
        'st=replace(_6,_1)\n' +
        '_8=replace(st,1)\n' +
        '_9=top(_8)\n' +
        '_10=isEq(_7,_9)'
    }
  }
}
</script>

<style scoped>
  .content{
    margin-top: 50px;
    /*min-height: 1000px;*/
  }

  .mt_40 {
    margin-top: 40px;
  }

  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .image {
    width: 290px;
    height: 400px;
    margin-left: 100px;
  }

  .border {
    height: 500px;
    border: 1px solid lightgray;
    border-radius: 25px;
    /*margin-left: 170px;*/
    /*margin-right: 160px;*/
    /*height: 300px;*/
    /*margin-top: 50px;*/
    /*margin-bottom: 50px;*/

  }
</style>
