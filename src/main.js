import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app')
