<template>
    <div class="linkme-box">
        <Header></Header>
        <div class="banner-linkme-box">
            <div class="banner-title">联系我们</div>
            <div class="banner-content">卓越服务  精益求精  航空梦想  一起追逐</div>
        </div>
        <div class="linkme-method">
            <div class="boxwidth">
                <div class="linkme-call">CALL</div>
                <div class="linkme-map">
                    <img src="../assets/images/img-map.jpg" alt="">
                </div>
                <div class="linkme-body">
                    <div class="linkme-title">联系方式</div>
                    <div class="linkme-content">
                        <div>机票咨询预订：010-64060909　 400-722-7722（免长话费）</div>
                        <div>企业月结热线：010-84098177　 18601183533 武娟</div>
                        <div>同业代理（微信）：13466638385 王卓&nbsp;&nbsp;&nbsp;&nbsp;18612568286赵春玲</div>
                        <div>图文传真：010-84098033</div>
                        <div>电子邮件：kaixing@airkx.com</div>
                        <div>投诉邮箱：sale@airkx.com</div>
                        <div>地　　址：北京市东城区东直门南大街9号华普花园C座9层</div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'

export default {
    name: 'Linkme',
    data () {
        return {
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="scss">
.linkme-box{
    margin: 0;
    overflow: hidden;
    font-family: '微软雅黑', sans-serif;
    background-color: #fff;
    .banner-linkme-box{
        height: 557px;
        background: url('../assets/images/banner-linkme.jpg') no-repeat center;
        color: #fff;
        text-align: center;
        .banner-title{
            font-size: 36px;
            line-height: 36px;
            padding-top: 235px;
        }
        .banner-content{
            margin-top: 26px;
            font-size: 16px;
            line-height: 16px;
        }
    }
    .linkme-method{
        height: 900px;
        .boxwidth{
            position: relative;
            .linkme-call{
                position: absolute;
                top: 10px;
                left: 75px;
                font-size: 200px;
                line-height: 200px;
                height: 200px;
                color: #eaf5ff;
                font-weight: bold;
                font-family: Arial, Helvetica, sans-serif;
            }
            .linkme-map{
                position: absolute;
                right: 0;
                top: 88px;
                img{
                    display: block;
                    width: 800px;
                }
            }
            .linkme-body{
                position: absolute;
                left: 0;
                top: 180px;
                background-color: #fff;
                padding: 50px 34px;
                box-shadow: 0 0 10px #eee;
                line-height: 36px;
                color: #333;
                .linkme-title{
                    font-size: 36px;
                }
                .linkme-content{
                    margin-top: 30px;
                    font-size: 18px;
                }
            }
        }
    }
}
</style>