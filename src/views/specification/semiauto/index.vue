<template>
  <div>
    <el-row style="margin-top: 80px">
      <el-col :span="10" :offset="2">
        <el-tabs type="border-card">
          <el-tab-pane label="Feature">
            <el-row class="vcenter mtop">
              <el-col :span="7" :offset="1">
                <div>Sort:</div>
              </el-col>
              <el-col :span="15">
                <el-input v-model="sortname" placeholder="sortname"/>
              </el-col>
            </el-row>
            <el-row class="vcenter mtop">
              <el-col :span="7" :offset="1">
                <div>is observed by:</div>
              </el-col>
              <el-col :span="15">
                <input-tag v-model="observed" placeholder="Enter to separate"/>
              </el-col>
            </el-row>

            <el-row class="vcenter mtop">
              <el-col :span="7" :offset="1">
                <div>extends:</div>
              </el-col>
              <el-col :span="15">
                <input-tag v-model="extends1" placeholder="Enter to separate"/>
              </el-col>
            </el-row>

            <el-row class="vcenter mtop">
              <el-col :span="7" :offset="1">
                <div>uses:</div>
              </el-col>
              <el-col :span="15">
                <input-tag v-model="uses" placeholder="Enter to separate"/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Signature">
            <el-row class="vcenter mtop">
              <el-col :span="3" :offset="1">
                <div>Const:</div>
              </el-col>
              <el-col :span="19">
                <input-tag v-model="Const"/>
              </el-col>
            </el-row>

            <el-row class="vcenter mtop">
              <el-col :span="3" :offset="1">
                <div>Attr:</div>
              </el-col>
              <el-col :span="4" >
                <el-input v-model="AttrName" placeholder="AttrName"/>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-input v-model="AttrType" placeholder="AttrType"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="primary" icon="el-icon-plus" circle @click="addAttr"/>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-select
                  v-model="AttrSelect"
                  placeholder="Attr"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="danger" icon="el-icon-delete" circle @click="addAttr"/>
              </el-col>
            </el-row>

            <el-row class="vcenter mtop">
              <el-col :span="3" :offset="1">
                <div>Retr:</div>
              </el-col>
              <el-col :span="4">
                <el-input v-model="RetrName" placeholder="RetrName"/>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-input v-model="Retrdomain" placeholder="domain"/>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-input v-model="Retrcodomain" placeholder="codomain"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="primary" icon="el-icon-plus" circle />
              </el-col>
            </el-row>
            <el-row class="vcenter mtop">
              <el-col :span="18" :offset="4">
                <el-select
                  v-model="AttrSelect"
                  placeholder="Retr"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="danger" icon="el-icon-delete" circle/>
              </el-col>
            </el-row>

            <el-row class="vcenter mtop">
              <el-col :span="3" :offset="1">
                <div>Tran:</div>
              </el-col>
              <el-col :span="4">
                <el-input v-model="TranName" placeholder="TranName"/>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-input v-model="Trandomain" placeholder="domain"/>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-input v-model="Trancodomain" placeholder="codomain"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="primary" icon="el-icon-plus" circle />
              </el-col>
            </el-row>
            <el-row class="vcenter mtop">
              <el-col :span="18" :offset="4">
                <el-select
                  v-model="TranSelect"
                  placeholder="Tran"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="danger" icon="el-icon-delete" circle/>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Axiom">
            <el-row class="vcenter mtop">
              <el-col :span="5" :offset="1">
                <div>GlobleVariable:</div>
              </el-col>
              <el-col :span="4" >
                <el-input v-model="AttrName" placeholder="AttrName"/>
              </el-col>
              <el-col :span="4" :offset="1">
                <el-input v-model="AttrType" placeholder="AttrType"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="primary" icon="el-icon-plus" circle/>
              </el-col>
              <el-col :span="5" :offset="1">
                <el-select
                  v-model="AttrSelect"
                  placeholder="Attr"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="danger" icon="el-icon-delete" circle/>
              </el-col>
            </el-row>
            <el-row class="vcenter mtop">
              <el-col :span="5" :offset="1">
                <div>Equation:</div>
              </el-col>
              <el-col :span="15" :offset="1">
                <el-input v-model="Equation" placeholder="Equation"/>
              </el-col>
              <el-col :span="1">
                <el-button size="small" type="danger" icon="el-icon-delete" circle/>
              </el-col>
            </el-row>
            <el-row class="vcenter mtop">
              <el-col :span="1" :offset="20">
                <el-button type="primary">提交</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="10" :offset="1">
        <el-collapse v-model="activeNames">
          <el-collapse-item v-for="item in SortList" :key="item.name" :title="item.name" >
            <el-input v-model="item.spec" type="textarea" rows="10" disabled/>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InputTag from 'vue-input-tag'
