import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'layout',
      component (reslove) {
        require(['./../components/layout.vue'], reslove);
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component (reslove) {
            require(['./../components/home/home.vue'], reslove);
          }
        }
      ]
    }
  ]
})
