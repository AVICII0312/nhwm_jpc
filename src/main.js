import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'
import Vant from 'vant';
import 'vant/lib/index.css';
import './utils/utils'
import instance from './services/request'

Vue.config.productionTip = false
Vue.prototype.$axios = instance;
Vue.prototype.$cookie = Cookies
Vue.use(Vant);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 代码
const pointDoms = []; // 使用这个指令的所有DOM对象
Vue.directive('points', {
  inserted(el, binding) {
    pointDoms.push(el); // 存储使用这个指令的DOM
    el.addEventListener('click', () => {
      // 禁用所有使用这个指令的DOM结构点击事件
      pointDoms.forEach(pointItem => {
        pointItem.style.pointerEvents = 'none';
      });
      setTimeout(() => {
        // 启动所有使用这个指令的DOM结构点击事件
        pointDoms.forEach(pointItem => {
          pointItem.style.pointerEvents = 'auto';
        });
      }, binding.value || 350);
    });
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})