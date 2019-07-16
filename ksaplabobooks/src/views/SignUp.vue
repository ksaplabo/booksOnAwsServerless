<template>
  <div class="singup container">
    <div class="card card-register mx-auto mt-5">
      <div class="card-header text-left">Register an Account</div>
      <div class="card-body text-left">
        <form @submit.stop.prevent="signUp" method="post">
          <div class="form-group">
            <div class="form-label-group">
              <input type="text" id="yourName" class="form-control" placeholder="your name" required="required" autofocus="autofocus" v-model="yourname">
              <label for="yourName">Your name</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="required"  v-model="username">
              <label for="inputEmail">Email address</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="required" v-model="password">
              <label for="inputPassword">Password</label>
            </div>
          </div>
          <input type="submit" class="btn btn-primary btn-block" value="Register">
        </form>
        <div class="text-center">
          <router-link class="d-block small mt-3" :to="{ name: 'signin'}">Login Page</router-link>
          <router-link class="d-block small"  :to="{ name: 'signupconfirm'}">Account Verify</router-link>
        </div>
      </div>
    </div>

    <loading v-if="isLoading === true"/>

  </div>
</template>

<script>
import * as UserUtil from '@/utils/UserUtil';
import Loading from '../components/Loading.vue';

export default {
  name: 'SignUp',
  props: ['flashMsg', 'flashErrMsg'],
  components: { Loading },
  data() {
    return {
      username: '',
      yourname: '',
      password: '',
      errMsg: this.flashErrMsg,
      msg: this.flashMsg,
      isLoading: false
    };
  },
  methods: {
    async signUp() {
      try {
        this.isLoading = true;
        await UserUtil.signUp(this.username, this.password, this.yourname);

        this.isLoading = false;
        this.$router.push({ name: 'signupconfirm', params: {flashMsg: '確認メールの認証コードを入力してください。',sendemail: this.username }});
      } catch(e) {
        this.isLoading = false;
        this.errMsg = e.message;

      }
    },
  },
};
</script>
