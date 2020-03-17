<template>
    <div class="main-box">
        <Header></Header>
        <div class="boxwidth">
            <div class="main-body">
                <div class="login-form">
                    <div class="from-title">凯行网企业VIP登陆</div>
                    <input type="text" class="txts" v-model="uname" placeholder="请输入用户名"><br>
                    <input type="password" class="txts" name="" v-model="upass" placeholder="请输入密码">
                    <div class="btn" @click="login">登陆</div>
                    <div class="link">联系客服：400-722-7722</div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'Main',
    data () {
        return {
            uname: '',
            upass: ''
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        login () {
            if (this.uname == '') {
                this.MessageBox('请输入账号')
            } else if (this.upass == '') {
                this.MessageBox('请输入密码')
            } else {
                this.$http.get(this.uris + '/company/login', {
                    params: {
                        "uname": this.uname,
                        "upass": this.upass
                    }
                }).then(res => {
                    if (res.data.status == '1') {
                        sessionStorage.setItem('account', JSON.stringify(res.data.data[0]))
                        this.$router.push({
                            path: '/index'
                        })
                    } else {
                        this.MessageBox(res.data.msg)
                    }
                })
            }
        }
    },
    created () {
        let that = this
        let _uname = this.$route.query.uname
        let _upass = this.$route.query.upass
        if (_uname && _upass) {
            this.uname = _uname
            this.upass = _upass
        }
        document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which
            if (keycode == 13) {
                that.login()
            }
        }
    }
}
</script>

<style lang="scss">
.main-body{
    height: 600px;
    position: relative;
    .login-form{
        position: absolute;
        right: 0;
        top: 100px;
        background-color: #fff;
        width: 350px;
        height: 380px;
        padding: 40px;
        box-sizing: border-box;
        border-radius: 4px;
        box-shadow: 1px 1px 5px #ccc;
        .from-title{
            font-size: 18px;
            text-align: center;
        }
        .txts{
            width: 100%;
            margin-top: 25px;
            height: 45px;
            border-radius: 3px;
            box-sizing: border-box;
        }
        .btn{
            margin-top: 25px;
            width: 100%;
            height: 45px;
            line-height: 44px;
            border-radius: 3px;
            box-sizing: border-box;
            font-size: 16px;
        }
        .link{
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            box-sizing: border-box;
            text-align: center;
            line-height: 60px;
            background-color: #ccc;
        }
    }
}
</style>