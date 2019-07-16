import Vue from 'vue';
import Router from 'vue-router';

import SignIn from './views/SignIn.vue';
import SignUp from './views/SignUp.vue';
import SignUpConfirm from './views/SignUpConfirm.vue';
import SignOut from './views/SignOut.vue';
import Sorry from './views/Sorry.vue';
import Menu from './views/Menu.vue';
import RentalBook from './views/RentalBook.vue';
import MainteBook from './views/MainteBook.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/pages/signin.html',
      name: 'signin',
      props: true,
      component: SignIn,
    },
    {
      path: '/pages/signup.html',
      name: 'signup',
      props: true,
      component: SignUp,
    },
    {
      path: '/pages/signupconfirm.html',
      name: 'signupconfirm',
      props: true,
      component: SignUpConfirm,
    },
    {
      path: '/pages/signout.html',
      name: 'signout',
      component: SignOut,
    },
    {
      path: '/pages/menu.html',
      name: 'menu',
      component: Menu,
    },
    {
      path: '/pages/rentalbook.html',
      name: 'rentalbook',
      component: RentalBook,
    },
    {
      path: '/pages/maintebook.html',
      name: 'maintebook',
      component: MainteBook,
    },
    {
      path: '*',
      name: 'sorry',
      component: Sorry,
    }
  ],
});
