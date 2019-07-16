import Vue from 'vue';

// import JQuery(for Bootstrap etc)
import jQuery from 'jquery';
global.jquery = jQuery;
global.$ = jQuery;
window.$ = window.jQuery = require('jquery');

import 'jquery.easing';

// import Bootstrap(for design)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// import fortawesome(for https://startbootstrap.com/ template this is licenced by MIT)
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'datatables.net-bs4/css/dataTables.bootstrap4.css';
import '../public/css/sb-admin.min.css';

// import Loading Image Style
import '../public/css/common.css';

import App from './App.vue';
import router from './router';

Vue.config.silent = false;
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
