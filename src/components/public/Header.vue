<template>
    <div class="pubheader">
        <div class="pubheader-box">
            <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
            <div class="name-box">
                <a class="name" id="lab_name">{{uname}}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            uname: ''
        }
    },
    created () {
        const _account = sessionStorage.getItem('account')
        if (_account) {
            let _user = JSON.parse(_account)
            this.uname = _user.uname
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.pubheader{
    background-color: #fff;
    height: 70px;
    .pubheader-box{
        width: $body-width;
        margin: 0 auto;        
        .logo{
            float: left;
            padding-top: 8px;
        }
        .name-box{
            float: right;
            height: 70px;
            line-height: 70px;
            .name{
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
</style>