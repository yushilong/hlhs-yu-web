<template>
  <div>添加文章</div>
  <ElInput v-model="title" placeholder="请输入文章标题，30个字以内" maxlength="30" show-word-limit clearable
           style="margin: 10px 0"/>
  <QuillEditor ref="editor" v-model:content="content" content-type="html" theme="snow" toolbar="full"
               :options="contentProps" style="height: 50vh"/>
  <VxeToolbar style="float: right">
    <template #buttons>
      <VxeButton status="primary" content="提交" @click="submit"/>
    </template>
  </VxeToolbar>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {ElMessage} from "element-plus";
import {trim} from "xe-utils";
import {articleAdd} from "@/http/api";

const title = ref('')
const content = ref('')
const contentProps = {
  placeholder: '请输入文章内容',
  contentType: 'html'
}
const editor = ref()

onMounted(() => {
})

function submit() {
  if (!title.value)
    ElMessage.error('标题不能为空')
  else if (!trim(editor.value.getText()))
    ElMessage.error('内容不能为空')
  else {
    for (let i = 0; i < 100; i++) {
      articleAdd(
          {
            title: title.value+`${i+1}`,
            content: content.value,
            author: 'admin'
          }
      ).then((res) => {
        // ElMessageBox.alert('添加成功')
        ElMessage.success('添加成功'+i)
      })
    }
  }
}
</script>