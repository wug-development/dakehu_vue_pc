<template>
    <div class="business-box">
        <Header></Header>
        <div class="banner-business-box">
            <div class="bus-banner-title">业务板块</div>
            <div class="bus-banner-content">五大业务板块，诚恳、热情、快捷的服务</div>
        </div>
        <div class="bus-mod-box">
            <div class="boxwidth">
                <div class="mod-l">
                    <img src="../assets/images/bus/bus_gj.jpg" alt="">
                </div>
                <div class="mod-r mod-info">
                    <div class="info-title">国际机票</div>
                    <div class="info-tip">500家航空公司金牌代理、20年积累实力保证、资深团队服务一流</div>
                    <div class="info-line"></div>
                    <div class="info-content">
                        公司成立20年以来被国航东航等国内航空公司以及近500家国际航空公司先后授予金牌代理称号；我们秉着业务争先、服务至上的原则得到了广大客户以及航空公司的肯定，并与多家航空公司建立了紧密良好的销售代理关系，从而奠定了行业领先者的地位。通过20年持续努力让我们的团队规模不断扩大，积累了一批行业精英、业务好手，使我们的服务有了更好的保障。
                    </div>
                </div>
            </div>
        </div>
        <div class="bus-mod-box">
            <div class="boxwidth">
                <div class="mod-l mod-info">
                    <div class="info-title">国内机票</div>
                    <div class="info-tip">与国内50余家航空公司建立了良好的销售代理关系</div>
                    <div class="info-line"></div>
                    <div class="info-content">
                        先后被国航（CA）东航（MU）南航（CZ）海航（HU）等多家航空公司评为最佳销售代理人，更是获得了金奖银奖等荣誉，累计销售机票超过100万人次。
                    </div>
                </div>
                <div class="mod-r">
                    <img src="../assets/images/bus/bus_gn.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="bus-mod-box">
            <div class="boxwidth">
                <div class="mod-l">
                    <img src="../assets/images/bus/bus_qy.jpg" alt="">
                </div>
                <div class="mod-r mod-info">
                    <div class="info-title">企业月结</div>
                    <div class="info-tip">一流的企业票务通预订平台、灵活的结账周期、先乘机后付款</div>
                    <div class="info-line"></div>
                    <div class="info-content">
                        公司致力于大客户的服务，只要合规企业都可以与我公司签署机票预订合作协议，专人对接7X24小时一对一服务，可以登录平台自主查询预订机票，也可以联系客服专员人工帮助预订，对于预订后的改期退票签转等服务更是简单快捷；月底账单一目了然，核对无误后支付。
                    </div>
                </div>
            </div>
        </div>
        <div class="bus-mod-box">
            <div class="boxwidth">
                <div class="mod-l mod-info">
                    <div class="info-title">签证</div>
                    <div class="info-tip">预约、填表、翻译、送签、专业资深老师代办</div>
                    <div class="info-line"></div>
                    <div class="info-content">
                        凯行国际旅行社成立于2012年，致力于签证、保险、酒店、机票及旅游等一条龙服务；签证部门的资深老师可以帮助客户进行签证预约、填表、翻译、送签、以及出国担保等服务；签证成功率高达99.9%。
                    </div>
                </div>
                <div class="mod-r">
                    <img src="../assets/images/bus/bus_qz.jpg" alt="">
                </div>
            </div>
        </div>
        <div class="bus-mod-box">
            <div class="boxwidth">
                <div class="mod-l">
                    <img src="../assets/images/bus/bus_qy.jpg" alt="">
                </div>
                <div class="mod-r mod-info">
                    <div class="info-title">保险</div>
                    <div class="info-tip">以中国平安、安联保险为首的公司合作，提供安全保障</div>
                    <div class="info-line"></div>
                    <div class="info-content">
                        2002年以来我们与中国平安和安联保险公司合作，为客户提供出国保险，签证保险服务，我们操作规范服务一流得到了广大客户的信任和保险公司的认可。
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
    name: 'Business',
    data () {
        return {
        }
    },
    components: {
        Header,
        Footer
    },
    created () {
        
    }
}
</script>

<style lang="scss">
.business-box{
    margin: 0;
    overflow: hidden;
    font-family: '微软雅黑', sans-serif;
    background-color: #fff;
    .banner-business-box{
        height: 557px;
        background: url('../assets/images/bus/bus_banner.jpg') no-repeat center;
        color: #fff;
        text-align: center;
        .bus-banner-title{
            font-size: 36px;
            line-height: 36px;
            padding-top: 235px;
        }
        .bus-banner-content{
            margin-top: 26px;
            font-size: 16px;
            line-height: 16px;
        }
    }
    .bus-mod-box{
        padding: 80px 0;        
        .boxwidth{
            display: flex;
            justify-content: space-between;
            .mod-info{
                margin: 0;
                .info-title{
                    padding-top: 40px;
                    font-size: 40px;
                    line-height: 40px;
                    color: #333;
                }
                .info-tip{
                    margin-top: 26px;
                    font-size: 20px;
                    line-height: 20px;
                    color: #429beb;                    
                }
                .info-content{
                    font-size: 16px;
                    color: #888;
                    line-height: 28px;
                    margin-top: 28px;
                }
                .info-line{
                    width: 50px;
                    height: 2px;
                    background-color: #429beb;
                    margin-top: 22px;
                    white-space: nowrap;
                }
            }
        }
        .mod-l{
            float: left;
        }
        .mod-r{
            float: right;
        }
        .mod-l.mod-info{
            padding-right: 40px;
        }
        .mod-r.mod-info{
            padding-left: 40px;
        }
        img{
            display: block;
            max-width: 570px;
        }
    }
    .bus-mod-box:nth-child(even){
        background-color: #f1f2f8;
    }
}
</style>