<template>
    <div class="main-header-box">
        <div class="mh-body boxwidth">
            <div class="logo"><router-link :to="{path: '/'}"><img src="../../assets/images/logo.png" alt=""></router-link></div>
            <nav>
                <router-link :to="{path: '/'}">首页</router-link>
                <router-link :to="{path: '/aboutme'}">关于我们</router-link>
                <router-link :to="{path: '/business'}">业务板块</router-link>
                <router-link :to="{path: '/customer'}">合作伙伴</router-link>
                <router-link :to="{path: '/govpro'}">政府采购</router-link>
                <router-link :to="{path: '/linkme'}">联系我们</router-link>
            </nav>
            <div class="link-phone">
                010-84098177 &nbsp;/ &nbsp;18601183533
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.main-header-box{
    height: 82px;
    background-color: #fff;
    .mh-body{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        .logo{
            float: left;
        }
        nav{
            float: left;
            font-size: 16px;
            color: #333;
            display: flex;
            a{
                margin: 0 25px;
            }
            a:hover{
                text-decoration: underline;
            }
        }
        .link-phone{
            float: right;
        }
    }
}
</style>