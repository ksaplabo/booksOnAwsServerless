<template>
  <div class="singupconfirm container">
    <div class="card card-login mx-auto mt-5">
      <div class="card-header text-left">Account Verify</div>
      <div class="card-body text-left">
        <form @submit.stop.prevent="signUpConfirm" method="post">
          <div class="form-group">
            <div class="form-label-group">
              <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="required" autofocus="autofocus" v-model="email">
              <label for="inputEmail">Email address</label>
            </div>
          </div>
          <div class="form-group">
            <div class="form-label-group">
              <input type="text" id="inputVerifyKey" class="form-control" placeholder="Verify Key" required="required" v-model="verifyKey" >
              <label for="inputVerifyKey">Verify Key</label>
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
          <input type="submit"  class="btn btn-primary btn-block" value="Verify">
        </form>
        <div class="text-center">
          <router-link class="d-block small mt-3" :to="{ name: 'signin'}">Sign in now!!</router-link>
          <router-link class="d-block small" :to="{ name: 'signup'}">Register an Account</router-link>
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
  name: 'SignUpConfirm',
  props: ['flashMsg', 'flashErrMsg', 'sendemail'],
  components: { Loading },
  data() {
    return {
      email: this.sendemail,
      verifyKey: '',
      errMsg: this.flashErrMsg,
      msg: this.flashMsg,
      isLoading: false
    };
  },
  methods: {
    async signUpConfirm() {
      try {
        this.isLoading = true;
        await UserUtil.signUpConfirm(this.email, this.verifyKey);
        
        this.isLoading = false;
        this.$router.push({ name: 'signin', params: { flashMsg: '正常登録されました。サインインしてください。', sendemail: this.email }});
      } catch(e) {
        this.isLoading = false;
        this.errMsg = e.message;
      }
    },
  },
};
</script>
