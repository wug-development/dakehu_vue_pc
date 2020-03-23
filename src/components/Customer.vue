<template>
    <div class="customer-box">
        <Header></Header>
        <div class="banner-customer-box">
            <div class="cus-banner-title">合作伙伴</div>
            <div class="cus-banner-content">简单订票、轻松旅行 用我们的专业为您提供最优质的服务</div>
        </div>
        <div class="cus-logo">
            <ul class="cus-list boxwidth">
                <li v-for="(item, i) in iconcount" :key="i"><img :src='"../assets/images/icon-logo/comlogo_" + i + ".png"' alt=""></li>
            </ul>
            <div class="loadmore" v-if="isload" @click="loadMore"><&nbsp;&nbsp;加载更多&nbsp;&nbsp;></div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'

export default {
    name: 'Customer',
    data () {
        return {
            iconcount: 30,
            isload: true
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        loadMore () {
            this.iconcount = 45
            this.isload = false
        }
    },
    created () {
        
    }
}
</script>

<style lang="scss">
.customer-box{
    margin: 0;
    overflow: hidden;
    font-family: '微软雅黑', sans-serif;
    background-color: #fff;
    .banner-customer-box{
        height: 557px;
        background: url('../assets/images/cus-banner.jpg') no-repeat center;
        color: #fff;
        text-align: center;
        .cus-banner-title{
            font-size: 36px;
            line-height: 36px;
            padding-top: 235px;
        }
        .cus-banner-content{
            margin-top: 26px;
            font-size: 16px;
            line-height: 16px;
        }
    }
    .cus-logo{
        padding: 100px 0;
        .cus-list{
            display: flex;
            flex-wrap: wrap;
            li{
                float: left;
                img{
                    max-width: 240px;
                    display: block;
                }
            }
        }
        .loadmore{
            clear: both;
            margin-top: 30px;
            text-align: center;
            font-size: 18px;
            color: #888;
            cursor: pointer;
        }
    }
}
</style>