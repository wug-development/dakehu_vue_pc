<template>
    <div class="main-box">
        <Header></Header>
        <div class="main-banner">
            <div class="boxwidth">
                <div class="banner-txt">
                    <div class="bt-title">北京企业机票月结首选品牌</div>
                    <div class="bt-content">
                        <div class="bt-24time"><span>hours</span>专人对接服务</div>
                        <div class="bt-yuejie">100%航协认证机票月结有保障</div>
                    </div>
                </div>
                <div class="login-form">
                    <div class="login-body">
                        <div class="login-width">
                            <div class="from-title">企业登录</div>
                            <input type="text" class="txts txt-account" v-model="uname" placeholder="请输入用户名"><br>
                            <input type="password" class="txts txt-pass" name="" v-model="upass" placeholder="请输入密码">
                            <div class="tip">成为凯行网月结客户？</div>
                            <div class="btn" @click="login">登录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-business">
            <div class="bus-title">凯行业务板块</div>
            <div class="bus-dot"></div>
            <ul class="bus-list">
                <li>
                    <div class="icon-gj"></div>
                    <div class="item-title">国际机票</div>
                    <div class="item-content">凯行网是中国航协及国际航协批<br/>准设立的一级机票代理机构</div>
                    <div class="item-more">MORE ></div>
                    <div class="item-btn-more">了解更多 ></div>
                </li>
                <li>
                    <div class="icon-gn"></div>
                    <div class="item-title">国内机票</div>
                    <div class="item-content">凯行网是中国航协及国际航协批<br/>准设立的一级机票代理机构</div>
                    <div class="item-more">MORE ></div>
                    <div class="item-btn-more">了解更多 ></div>
                </li>
                <li>
                    <div class="icon-qy"></div>
                    <div class="item-title">企业月结</div>
                    <div class="item-content">凯行网是中国航协及国际航协批<br/>准设立的一级机票代理机构</div>
                    <div class="item-more">MORE ></div>
                    <div class="item-btn-more">了解更多 ></div>
                </li>
                <li>
                    <div class="icon-qz"></div>
                    <div class="item-title">签证</div>
                    <div class="item-content">凯行网是中国航协及国际航协批<br/>准设立的一级机票代理机构</div>
                    <div class="item-more">MORE ></div>
                    <div class="item-btn-more">了解更多 ></div>
                </li>
                <li>
                    <div class="icon-bx"></div>
                    <div class="item-title">保险</div>
                    <div class="item-content">凯行网是中国航协及国际航协批<br/>准设立的一级机票代理机构</div>
                    <div class="item-more">MORE ></div>
                    <div class="item-btn-more">了解更多 ></div>
                </li>
            </ul>
        </div>
        <div class="main-other">
            <div class="other-yj"></div>
            <div class="other-aboutme">
                <div class="ab-width">
                    <div class="ab-title">关于我们</div>
                    <div class="icon-dot"></div>
                    <div class="ab-content">
                        北京凯行网航空服务有限公司成立于2004年，作为一家专业的机票代理商，与国际国内100余家航空公司建立了良好的销售代理关系。公司秉承诚恳、热情、快捷的服务方式和极具竞争力的价格得到广大客户的信赖，以及社会各界同仁的支持，并与多家留学服务中介机构、科研院所、民间组织、外企商会以及大中型企事业单位签约。
                        凯行网机票服务中心每年的出团率达到数百次，在业内名列前茅，树立了凯行网在业内的品牌形象；您的票量越大，凯行网为您争取到的机位票价将更低。
                    </div>
                    <ul class="ab-list">
                        <li>
                            <div class="ab-num">
                                2004
                                <span>年</span>
                            </div>
                            <div class="ab-txt">
                                公司成立于2004年
                            </div>
                        </li>
                        <li>
                            <div class="ab-num num3">
                                100
                                <span>+</span>
                            </div>
                            <div class="ab-txt">
                                与国际国内100余家航空公司<br/>建立了良好的销售代理关系
                            </div>
                        </li>
                        <li>
                            <div class="ab-num num3">
                                500
                                <span>+</span>
                            </div>
                            <div class="ab-txt">
                                年出团率达到数百次
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-customer">
            <div class="cus-title">客户信任</div>
            <div class="cus-dot"></div>
            <ul class="cus-list">
                <li v-for="(item, i) in imgcount" :key="i"><img :src='"../assets/images/icon-logo/comlogo_" + i + ".png"' alt=""></li>
            </ul>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'

