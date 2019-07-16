<template>
  <div class="menu">
    <NaviMenu/>

    <div id="wrapper">
      <SideBar/>

      <div id="content-wrapper" class="menu bg-light">
          <div class="container-fluid">

            <!-- Breadcrumbs-->
            <ol class="breadcrumb">
              <li class="breadcrumb-item active">Serverless Testing Site</li>
            </ol>

            <p class="text-primary" v-show="msg">{{ msg }}</p>
            <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

            <div class="row">

              <div class="col-lg-6 mb-4">

                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'rentalbook'}">Book Rental
                    </router-link> 
                  </div>
                  <div class="card-body">
                    <p>書籍の貸出・返却を登録します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>

              </div>

<!-- takada -->
              <div class="col-lg-6 mb-4">

                <!-- Approach -->
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <router-link tag="a" :to="{ name: 'maintebook'}">Book Maintenance
                    </router-link> 
                  </div>
                  <div class="card-body">
                    <p>書籍を登録します。</p>
                    <p class="mb-0"></p>
                  </div>
                </div>

              </div>
<!-- takada -->

            </div>

          </div>

          <Footer/>
      </div>
    </div>

  </div>
</template>


<script>
import * as UserUtil from '@/utils/UserUtil';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import '../utils/sb-admin';

export default {
  name: 'Menu',
  props: ['flashMsg'],
  components: { NaviMenu, SideBar, Footer },
  data() {
    return {
      msg: this.flashMsg,
      errMsg: ''
    };
  },
  async mounted() {
    try {

      UserUtil.currentSession().then(() => {
        console.log('ok');
        
      }).catch(() => {
        this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});

      });
    } catch(e) {
      this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
    }
  },
};
</script>
