<template>
    <div class="rentalbook">
        <NaviMenu/>

        <div id="wrapper">
            <SideBar/>

            <div id="content-wrapper" class="bg-light">
                <div class="container-fluid">

                    <!-- Breadcrumbs-->
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <router-link tag="a" :to="{ name: 'menu'}">Serverless Testing Site</router-link>
                        </li>
                        <li class="breadcrumb-item active">Book Rental</li>
                    </ol>

                    <p class="text-primary" v-show="msg">{{ msg }}</p>
                    <p class="text-danger" v-show="errMsg">{{ errMsg }}</p>

                    <form @submit.stop.prevent="rentalbook">
                        <div class="row">
                            <div class="col-lg-6 mb-4" v-for="(row, key, index) in items" :key="index">

                                <!-- Illustrations -->
                                <div class="card shadow mb-4">
                                    <div class="card-header py-3">
                                        <div class="m-0 font-weight-bold text-primary text-secondary">{{row.title}}</div>
                                    </div>
                                    <div class="card-body">
                                        
                                        <div class ="row">
                                            <div class="col-sm-2 mb-2 mr-1" style="min-width:8rem">
                                                <div class="row text-left ml-2 mb-3">
                                                    <img style="height:7rem; width: 7rem;" v-if="row.imgUrl === undefinded || row.imgUrl === null || row.imgUrl === ''"
                                                         src="../../public/image/no-image.png">
                                                    <a href="#" onclick="return false;" v-if="row.imgUrl !== undefinded && row.imgUrl !== null && row.imgUrl !== ''">
                                                        <img style="height:10rem;" 
                                                            v-bind:src="row.imgUrl" alt="" v-on:click="clickedRow = {title: row.title, imgUrl: row.imgUrl, description: row.description};" data-toggle="modal" data-target="#imagemodal">
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="col-sm-8 ml-2 mb-2 text-left" v-if="isLoading === false">
                                                <div class="row ml-2 mb-2" v-if="isLoading === false">
                                                    <a href="#" class="font-weight-bold text-info" v-on:click="rental(row.title)" 
                                                        v-if="row.rentalStatus === undefined ||  row.rentalStatus === null ||row.rentalStatus !== '貸出中'">
                                                        <i class="fas fa-fw fa-file-export"></i>
                                                        <span>借りる</span>
                                                    </a>
                                                    <a href="#" class="font-weight-bold text-primary" v-on:click="returnBook(row.title)" 
                                                        v-if="row.rentalStatus === '貸出中' && row.rentalUser === yourname">
                                                        <i class="fas fa-fw fa-file-import"></i>
                                                        <span>返却</span>
                                                    </a>
                                                    <span class="font-weight-bold text-warning"
                                                        v-if="row.rentalStatus === '貸出中' && row.rentalUser !== yourname">
                                                        {{row.rentalUser}} さんに貸出中です。
                                                    </span>
                                                </div>

                                                <div class="row ml-2 mb-2 text-left text-info" v-if="row.rentalStatus === '貸出中'">
                                    
                                                    <div class="table-responsive">
                                                        <table class="table table-sm table-striped table-height-sm table-condensed" style="font-size:10pt">
                                                            <tbody>
                                                                <tr>
                                                                    <td>貸出状況</td>
                                                                    <td>{{row.rentalStatus}}&nbsp;</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>貸出日</td>
                                                                    <td>{{row.rentalDate}}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>貸出者</td>
                                                                    <td>{{row.rentalUser}}</td>
                                                                </tr>
                                                             </tbody>
                                                        </table>
                                                    </div>

                                                </div>
                                     
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>

                </div>

                <Footer/>

            </div>

            <!-- モーダルの設定です -->
            <div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title m-0 font-weight-bold text-primary text-secondary" id="myModalLabel" v-show="clickedRow">{{clickedRow.title}}</div>
                        </div>
                        <div class="modal-body">
                            <img v-bind:src="clickedRow.imgUrl" id="imagepreview" class="img-responsive" >
                            <div class="mt-4 mb-2">概要</div>
                            <div class="multiline-text" v-show="clickedRow">{{clickedRow.description}}</div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" v-on:click="clickedRow.imgUrl = ''; clickedRow.description = '';">Close</button>
                        </div>
                    </div>
                </div>
            </div><!-- /modal -->

        </div>

        <!-- Scroll to Top Button-->
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

        <loading v-if="isLoading === true"/>

    </div>
</template>

<script>
import Vue from 'vue';
import * as UserUtil from '@/utils/UserUtil';
import * as AjaxUtil from '@/utils/AjaxUtil';
// 共通
import NaviMenu from '../components/NaviMenu.vue';
import '../utils/sb-admin';
import SideBar from '../components/SideBar.vue';
import Footer from '../components/Footer.vue';
import Loading from '../components/Loading.vue';

export default {
    name: 'RentalBook',
    props: ['flashMsg', 'flashErrMsg'],    
    components: { NaviMenu, SideBar, Footer, Loading },
    data() {
        return {
            msg: '',
            errMsg: '',
            items: [], 
            yourname: '',
            clickedRow: {},
            isLoading: true
        };
    },
    async mounted() {
        const self = this;
        try {
            UserUtil.currentUserInfo().then((info) => {
                this.msg = '';

                self.yourname = info.attributes['custom:yourname'];

                // 画面更新
                this.updateView();
               
            })
            .catch(() => {
               this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            });
            
        } catch(e) {
            self.errMsg = e.message;
        }
    },

    methods: {
        rental: function(updateTitle) {
            UserUtil.currentUserInfo().then((info) => {
                
                this.isLoading = true;

                AjaxUtil.rentalBooks(updateTitle, this.yourname)
                .then((response) => {
                    this.updateView();
                
                }).catch((error) => {
                    this.msg = '';
                    this.errMsg = '貸出処理に失敗しました';
                    console.log(error);
                    this.isLoading = false;
                
                });

            }).catch(() => {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            });
                
        } ,
        returnBook: function(updateTitle) {

            this.isLoading = true;

            UserUtil.currentUserInfo().then((info) => {
                AjaxUtil.returnBooks(updateTitle)
                .then((response) => {
                    this.updateView();

                }).catch((error) => {
                    this.msg = '';
                    this.errMsg = '返却処理に失敗しました';
                    console.log(error);
                    this.isLoading = false;

                });
            
            }).catch(() => {
                this.$router.push({ name: 'signin', params: {flashMsg: 'サインインしてください' }});
            });
                
        } ,
        updateView: function() {
            // 画面更新
            const self = this;

            this.isLoading = true;

            AjaxUtil.getAllSapBooks()
            .then((response) => {
                self.items = response.data.Items;

            }).catch((error) => {
                this.msg = '';
                this.errMsg = '検索に失敗しました';
                console.log(error);

            }).then(() => {
                this.isLoading = false;
            })
        }
    }
}

</script>
