<template>
    <div class="pubmenu">
        <ul class="menubox">
            <li :class="tab=='index'?'cur':''" @click="toPage('index')">机票预订</li>
            <li :class="tab=='order'?'cur':''" @click="toPage('orderlist')">订单查询</li>
            <li :class="tab=='record'?'cur':''" @click="toPage('payrecord')">付款记录</li>
            <li :class="tab=='contact'?'cur':''" @click="toPage('topcontacts')">常用乘机人</li>
            <li :class="tab=='credit'?'cur':''">信用额度 <span>（{{creditcount}}）</span></li>
            <li :class="tab=='credit'?'cur':''">未付欠款 <span>（{{debt}}）</span></li>
            <li :class="tab=='credit'?'cur':''">可用额度 <span>（{{credit}}）</span></li>
            <li :class="tab=='out'?'cur':''" @click="loginout">退出</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['t'],
    data () {
        return {
            tab: 'order',
            userID: '',
            creditcount: '-',
            debt: '-',
            credit: '-',
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
                path: '/'
            })
        },
        getAccountInfo () {
            let acount = JSON.parse(sessionStorage.getItem('account'))
            this.userID = acount.id
            if (this.userID) {
                this.utils.http({
                    name: this,
                    uri: '/company/getCompanyAccount',
                    params: {
                        params: { 
                            id: this.userID
                        }
                    },
                    success: res=>{
                        if(res.status === 200 && res.data.status === 1){
                            let account = res.data.data[0]
                            console.log(account)
                            this.creditcount = account.creditcount
                            this.debt = account.debt
                            this.credit = account.credit
                        }
                    }
                })
            }
        }
    },
    created() {
        this.tab = this.t
        this.getAccountInfo()
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