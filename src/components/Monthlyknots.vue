<template>
    <div class="monthly-box">        
        <Header></Header>
        <div class="banner-yuejie-box">
            <div class="my-data">
                <div class="data-title">企业月结</div>
                <div class="data-sub-title">简单订票 轻松旅行 凯行网企业票务通竭诚为您服务</div>
            </div>
        </div>
        <div class="yuejie-body">
            <div class="yuejie-servers">
                <ul class="zfcg-list box-width">
                    <li class="zfcg-item">
                        <div class="item-img"><img src="../assets/images/yuejie/img-xy.png" alt="凯行网"></div>
                        <div class="item-title">可靠的信用资质</div>
                        <div class="item-content">我公司是政府采购机票的定点单位，具备国际航协及国内航协的认可资质，同时具有中航鑫港公司的政府采购机票担保函</div>
                    </li>
                    <li class="zfcg-item">
                        <div class="item-img"><img src="../assets/images/yuejie/img-fbjk.png" alt="凯行网"></div>
                        <div class="item-title">方便快捷的服务</div>
                        <div class="item-content">平台提供24小时不间断自主查询和预订服务的同时，更有客服专员7X24小时一对一服务，一个电话，一条信息随时随地为您解决订票、出票、改期及退票等问题</div>
                    </li>
                    <li class="zfcg-item">
                        <div class="item-img"><img src="../assets/images/yuejie/img-jszq.png" alt="凯行网"></div>
                        <div class="item-title">灵活的结算周期</div>
                        <div class="item-content">公司提供自然月结账模式，更有根据情况提供最长6个月的结算周期；先出票后付款，月底账单一目了然，信用卡、微信、支付宝、支票、公务卡、网上转账等多种支付方式</div>
                    </li>
                    <li class="zfcg-item">
                        <div class="item-img"><img src="../assets/images/yuejie/img-qypwt.png" alt="凯行网"></div>
                        <div class="item-title">登录企业票务通</div>
                        <div class="item-btn btn" @click="toHome">登录</div>
                    </li>
                </ul>
            </div>
            <div class="yuejie-liucheng">
                <div class="lc-title">企业月结流程</div>
                <ul class="qyyj-list box-width">
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_15.png" alt=""></div>
                        <div class="item-name">与客服专员联系沟通，签订<a @click="toAgree">机票预订服务协议</a>书</div>
                    </li>
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_18.png" alt=""></div>
                        <div class="item-name">登录自己邮箱根据凯行网发送的链接设定机票预订平台登录密码</div>
                    </li>
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_21.png" alt=""></div>
                        <div class="item-name">登录平台进行机票的查询及预订（也可通过联系客服专员人工预订）</div>
                    </li>
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_24.png" alt=""></div>
                        <div class="item-name">接收出票信息的短信或邮件通知（便可愉快乘机）</div>
                    </li>
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_27.png" alt=""></div>
                        <div class="item-name">退票、改期、轻松如意</div>
                    </li>
                    <li class="qyyj-item">
                        <div class="item-img"><img src="../assets/images/yuejie/yj_29.png" alt=""></div>
                        <div class="item-name">月底账单一目了然，确认后支付</div>
                    </li>
                </ul>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'
export default {
    name: 'Monthly',
    components: {
        Header,
        Footer
    },
    methods: {
        toHome () {
            this.$router.push({
                path: '/'
            })
        },
        toAgree () {
            this.$router.push({
                path: '/agree'
            })
        }
    }
}
</script>

<style lang="scss">
.monthly-box{
    margin: 0;
    overflow: hidden;
    .box-width{
        width: 1240px;
        margin: 0 auto;
    }
    .banner-yuejie-box{
        height: 557px;
        background: url('../assets/images/yuejie/banner-yuejie.jpg') no-repeat center;
        .my-data{
            color: #fff;
            text-align: center;
            padding-top: 180px;
            .data-title{
                font-size: 80px;
                height: 106px;
            }
            .data-sub-title{
                margin-top: 20px;
                font-size: 44px;
            }
        }
    }
    .yuejie-servers{
        background-color: #fff;
        padding: 60px 0;
        .zfcg-list{
            display: flex;
            justify-content: space-between;
            text-align: center;
            .zfcg-item{
                width: 300px;
                height: 442px;
                box-shadow: 0 0 5px #eee;
                .item-img{
                    height: 210px;
                    overflow: hidden;
                    img{
                        display: block;
                        width: 100%;
                        transition: all .6s;
                    }
                }
                .item-img:hover{
                    img{
                        transform: scale(1.2);
                    }
                }
                .item-title{
                    margin-top: 30px;
                    font-size: 24px;
                    color: #000;
                    font-weight: bold;
                }
                .item-content{
                    padding: 30px 30px 0 30px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #888;
                    line-height: 24px;
                    span{
                        font-size: 24px;
                        color: #ec2121;
                    }
                }
                .item-btn{
                    width: 158px;
                    height: 42px;
                    line-height: 42px;
                    margin: 50px auto;
                    font-size: 18px;
                    border-radius: 50px;
                    a{
                        display: block;
                    }
                }
            }
        }
    }
    .yuejie-liucheng{
        background-color: #f1f2f8;
        padding: 80px 0;
        .lc-title{
            text-align: center;
            font-size: 36px;
        }
        .qyyj-list{
            display: flex;
            margin-top: 70px;
            justify-content: space-between;
            .qyyj-item{
                width: 220px;
                text-align: center;
                position: relative;
                .item-img{
                    margin: 0 auto;
                    width: 140px;
                    height: 140px;
                    border-radius: 154px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: url('../assets/images/yuejie/index-yj-bg.png') no-repeat center;
                    background-size: 100%;
                }
                .item-name{
                    margin-top: 20px;
                    font-size: 14px;
                    color: #333;
                    padding: 0 15px;
                    a{
                        color: #e42d2c;
                        border-bottom: 1px solid #e42d2c;
                        cursor: pointer;
                    }
                }
            }
            .qyyj-item::after{
                content: '';
                position: absolute;
                top: 70px;
                left: 200px;
                display: block;
                width: 10px;
                height: 10px;
                border-right: 2px solid #888;
                border-top: 2px solid #888;
                transform: rotate(45deg);
            }
            .qyyj-item:last-child::after{
                content: none;
            }
        }
    }
}
</style>