export default {
  name: 'Semiauto',
  components: {
    InputTag
  },
  data() {
    return {
      sortname: '',
      observed: [],
      extends1: [],
      uses: [],
      Const: [],
      AttrName: '',
      AttrType: '',
      Attr: [],
      AttrSelect: '',
      RetrName: '',
      Retrdomain: '',
      Retrcodomain: '',
      TranSelect: '',
      TranName: '',
      Trandomain: '',
      Trancodomain: '',
      activeNames: ['1'],
      SortList: [
        {
          name: 'Patient',
          spec: 'Spec Patient;\n' +
          '\tuses Integer,String,Date;\n' +
          '\tAttr\n' +
          '\t\tuser_id:Integer;\t//账号ID\n' +
          '\t\tid:Integer;\t\t\t//患者资料ID\n' +
          '\t\tname:String;\t\n' +
          '\t\tsex:String;\n' +
          '\t\tbirth:String;\n' +
          '\t\tphone:String;\n' +
          '\t\tcreateTime:Date;\n' +
          '\t\taddress:String;\n' +
          'End'
        },
        {
          name: 'Doctor',
          spec: 'Spec Doctor;\n' +
          '\tuses Integer,String,Date;\n' +
          '\tAttr\n' +
          '\t\tuser_id:Integer;  \t//账号ID\n' +
          '\t\tid:Integer;  \t\t//doctor ID\n' +
          '\t\tname:String;\n' +
          '\t\tdep_id:Integer;     //所属科室\n' +
          '\t\ttype_id:Integer;    //医生类型\n' +
          '\t\tintro:String;\n' +
          '\t\tphoto:String;\t\t//医生照片URL\n' +
          '\t\tupdateTime:Date;    //最新更新时间\n' +
          '\t\tliveLink:String;    //直播间地址\n' +
          'End'
        },
        {
          name: 'Department',
          spec: 'Spec Department;\n' +
          '\tuses Integer,String;\n' +
          '\tAttr\n' +
          '\t\tid:Integer;\n' +
          '\t\tname:String;\n' +
          '\t\tdes:String;\n' +
          'End'
        },
        {
          name: 'Account',
          spec: 'Spec Account;\n' +
          '\tuses String,DateTime,Integer,Patient,Doctor,UserType,;\n' +
          '\tAttr\t\t\n' +
          '\t\ttoken:String;\n' +
          '\t\ttokenCTime:DateTime;  //token创建时间\n' +
          '\t\ttokenVTime:Integer;   //token有效时间\n' +
          '\t\tid:Integer;\t\t\t  //username ID\n' +
          '\t\tnickname:String;\n' +
          '\t\tpassword:String;\n' +
          '\t\ttype_id:String;\t \t  //账号级别（能容纳的病人数）\n' +
          '\t\tavatar:String;        //头像图片地址\n' +
          '\t\tphone:String;\n' +
          '\t\tcreateTime:DateTime;\t\t\t\n' +
          'End'
        },
        {
          name: 'AccountType',
          spec: 'Spec AccountType;\n' +
          '\tuses Integer,String;\n' +
          '\tAttr\n' +
          '\t    id:Integer;\n' +
          '\t\tname:String;\n' +
          '\t\tmaxCount:Integer;    //一个账号能容纳的病人数\n' +
          'End'
        },
        {
          name: 'Case',
          spec: 'Spec Case;\t\n' +
          '\tuses Integer,String,Date;\n' +
          '\tAttr\n' +
          '\t\tid:Integer;\t\n' +
          '\t\tprofile_id:Integer;\t\t//患者id\t\n' +
          '\t\thosipital:String;\n' +
          '\t\tdes:String;\n' +
          '\t\tvisitTime:Date;\n' +
          'End'
        }
      ]
    }
  },
  methods: {
    addAttr() {
      //
    }
  }
}
</script>

<style scoped>
  .mtop{
    margin-top: 30px;
  }
  .vcenter{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .maowidth{
    width:10px;
  }
</style>
