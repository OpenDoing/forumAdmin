<template>
  <div class="mt_60">
    <el-row>
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <el-row class="mt_30">
            <el-col :span="4" :offset="2">
              <p>规约</p>
            </el-col>
            <el-col :span="16">
              <el-select v-model="specvalue" placeholder="请选择">
                <el-option
                  v-for="item in spec"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="mt_30">
            <el-col :span="4" :offset="2">
              <p>公理</p>
            </el-col>
            <el-col :span="16">
              <el-select v-model="axiomvalue" placeholder="请选择">
                <el-option
                  v-for="item in axiom"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="mt_30 vcenter">
            <el-col :span="4" :offset="2">
              <el-button size="small" type="info" @click="instantiate">实例化处理</el-button>
            </el-col>
            <el-col :span="16" >
              <el-input v-model="instanResult" placeholder="实例化处理结果"/>
            </el-col>
          </el-row>
          <el-row class="mt_30 vcenter">
            <el-col :span="4" :offset="2">
              <el-button size="small" type="info" @click="equation">等式化处理</el-button>
            </el-col>
            <el-col :span="16">
              <el-input v-model="equResult" placeholder="等式化处理结果"/>
            </el-col>
          </el-row>
          <el-row class="mt_30">
            <el-col :span="4" :offset="18">
              <el-button type="primary" @click="geneGraph">生成TEG-I</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="border">
          <img v-show="teg === true" src="@/assets/image/teg2.png" class="image">
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
      imgPath: '',
      instanResult: '',
      equResult: '',
      specvalue: '',
      spec: [{
        value: '1',
        label: 'Stack'
      },
      {
        value: '2',
        label: 'Queue'
      },
      {
        value: '3',
        label: 'Account'
      }
      ],
      axiomvalue: '',
      axiom: [{
        value: '1',
        label: 'top(push(pop(st),x)) = top(replace(st,x)), if length(st) > 0'
      }]
    }
  },
  methods: {
    instantiate() {
      this.instanResult = 'top(push(pop(st),1)) = top(replace(st,1)), if length(st) > 0'
    },
    equation() {
      this.equResult = 'isEq(top(push(pop(st),1)),top(replace(st,1))),if isEq(isG(length(st),0),true)'
    },
    geneGraph() {
      this.teg = true
    }
  }
}
</script>

<style>
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .el-select {
    display: block;
  }
  .imgcontent {
    /*width: 800px;*/
    height: 300px;
  }

  .mb_20 {
    margin-bottom: 20px;
  }

  .mb_0 {
    margin-bottom: 0px !important;
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

  .image {
    width: 320px;
    height: 430px;
    margin-left: 80px;
  }
  .mt_20 {
    margin-top: 20px;
  }
  .mt_30 {
    margin-top: 30px;
  }
  .mt_60 {
    margin-top: 80px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
