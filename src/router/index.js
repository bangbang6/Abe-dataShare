import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/',

    redirect: '/login',

    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),

    hidden: true
  },
  

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  

  {
    path: '/info',
    component: Layout,
    redirect: '/info/user',
    name: 'info',
    meta: { title: '基本信息', icon: 'dashboard' },

    children: [
      {
        path: '/info/user',
        name: 'user',
        component: () => import('@/views/user/User.vue'),
        meta: { title: '用户信息', icon: 'table' }
      },
      {
        path: '/info/file',
        name: 'file',
        component: () => import('@/views/file/index.vue'),
        meta: { title: '文件信息', icon: 'tree' }
      },
      {
        path: '/info/backforward',
        component: () => import('@/components/myfile/Backforward.vue'),

        hidden: true
      },
    ]
  },

  {
    path: '/role',
    component: Layout,
    redirect: '/role/requset',
    name: 'role',
    meta: { title: '属性相关', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/role/requset',
        name: 'request',
        component: () => import('@/views/role/index.vue'),
        meta: { title: '属性申请', icon: 'link' }
      },
      {
        path: '/role/approve',
        name: 'approve',
        component: () => import('@/views/role/Approve.vue'),
        meta: { title: '属性审批', icon: 'form' }
      }
    ]
  },

  {
    path: 'upload',
    component: Layout,
    redirect: '/upload/file',
    children: [
      {
        path: '/upload/file',
        name: 'uploadfile',
        component: () => import('@/views/upload/index.vue'),
        meta: { title: '上传文件', icon: 'el-icon-upload' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
