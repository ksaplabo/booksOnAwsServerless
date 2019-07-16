<template>
  <div class="singout">
    <h1>Sign out</h1>
    <loading v-if="isLoading === true"/>
    <p>Please wait......</p>
  </div>
</template>

<script>
import * as UserUtil from '@/utils/UserUtil';
import Loading from '../components/Loading.vue';

export default {
  name: 'SignOut',
  props: ['flashMsg'],
  components: { Loading },
  data() {
    return {
      msg: this.flashMsg,
      isLoading: true
    };
  },
  async mounted() {
    try {
      this.isLoading = true;

      await UserUtil.signOut();

      this.isLoading = false;
      this.$router.push({ name: 'signin', params: {flashMsg: 'サインアウトしました' }});
    } catch(e) {
      this.isLoading = false;
      this.msg = e.message;
      this.$router.push({ name: 'signin', params: {flashErrMsg: 'サインアウト中にエラーが発生しました' }});
    }
  },
};
</script>
