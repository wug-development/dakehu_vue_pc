<template>
    <div class="mainfooter-box">
        <div class="boxwidth ft-yewu">
            <div class="yw-label">
                <div class="yw-icon yw-fbkj"></div>
                <div class="yw-content">                
                    <div class="yw-title">方便快捷的服务</div>
                    <div>7X24小时服务，随时随地为您解决订票、出票、改期及退票等问题</div>
                </div>
            </div>
            <div class="yw-label">
                <div class="yw-icon yw-lhjszq"></div>
                <div class="yw-content">                
                    <div class="yw-title">灵活的结算周期</div>
                    <div>提供一个自然月结账模式，更有根据情况提供最长6个月的结算周期</div>
                </div>
            </div>
            <div class="yw-label">
                <div class="yw-icon yw-ppys"></div>
                <div class="yw-content">                
                    <div class="yw-title">品牌优势，这里更诚信</div>
                    <div>专业机票20年，随时获取最低折扣，机票机位有保障</div>
                </div>
            </div>
            <div class="yw-label">
                <div class="yw-icon yw-kxwys"></div>
                <div class="yw-content">                
                    <div class="yw-title">凯行网优势</div>
                    <div>资深客服团队，直接获取500余家航空公司的折扣票价，7x24小时专人服务</div>
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="boxwidth footer-body">
            <div class="footer-linkaddr">
                <div class="footer-tel">
                    tel：010-84098177  /  18601183533
                </div>
                <div class="footer-addr">
                    add：北京市东城区东直门南大街9号华普花园C906
                </div>
            </div>
            <div class="footer-beianNo">©2000-2022 Air, .Inc or its affiliates. All Rights Reserved. 版权所有 京ICP证060116号 京ICP备05055661号-1</div>
            <div class="card-all">
                <div class="card card-zzrz"><a href="http://www.airkx.com/glory.html" target="_blank"></a></div>
                <div class="card card-cata"><a href="http://www.airkx.com/glory1.html" target="_blank"></a></div>
                <div class="card card-beian"><a href="http://www.airkx.com/beian.html" target="_blank"></a></div>
                <div class="card card-webbeian"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010102000563" target="_blank"></a></div>
                <div class="card card-shiming"><a href="https://www.anquan.org/seccenter/search/www.airkx.com" target="_blank"></a></div>
            </div>
            <div class="img-code">
                <img src="../../assets/images/icon-code.png" alt="凯行网企业公众号">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.mainfooter-box{
    background-color: #212121;
    color: #fff;
    .ft-yewu{
        height: 212px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .yw-label{
            width: 300px;
            height: 80px;
            display: flex;
            .yw-fbkj{
                background: url('../../assets/images/icon-fbkjfw.png') no-repeat center;
            }
            .yw-lhjszq{
                background: url('../../assets/images/icon-lhjszq.png') no-repeat center;
            }
            .yw-ppys{
                background: url('../../assets/images/icon-ppys.png') no-repeat center;
            }
            .yw-kxwys{
                background: url('../../assets/images/icon-kxwys.png') no-repeat center;
            }
            .yw-icon{
                width: 80px;
                height: 80px;
                background-color: #fff;
                border-radius: 80px;
            }
            .yw-content{
                width: 220px;
                padding-left: 10px;
                box-sizing: border-box;
                color: #888888;
                .yw-title{
                    color: #fff;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
            }
        }
    }
    .line{
        border-top: 1px solid #888888;
    }
    .footer-body{
        height: 222px;
        padding: 40px 0;
        box-sizing: border-box;
        position: relative;
        .footer-linkaddr{
            display: flex;
            color: #bdbdbd;
            div{
                padding-left: 30px;
                margin-right: 20px;
                height: 25px;
                float: left;
            }
            .footer-tel{
                background: url('../../assets/images/icon-footer-tel.png') no-repeat left center;
                background-size: 23px auto;
            }
            .footer-addr{
                background: url('../../assets/images/icon-footer-addr.png') no-repeat left center;
                background-size: 24px auto;
            }
        }
        .footer-beianNo{
            color: #888888;
            line-height: 60px;
        }
        .card-all{
            margin: 0;
            display: flex;
            .card{
                width: 118px;
                height: 38px;
                margin-right: 30px;
                a{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .card-zzrz{
                background: url('../../assets/images/card-zzrz.png') no-repeat left center;
            }
            .card-cata{
                background: url('../../assets/images/card-cata.png') no-repeat left center;
            }
            .card-beian{
                background: url('../../assets/images/card-beian.png') no-repeat left center;
            }
            .card-webbeian{
                background: url('../../assets/images/card-webbeian.png') no-repeat left center;
            }
            .card-shiming{
                background: url('../../assets/images/card-shiming.png') no-repeat left center;
            }
        }
        .img-code{
            position: absolute;
            right: 5px;
            top: 42px;
        }
    }
}
</style>