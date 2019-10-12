<template>
    <div class="pubmenu">
        <ul class="menubox">
            <li :class="tab=='index'?'cur':''" @click="toPage('index')">机票预订</li>
            <li :class="tab=='order'?'cur':''" @click="toPage('orderlist')">订单查询</li>
            <li :class="tab=='record'?'cur':''" @click="toPage('payrecord')">汇款记录</li>
            <li :class="tab=='contact'?'cur':''" @click="toPage('topcontacts')">常用联系人</li>
            <li :class="tab=='credit'?'cur':''">信用额度 <span>（10000）</span></li>
            <li :class="tab=='out'?'cur':''" @click="loginout">退出</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['t'],
    data () {
        return {
            tab: 'index'
        }
    },
    methods: {
        toPage (v) {
            this.$router.push({
                path: '/' + v
            })
        },
        loginout () {
            sessionStorage.setItem('account', '')
            this.$router.push({
                path: '/login'
            })
        }
    },
    created() {
        this.tab = this.t
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.pubmenu{
    background-color: $pubcolor;
    height: 52px;
    line-height: 52px;
    .menubox{
        width: 1200px;
        display: flex;
        margin: 0 auto;
        li{
            height: 100%;
            padding: 0 30px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            span{
                color: #fae494;
            }
        }
        .cur{
            background-color: #fff;
            color: $pubcolor;
        }
    }
}
</style>