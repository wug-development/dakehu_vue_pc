<template>
    <div class="main-header-box">
        <div class="mh-body">
            <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
            <nav>
                <a href="/">首页</a>
                <a href="">关于我们</a>
                <a href="">业务板块</a>
                <a href="">合作伙伴</a>
                <a href="">政府采购</a>
                <a href="">联系我们</a>
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
        width: $body-width;
        margin: 0 auto; 
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