export default {
    name: 'Main',
    data () {
        return {
            uname: '',
            upass: '',
            imgcount: 0
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
    },
    mounted () {
        setTimeout(() => {
            this.imgcount = 46
        }, 5000)
    }
}
</script>

<style lang="scss">
.main-box{
    background-color: #fff;
    .main-banner{
        max-width: 1920px;
        margin: 0 auto;
        height: 621px;
        background: url('../assets/images/main/index-banner.jpg') no-repeat center;
        background-size: auto 100%;
        .banner-txt{
            float: left;
            margin-top: 210px;
            color: #fff;
            .bt-title{
                font-size: 50px;
                line-height: 60px;
            }
            .bt-content{
                margin-top: 30px;
                background: url('../assets/images/main/main_24.png') no-repeat left center;
                background-size: 88px auto;
                padding-left: 100px;
                height: 104px;
                letter-spacing: 2px;
                .bt-24time{
                    font-size: 42px;
                    line-height: 42px;
                }
                .bt-yuejie{
                    margin-top: 18px;
                    font-size: 24px;
                    line-height: 24px;
                }
            }
        }
        .login-form{
            float: right;
            margin-top: 113px;
            background-color: rgba(255,255,255,.3);
            width: 396px;
            height: 380px;
            border-radius: 10px;
            padding: 12px;
            .login-body{
                height: 100%;
                background-color: #fff;
                border-radius: 8px;
                .login-width{
                    width: 302px;
                    margin: 0 auto;
                    padding-top: 42px;
                    .from-title{
                        font-size: 20px;
                        text-align: center;
                        background: url('../assets/images/main/main_dot_login.png') no-repeat center;
                    }
                    .txts{
                        width: 100%;
                        height: 50px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        margin-top: 21px;
                        color: #333;
                        font-size: 16px;
                        text-indent: 0;
                        padding-left: 45px;
                        box-sizing: border-box;
                    }
                    .txt-account{
                        background: url('../assets/images/main/icon-account.png') no-repeat left center;
                        background-size: 23px 25px;
                        background-position-x: 11px;
                        margin-top: 36px;
                    }
                    .txt-pass{
                        background: url('../assets/images/main/icon-pass.png') no-repeat left center;
                        background-size: 20px auto;
                        background-position-x: 13px;
                    }
                    .tip{
                        color: #666;
                        font-size: 14px;
                        line-height: 14px;
                        padding: 26px 0;
                    }
                    .btn{
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        background-color: #0d77d6;
                        border-radius: 4px;
                        font-size: 20px;
                        color: #fff;
                        letter-spacing: 4px;
                    }
                    .btn:active{
                        background-color: #0D68B5;
                    }
                }
            }
        }
    }
    .main-business{
        height: 687px;
        max-width: 1920px;
        margin: 0 auto;
        background: url('../assets/images/main/main_earth.png') no-repeat center;
        background-size: auto 100%;
        .bus-title{
            font-size: 36px;
            color: #000;
            text-align: center;
            line-height: 36px;
            padding-top: 75px;
        }
        .bus-dot{
            height: 14px;
            background: url('../assets/images/main/icon-dot-bus.png') no-repeat center;
            margin-top: 18px;
        }
        .bus-list{
            width: 1200px;
            margin: 46px auto 0 auto;
            display: flex;
            li{
                width: 240px;
                height: 380px;
                padding-top: 52px;
                box-sizing: border-box;
                text-align: center;
                .icon-gj{
                    background: url('../assets/images/main/icon-bus_gj.png') no-repeat center;
                    height: 94px;
                }
                .icon-gn{
                    background: url('../assets/images/main/icon-bus_gn.png') no-repeat center;
                    height: 94px;
                }
                .icon-qy{
                    background: url('../assets/images/main/icon-bus_qy.png') no-repeat center;
                    height: 94px;
                }
                .icon-qz{
                    background: url('../assets/images/main/icon-bus_qz.png') no-repeat center;
                    height: 94px;
                }
                .icon-bx{
                    background: url('../assets/images/main/icon-bus_bx.png') no-repeat center;
                    height: 94px;
                }
                .item-title{
                    font-size: 24px;
                    color: #000;
                    line-height: 24px;
                    margin-top: 36px;
                }
                .item-content{
                    margin-top: 14px;
                    font-size: 14px;
                    line-height: 28px;
                    color: #888;
                }
                .item-more{
                    margin-top: 40px;
                    font-size: 14px;
                    color: #888;
                }
                .item-btn-more{
                    display: none;
                }
            }
            li:hover{
                background-color: #fff;
                border-radius: 4px;
                box-shadow: 0 0 5px rgba(204, 204, 204, .7);
                .item-more{
                    display: none;
                }
                .item-btn-more{
                    display: block;
                    cursor: pointer;
                    margin: 28px auto 0 auto;
                    height: 36px;
                    line-height: 36px;
                    color: #fff;
                    width: 120px;
                    border-radius: 36px;
                    background-color: #0d77d6;
                }
                .item-btn-more:active{
                    background-color: #0D68B5;
                }
            }
        }
    }
    .main-other{
        height: 630px;
        display: flex;
        .other-yj{
            float: left;
            width: 50%;
            height: 100%;
            background: url('../assets/images/main/main_jp.png') no-repeat center;
        }
        .other-aboutme{
            width: 50%;
            float: right;
            height: 100%;
            background: url('../assets/images/main/main_blue.png') no-repeat center;
            color: #fff;
            text-align: center;
            .ab-width{
                max-width: 80%;
                margin: 0 auto;
                .ab-title{
                    padding-top: 110px;
                    height: 36px;
                    font-size: 36px;
                    line-height: 36px;
                }
                .icon-dot{
                    margin-top: 20px;
                    height: 14px;
                    background: url('../assets/images/main/icon-dot-aboutme.png') no-repeat center;
                }
                .ab-content{
                    margin-top: 36px;
                    font-size: 16px;
                    line-height: 28px;
                }
                .ab-list{
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-between;
                    li{
                        float: left;
                        .ab-num{
                            font-size: 62px;
                            height: 62px;
                            line-height: 62px;
                            position: relative;
                            span{
                                display: block;
                                position: absolute;
                                top: 8px;
                                right: -20px;
                                font-size: 14px;
                                height: 14px;
                                line-height: 14px;
                            }
                        }
                        .num3{
                            width: 110px;
                            margin: 0 auto;
                            span{
                                font-size: 18px;
                            }
                        }
                        .ab-txt{
                            margin-top: 20px;
                            font-size: 14px;
                            font-family: '微软雅黑', sans-serif;
                        }
                    }
                }
            }
        }
    }
    .main-customer{
        padding: 100px 0;
        .cus-title{
            font-size: 36px;
            color: #000;
            text-align: center;
            line-height: 36px;
        }
        .cus-dot{
            height: 14px;
            background: url('../assets/images/main/icon-dot-bus.png') no-repeat center;
            margin-top: 18px;
        }
        .cus-list{
            display: flex;
            flex-wrap: wrap;
            padding: 40px 20px;
            li{
                float: left;
                img{
                    display: block;
                    width: 142px;
                }
            }
        }
    }
}
</style>