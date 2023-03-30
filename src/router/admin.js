// 引入要注册路由的组件
// 在模块化里以对象的形式将我们注册的路由抛出
export default [
    {
        path: "/admin",
        name: "admin",
        component: () => import('../views/admin/Index.vue'),
        children: [
            {
                path: "/admin/sysManage/user",
                name: "adminSysManageUser",
                component: () => import('../views/admin/sysManage/Users.vue')
            },
            {
                path: "/admin/sysManage/entryManage",
                name: "adminSysManageEntry",
                component: () => import('../views/admin/sysManage/Entries.vue')
            },
            {
                path: "/admin/article/list",
                name: "adminArticleList",
                component: () => import('../views/admin/articleManage/Articles.vue')
            },
            {
                path: "/admin/article/add",
                name: "adminArticleAdd",
                component: () => import('../views/admin/articleManage/ArticleAdd.vue')
            }
        ]
    }
]