<template>
    <div class="aboutme-box">
        <Header></Header>
        <div class="banner-aboutme-box">
            <div class="my-data">
                <div class="data-title">我们的数据</div>
                <div class="data-sub-title">2019年1月1日至2020年2月1日，我们的接待数据</div>
                <div class="data-list boxwidth">
                    <div class="data-item">
                        <div class="item-data"><span>{{Bignum}}</span></div>
                        <div class="item-name">累计购票</div>
                    </div>
                    <div class="data-item">
                        <div class="item-data"><span>{{Percentage}}</span>%</div>
                        <div class="item-name">出票成功率</div>
                    </div>
                    <div class="data-item">
                        <div class="item-data"><span>{{Midnum}}</span></div>
                        <div class="item-name">累计受理申请</div>
                    </div>
                    <div class="data-item">
                        <div class="item-data"><span>{{PercentageTwo}}</span>%</div>
                        <div class="item-name">综合通过率</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="company-info">
            <div class="boxwidth aboutme-info-body">
                <div class="info-content">
                    <div class="info-title">
                        <div>北京凯行网航空服务有限公司</div>
                        <div class="info-t-sub">BEIJING KASIN NET AIRTICKET SERVICE COMPANY LTD.</div>
                    </div>
                    <div class="info-body">
                        <div>北京凯行网航空服务有限公司成立于2001年，作为一家专业的机票代理商，与国际国内500余家航空公司建立了良好的销售代理关系。公司秉承诚恳、热情、快捷的服务方式和极具竞争力的机票价格得到广大客户的信赖，以及社会各界同仁的支持；现与多个政府部委、国企、央企、留学服务中介机构、科研院所、民间组织、外企商会以及大中型企事业单位签约；亦是政府采购机票指定服务商。 凯行网机票服务中心每年的出票量达数十亿之多，出团率达到数百次，在业内名列前茅，树立了凯行网在业内良好的品牌形象。</div>
                        <div>本公司拥有一支业务精、作风硬、服务好、效率高的员工队伍,他们当中既有服务公司多年的业务精英，也有令人刮目相看的业务新秀,公司的特色经营和优秀的人才群体形成了独特的企业文化。</div>
                        <div>公司同名网站凯行网 www.airkx.com 经过多次的改版和修正，现在已经是一个具查询、预定、在线咨询的全方位机票门户网站；简洁的页面优质的服务器，让您的访问快速简便，在线专员的热情回复让您的咨询充满温馨，我们力求本站的“国际机票”可以查询到最新、最全、最准确的票价！公司同时拥有多条集团电话为您服务，让您的订票更加快捷方便。合理的价格，优质的服务。一切机票问题，在您一个电话，一条留言就能帮您解决。</div>
                        <div class="cur">合理的价格，优质的服务。一切机票问题，在您一个电话，一条留言就能帮您解决。</div>
                    </div>
                </div>
                <div class="aboutme-info-img">
                    <img :src='IMGW_URL + "zizhi/aboutme_05.png"' alt="">
                </div>
            </div>
        </div>
        <div class="company-info company-travel-info">
            <div class="boxwidth aboutme-info-body">
                <div class="aboutme-info-img">
                    <el-image :key='imguri + "/zizhi/aboutme_09.png"' :src='imguri + "/zizhi/aboutme_09.png"' lazy></el-image>
                </div>
                <div class="info-content">
                    <div class="info-title">
                        <div>北京凯行国际旅行社有限公司</div>
                        <div class="info-t-sub">BEIJING KASIN INTERNATIONL TRAVEL SERVISE CO.,LTD.</div>
                    </div>
                    <div class="info-body">
                        <div>北京凯行国际旅行社创立于2012年，是经国家旅游局批准可同时经营国际出入境旅游、国内旅游和中国公民出国旅游业务的国际旅行社。我社依托公司的强大经济实力及良好的声誉，与北京市各个国际旅行社结成国旅联盟，现已构成强大的旅游信息市场和健全的网络。北京凯行国际旅行社设有欧美部、亚洲部、日本部、韩国部、国内旅游部，及出境旅游中心等多个专业部门。专业从事入境旅游、出境旅游、国内旅游。是集国际、国内会奖旅游、商务旅行、观光旅游、休闲和度假旅游为一体的综合性服务企业。 北京凯行国际旅行社在不断加强对欧美市场和日本、韩国及东南亚入境客源市场的开拓基础上大力发展出入境旅游业务。开拓中国公民出境度假旅游商务考察、会议展览等特色产品，并取得了社会各界专业人士和客户的认可。 北京凯行国际旅行社拥有一批经验丰富的专业经理人队伍，凭借对专业知识的掌握和优秀的质量管理，秉承"以人为本""服务社会"的现代理念。 将努力为提高全民素质增进与世界各国人民及社会各界的友好交往和专业交流做出我们应有的贡献。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="company-team">
            <div class="boxwidth">
                <div class="team-title">凯行团队</div>
                <div class="team-sub">
                    拥有一批经验丰富的专业经理人队伍，凭借对专业知识的掌握和优秀的质量管理，秉承"以人为本""服务社会"的现代理念。
                    <br/>将努力为提高全民素质增进与世界各国人民及社会各界的友好交往和专业交流做出我们应有的贡献。
                </div>
                <div class="team-img">
                    <el-image :key='imguri + "/zizhi/aboutme_13.png"' :src='imguri + "/zizhi/aboutme_13.png"' lazy></el-image>
                </div>
            </div>
        </div>
        <div class="company-zizhi">
            <div class="boxwidth">
                <div class="zizhi-title">资质荣誉</div>
                <div class="zizhi-card">
                    <div v-for="item in zizhis"><el-image :key='imguri + "/zizhi/aboutme_" + item + ".png"' :src='imguri + "/zizhi/aboutme_" + item + ".png"' alt="" lazy></el-image></div>
                </div>
                <div class="swiper-container zizhi-cert">
                    <el-carousel indicator-position="outside">
                        <el-carousel-item v-for="(item, i) in 7" :key="i">
                            <el-image :key='imguri + "/gsjx/gsjx" + item + ".png"' :src='imguri + "/gsjx/gsjx" + item + ".png"' alt="" lazy></el-image>
                        </el-carousel-item>
                    </el-carousel>
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
    name: 'Aboutme',
    data () {
        return {
            Bignum: 918300,
            Percentage: 0,
            Midnum: 5000,
            PercentageTwo: 0,
            showzizhi: false,
            zizhis: [17,19,21,23,25,27]
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        loadData () {
            var NUM_OLD = 918300; //第一个最大数
            var NUM_NEW = 918397; //最后数据
            var NUM_PERNEW = 0; //百分数初始值
            var NUM_PEROLD = 98.8; //百分数最后数据
            var NUM_MIDNEW = 5000; //初始计算值
            var NUM_MIDOLD = 5118;
            var NUM_BFB = 0;
            var NUM_YS = 0.0;
            var NUM_BFBNEW = 99;
            var timer = setInterval(() => {
                console.log(1)
                if (NUM_OLD < NUM_NEW) {
                    NUM_OLD++;
                    this.Bignum = NUM_OLD.toLocaleString();
                } else {
                    NUM_OLD = NUM_NEW;                
                }

                if (NUM_PERNEW < NUM_PEROLD) {
                    NUM_PERNEW += 1.1;
                    this.Percentage = parseFloat(NUM_PERNEW).toFixed(1)
                }

                if (NUM_MIDNEW < NUM_MIDOLD) {
                    NUM_MIDNEW++;
                    this.Midnum = NUM_MIDNEW.toLocaleString();
                }
                if (NUM_BFB < NUM_BFBNEW) {
                    NUM_BFB++;
                    if(parseInt(NUM_BFB)%10 == 0 && NUM_YS<=0.7){
                        NUM_YS+=0.1;
                    }
                    this.PercentageTwo = NUM_BFB+NUM_YS;
                }
                if(NUM_MIDNEW>=5118){
                    clearInterval(timer)
                }
                console.log(2)
            }, 25);
        }
    },
    mounted () {
        setTimeout(() => {
            this.loadData()
        }, 1000)
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.aboutme-box{
    margin: 0;
    overflow: hidden;
    font-family: '微软雅黑', sans-serif;
    .banner-aboutme-box{
        height: 557px;
        background: url($imguri + 'banner-aboutme.png') no-repeat center;
        .my-data{
            color: #fff;
            text-align: center;
            padding-top: 170px;
            .data-title{
                font-size: 36px;
            }
            .data-sub-title{
                margin-top: 20px;
                font-size: 16px;
            }
            .data-list{
                display: flex;
                justify-content: center;
                padding-top: 70px;
                font-size: 16px;
                .data-item{
                    margin: 0 75px;
                    float: left;
                    .item-data{
                        font-size: 44px;
                        span{
                            line-height: 60px;
                        }
                    }
                }
            }
        }
    }
    .company-info{
        background-color: #fff;
        padding: 96px 0;
        .aboutme-info-body{
            display: flex;
            color: #333;
            .info-content{
                padding-right: 38px;
                .info-title{
                    font-size: 36px;
                    font-family: '微软雅黑', sans-serif;
                    line-height: 40px;
                    .info-t-sub{
                        font-family: Arial, sans-serif;
                        font-size: 16px;
                    }
                }
                .info-body{
                    padding: 10px 0;
                    line-height: 20px;
                    div{
                        padding: 8px 0;
                    }
                    .cur{
                        color: #de1721;
                    }
                }
            }
            .aboutme-info-img{
                img{
                    display: block;
                    width: 670px;
                }
            }
        }
    }
    .company-travel-info{
        background-color: #f1f2f8;
        .aboutme-info-body{
            .info-content{
                padding: 0 0 0 38px;
            }
        }
    }
    .company-team{
        padding: 90px 0;
        background-color: #fff;
        text-align: center;
        font-family: '微软雅黑', sans-serif;
        .team-title{
            font-size: 36px;
            color: #333;
            line-height: 48px;
        }
        .team-sub{
            font-size: 18px;
            margin-top: 24px;
            color: #888;
            line-height: 32px;
        }
        .team-img{
            margin-top: 40px;
            img{
                display: block;
                width: 100%;
            }
        }
    }
    .company-zizhi{
        padding: 90px 0;
        background-color: #f1f2f8;
        text-align: center;
        .zizhi-title{
            font-size: 36px;
            color: #333;
            line-height: 48px;
        }
        .zizhi-card{
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
            img{
                display: block;
                width: 200px;
            }
        }
        .zizhi-cert{
            margin-top: 30px;
            padding: 40px 0;
            .el-carousel__container{
                margin: 0;
                height: 900px !important;
            }
            .el-carousel__indicators--outside button{
                background-color: #0d77d6;
            }
        }
    }
}
</style>