<script setup>
import router from "../router";

function admin() {
  router.push('admin')
}
</script>

<template>
  <el-space>
    <el-button type="success" @click="admin">后台</el-button>
  </el-space>
</template>
