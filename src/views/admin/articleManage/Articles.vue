<template>
  <vxe-toolbar>
    <template #buttons>
      <vxe-button @click="dialogFormVisible = true;isAdd = true;formData = {
      id: -1,
      name: '',
      route: '',
      logo:''
    }">新增
      </vxe-button>
      <vxe-button @click="edit">编辑</vxe-button>
      <vxe-button @click="del">删除</vxe-button>
    </template>
  </vxe-toolbar>
  <vxe-table
      ref="table"
      border
      stripe
      :checkbox-config="{highlight:true}">
    <vxe-column type="checkbox"></vxe-column>
    <vxe-column type="seq" title="序号"/>
    <vxe-column field="title" title="标题">
      <template #default="{row}">
        <ElLink :href="'/admin/article/detail?id='+row.id" type="primary">{{ row.title }}</ElLink>
      </template>
    </vxe-column>
    <vxe-column field="author" title="作者"/>
    <vxe-column field="createTime" title="创建时间"/>
  </vxe-table>
  <vxe-pager
      background
      v-model:current-page="pager.current"
      v-model:page-size="pager.size"
      @page-change="pageChange"
      :total="pager.total"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
  </vxe-pager>
  <el-dialog v-model="dialogFormVisible" title="新增入口">
    <el-form :model="formData"
             ref="formInstance"
             :rules="formRules"
             status-icon>
      <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="formData.name" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="路由" :label-width="formLabelWidth" prop="route">
        <el-input v-model="formData.route" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="图标" :label-width="formLabelWidth" prop="logo">
        <el-input v-model="formData.logo" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="submitForm">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import XEUtils from "xe-utils";
import {articleAdd, articleDelete, articlePage, articleUpdate} from "@/http/api";

let dialogFormVisible = ref(false)
let formData = ref(
    {
      id: -1,
      name: '',
      route: '',
      logo: ''
    }
)
const formLabelWidth = '140px'
const formInstance = ref()
const formRules = ref({
  name: [
    {required: true, message: '姓名不能为空', trigger: 'blur'},
    {min: 2, max: 15, message: '姓名长度2到15', trigger: 'blur'},
  ],
  route: [
    {required: true, message: '路由不能为空', trigger: 'blur'},
    {min: 2, max: 25, message: '路由长度2到25', trigger: 'blur'},
  ]
})
let isAdd = ref(true)
const table = ref()
const pager = ref({
  current: 0,
  size: 10,
  total: 0,
})

onMounted(() => {
  queryAll()
})

function queryAll() {
  articlePage({
    params: pager.value
  }).then((res) => {
    table.value.reloadData(res.rows)
    pager.value.total = res.total
  })
}

async function submitForm() {
  if (!formInstance) {
    return
  }
  await formInstance.value.validate((valid, fields) => {
    if (valid) {
      isAdd.value ? articleAdd(formData.value).then(res => {
        ElMessage.success('操作成功')
        dialogFormVisible.value = false
        queryAll()
      }) : articleUpdate(formData.value).then(res => {
        ElMessage.success('操作成功')
        dialogFormVisible.value = false
        queryAll()
      })
    }
  })
}

function edit() {
  const temp = table.value.getCheckboxRecords(true)
  if (temp.length === 0 || temp.length > 1)
    ElMessage.error('请选择一条数据')
  else {
    isAdd.value = false
    formData.value = XEUtils.clone(temp[0])
    dialogFormVisible.value = true
  }
}

function del() {
  const temp = table.value.getCheckboxRecords(true)
  if (temp.length === 0)
    ElMessage.error('请至少选择一条数据')
  else {
    ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      articleDelete(temp).then((res) => {
        ElMessage.success('删除成功')
        queryAll()
      })
    })
  }
}

function pageChange(e) {
  pager.value.current = e.currentPage - 1
  queryAll()
}
</script>