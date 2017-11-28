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
        },
        {
          path: 'explain',
          name: 'explain',
          component (reslove) {
            require(['./../components/explain/explain.vue'], reslove);
          }
        },
        {
          path: 'map',
          name: 'map',
          component (reslove) {
            require(['./../components/map/map.vue'], reslove);
          }
        },
        {
          path: 'capsule',
          name: 'capsule',
          component (reslove) {
            require(['./../components/capsule/capsule.vue'], reslove);
          }
        },
        {
          path: 'question',
          name: 'question',
          component (reslove) {
            require(['./../components/question/question.vue'], reslove);
          }
        }
      ]
    }
  ]
})
