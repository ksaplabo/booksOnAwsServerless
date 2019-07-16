<template>
  <div class="singin container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-left">Login</div>
      <div class="card-body text-left">
        <form @submit.stop.prevent="signIn" method="post">
          <div class="form-group">
            <div class="form-label-group">
              <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="required" autofocus="autofocus" v-model="email">
              <label for="inputEmail">Email address</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <input type="password" id="inputPassword" class="form-control" placeholder="Password" required="required" v-model="password" >
              <label for="inputPassword">Password</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <div>
                <label>
                  <span class="text-primary" v-show="msg">{{ msg }}</span>
                  <span class="text-danger" v-show="errMsg">{{ errMsg }}</span>
                </label>
              </div>
            </div>
          </div>
          <input class="btn btn-primary btn-block" type="submit" value="Login">
        </form>
        <div class="text-center">
          <router-link class="d-block small mt-3" :to="{ name: 'signup'}">Register an Account</router-link>
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
  name: 'SignIn',
  props: ['flashMsg', 'flashErrMsg', 'sendemail'],
  components: { Loading },
  data() {
    return {
      email: this.sendemail,
      password: '',
      errMsg: this.flashErrMsg,
      msg: this.flashMsg,
      isLoading: false,
    };
  },
  methods: {
    async signIn() {
      try {
        this.msg = '';
        this.errMsg = '';

        this.isLoading = true;

        await UserUtil.signIn(this.email, this.password);
        
        UserUtil.currentSession().then(() => {
          this.isLoading = false;
          this.$router.push({ name: 'menu'});

        })
        .catch((e) => {
          this.isLoading = false;
          this.errMsg = 'ログインに失敗';         
        });

      } catch(e) {
        this.isLoading = false;
        this.errMsg = e.message;
      }
    },
  },
};
</script>
