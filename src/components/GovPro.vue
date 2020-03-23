<template>
    <div class="govpro-box">
        <Header></Header>
        <div class="banner-govpro-box">
            <div class="banner-title">政府采购</div>
            <div class="banner-content">中国财政部和民用航空局经过严格的审核，筛选出政府机票采购供应商</div>
        </div>
        <div class="zfcg-box">
            <div class="zfcg-title">政府采购定点机票代理商</div>
            <div class="zfcg-content">
                根据中国民用航空局印发的《关于加强公务机票管理有关事项的通知》以及（财库{2014}33号文件，以下简称《通知》）中明确的购票人在国内出差、
                <br/>因公临时出国时所购买的机票规定。中国财政部和民用航空局经过严格的审核，筛选出政府机票采购供应商
            </div>
            <ul class="zfcg-list boxwidth">
                <li class="zfcg-item">
                    <div class="item-img"><img src="../assets/images/img-xy.png" alt="凯行网"></div>
                    <div class="item-title">可靠的信用资质</div>
                    <div class="item-content">我公司是政府采购机票的定点单位，具备国际航协及国内航协的认可资质，同时具有中航鑫港公司的政府采购机票担保函</div>
                </li>
                <li class="zfcg-item">
                    <div class="item-img"><img src="../assets/images/img-cg.png" alt="凯行网"></div>
                    <div class="item-title">公务机票采购优惠</div>
                    <div class="item-content">各政府部门、科学院校、医院等事业单位。持有公务卡的公务员、老师、医生等相关人员；在我单位购买机票可享受全价票<span>8.8</span>折，折扣票<span>9.5</span>折的优惠</div>
                </li>
                <li class="zfcg-item">
                    <div class="item-img"><img src="../assets/images/img-zf.png" alt="凯行网"></div>
                    <div class="item-title">公务卡简捷支付</div>
                    <div class="item-content">购买机票可以使用公务卡进行网上无卡支付，我们也可以上门刷卡支付</div>
                </li>
                <li class="zfcg-item">
                    <div class="item-img"><img src="../assets/images/img-yj.png" alt="凯行网"></div>
                    <div class="item-title">可签约月结服务</div>
                    <div class="item-content">我公司提供政府单位签约进行<span>先</span>乘机<span>后</span>付款月结服务</div>
                </li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'

export default {
    name: 'Govpro',
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
.govpro-box{
    margin: 0;
    overflow: hidden;
    font-family: '微软雅黑', sans-serif;
    background-color: #fff;
    .banner-govpro-box{
        height: 557px;
        background: url('../assets/images/gov-banner.jpg') no-repeat center;
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
    .zfcg-box{
        height: 730px;
        text-align: center;
        padding-top: 66px;
        box-sizing: border-box;
        font-family: "微软雅黑", sans-serif;
        .zfcg-title{
            font-size: 40px;
            color: #333;
        }
        .zfcg-content{
            margin-top: 32px;
            color: #888;
            font-size: 16px;
            line-height: 32px;
        }
        .zfcg-list{
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            .zfcg-item{
                width: 290px;
                height: 422px;
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
                    padding: 30px 20px;
                    box-sizing: border-box;
                    font-size: 14px;
                    color: #888;
                    line-height: 24px;
                    span{
                        font-size: 24px;
                        color: #ec2121;
                    }
                }
            }
        }
    }
}
</style>