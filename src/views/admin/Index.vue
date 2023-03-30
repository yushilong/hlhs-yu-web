<template>
  <el-container>
    <el-header class="header" @click="router.push('/')">头部</el-header>
    <el-container>
      <el-aside style="height: 95vh;background-color: #545c64">
        <el-menu default-active="1" background-color="transparent" text-color="#ffffff"
                 active-text-color="#ffd04b" router>
          <el-menu-item index="1">一级菜单1</el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Files/>
              </el-icon>
              <span>文章管理</span></template>
            <el-menu-item index="/admin/article/list">
              <el-icon>
                <Document/>
              </el-icon>
              文章列表
            </el-menu-item>
            <el-menu-item index="/admin/article/add">
              <el-icon>
                <Edit/>
              </el-icon>
              新增文章
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Setting/>
              </el-icon>
              <span>系统管理</span></template>
            <el-menu-item index="/admin/sysManage/user">
              <el-icon>
                <user/>
              </el-icon>
              用户管理
            </el-menu-item>
            <el-menu-item index="/admin/sysManage/entryManage">
              <el-icon>
                <Aim/>
              </el-icon>
              入口管理
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <RouterView/>
        </el-main>
        <el-footer class="footer">©2023</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.header {
  height: 5vh;
  color: whitesmoke;
  font-weight: bold;
  font-size: 18px;
  background-color: #282828;
  line-height: 46px;
}

.footer {
  height: 2vh;
  color: whitesmoke;
  font-weight: bold;
  font-size: 10px;
  background-color: #282828;
  text-align: center;
}

el-container el-icon {
  color: whitesmoke;
}
</style>
<script setup>
import {Aim, Document, Edit, EditPen, Files, Setting, User} from "@element-plus/icons-vue";
import router from "@/router";</script>