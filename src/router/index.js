import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: () => import('@/views/login/index'),
    redirect: '/login',
    name: '登录'
    // children: [{
    //   path: 'login',
    //   component: () => import('@/views/login/index')
    // }]
  },
  // { path: '/home',component: Layout, component: () => import('@/views/home/index'), hidden: true },
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    name: '首页',
    // hidden: true,
    children: [{
      path: 'home',
      name: '个人主页',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'table' }
    }]
  },
  {
    path: '/spec',
    component: Layout,
    redirect: '/spec/create',
    name: '规约生成',
    meta: { title: '规约生成', icon: 'example' },
    children: [
      {
        path: 'manual',
        name: '手动生成',
        component: () => import('@/views/specification/manual/index'),
        meta: { title: '手动生成', icon: 'table' }
      },
      {
        path: 'semiauto',
        name: '半自动化生成',
        component: () => import('@/views/specification/semiauto/index'),
        meta: { title: '半自动化生成', icon: 'tree' }
      }
      // {
      //   path: 'auto',
      //   name: '全自动化生成',
      //   component: () => import('@/views/specification/auto/index'),
      //   meta: { title: '全自动化生成', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/parse',
    component: Layout,
    children: [
      {
        path: '',
        name: '规约解析',
        component: () => import('@/views/parse/index'),
        meta: { title: '规约解析', icon: 'form' }
      }
    ]
  },
  {
    path: '/cases',
    component: Layout,
    children: [
      {
        path: '',
        name: '测试数据生成',
        component: () => import('@/views/cases/index'),
        meta: { title: '测试数据生成', icon: 'form' }
      }
    ]
  },
  {
    path: '/monic',
    component: Layout,
    redirect: '',
    name: '单线序列生成',
    meta: { title: '单线序列生成', icon: 'example' },
    children: [
      {
        path: 'construction',
        name: 'TEG-I构造器',
        component: () => import('@/views/mongline/construction/index'),
        meta: { title: 'TEG-I构造器', icon: 'table' }
      },
      {
        path: 'transform',
        name: 'TEG-I转换器',
        component: () => import('@/views/mongline/transform/index'),
        meta: { title: 'TEG-I转换器', icon: 'form' }
      },
      {
        path: 'generate',
        name: '单线序列生成器',
        component: () => import('@/views/mongline/generate/index'),
        meta: { title: '单线序列生成器', icon: 'tree' }
      }
    ]
  },
  {
    path: '/run',
    component: Layout,
    name: '测试驱动执行',
    meta: { title: '测试驱动执行', icon: 'example' },
    children: [
      {
        path: '',
        name: '映射',
        component: () => import('@/views/run/map/index'),
        meta: { title: '映射', icon: 'form' }
      },
      {
        path: '',
        name: '测试驱动执行',
        component: () => import('@/views/run/index'),
        meta: { title: '测试驱动执行', icon: 'form' }
      }
    ]
  },
  {
    path: '/evaluate',
    component: Layout,
    children: [
      {
        path: '',
        name: '测试结果评估',
        component: () => import('@/views/evaluate/index'),
        meta: { title: '测试结果评估', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  base: '/dist/',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
