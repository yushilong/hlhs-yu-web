<template>
  <div class="title">{{ article.title }}</div>
  <div class="author">{{ article.author }}</div>
  <el-divider border-style="dashed"/>
  <quill-editor v-model:content="article.content" content-type="html" read-only theme="bubble"/>
</template>
<script setup>
import {onMounted, ref} from "vue";
import {articleDetail} from "@/http/api";
import {useRoute} from "vue-router";

const article = ref({
  title: '',
  content: '',
  author: ''
})
const route = useRoute()

onMounted(() => {
  articleDetail({
    params: {
      id: route.query.id
    }
  }).then((res) => {
    article.value = res
  })
})
</script>