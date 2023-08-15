import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/HomePage/index.vue'
import Summary from "../views/summary/index.vue"
import Plan from "../views/plan/index.vue"
import todo from "../views/todo/index"
import login from '../views/login/index.vue'
import register from "../views/register/index.vue"
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/summary',
    name: 'Summary',
    component: Summary
  },
  {
    path: '/plan',
    name: 'Plan',
    component: Plan
  },
  {
    path: '/todo',
    name: 'todo',
    component: todo
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }

]
const router = new VueRouter({
  mode: 'hash',
  base: '',
  routes
})
export default router
