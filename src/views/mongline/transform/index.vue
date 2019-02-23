<template>
  <div class="mt_60">
    <el-row>
      <el-col :span="10" :offset="2">
        <el-card class="box-card">
          <el-row class="mt_30">
            <el-col :span="4" :offset="2">
              <p>测试用例</p>
            </el-col>
            <el-col :span="16">
              <el-select v-model="caseSelect" placeholder="请选择">
                <el-option
                  v-for="item in cases"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="mt_30 vcenter">
            <el-col :span="4" :offset="2">
              <el-button size="small" type="info" @click="judge">单线判断</el-button>
            </el-col>
            <el-col :span="16">
              <el-input v-model="mongline" disabled/>
            </el-col>
          </el-row>
          <el-row class="mt_30 vcenter">
            <el-col :span="4" :offset="2">
              <p>改写系统</p>
            </el-col>
            <el-col :span="16" >
              <el-select v-model="sysSelect" placeholder="请选择">
                <el-option
                  v-for="item in sys"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
          <el-row class="mt_30">
            <el-col :span="4" :offset="18">
              <el-button type="primary" @click="tran">单线转换</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-card class="border">
          <div slot="header" class="clearfix">
            <span>单线TEG-I</span>
          </div>
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
      caseSelect: '',
      mongline: '',
      cases: [{
        value: '1',
        label: ' length(dequeue(dequeue(enqueue(q,1))))=length(dequeue(q))'
      },
      {
        value: '2',
        label: ' length(pop(pop(push(s,7)))) = length(pop(s)), if length(s) > 0'
      }
      ],
      sysSelect: '',
      sys: [{
        value: '1',
        label: 'QueueTGR'
      },
      {
        value: '2',
        label: 'StackTGR'
      }
      ]
    }
  },
  methods: {
    judge() {
      this.mongline = '否'
    },
    tran() {
      this.teg = true
    }
  }
}
</script>

<style scoped>

</style>
