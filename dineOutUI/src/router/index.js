import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login.vue'
import Register from '@/components/Register/Register.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
