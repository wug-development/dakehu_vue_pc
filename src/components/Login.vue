<template>
    <div class="login-box">
        <Header></Header>
        <div class="boxwidth">
            <input type="text" class="txts" v-model="uname" placeholder="请输入用户名"><br>
            <input type="password" class="txts" name="" v-model="upass" placeholder="请输入密码">
            <div class="btn" @click="login">登录</div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/Header.vue'
import Footer from './public/Footer.vue'

export default {
    name: 'Login',
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
    }
}
</script>

<style>

</style>