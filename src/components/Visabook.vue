<template>
    <div class="visabook-box">
        <Header></Header>
        <div class="center" style="min-width: 1200px;">
            <div class="title">
                <h3>预订产品信息</h3>
                <img :src="vinfo.ImgUrl" alt="">
                <h4>{{vinfo.name}}</h4>
                <a @click="toVisa">[重新选择签证]</a>
                <span>办理时间:</span>
                <span class="time">{{vinfo.BLSJ}}</span>
                <span>有效期:</span>
                <span class="validity">{{vinfo.YXQ}}</span>
                <span>最多停留:</span>
                <span class="stay">{{vinfo.TLQ}}</span>
                <span>邀请函:</span>
                <span class="invitation">{{vinfo.YQH}}</span>
                <span>签证面试:</span>
                <span class="interview">{{vinfo.MS}}</span>
                <span>入境规定:</span>
                <span class="invisa">{{vinfo.RJGD}}</span>
                <p>受理范围:<b>{{vinfo.SLFW}}</b></p>
                <div class="dasht"></div>
                <div class="dashb"></div>
                <div class="price">价格：<i>{{vinfo.price}}</i></div>
            </div>
            <div class="fill">
                <h3>签证人申请信息</h3>
                <h5> 请准确填写申请人信息，标注红色星号的为必填项</h5>
                <div class="fillcontext" v-for="(item, i) in persons" :key="i">
                    <div class="btn-close" @click="delperson(i)" v-if="i > 0"><img :src='IMGW_URL + "visabook/btn-close.png"' alt=""></div>
                    <div class="list">
                        <div class="listl"><i>*</i>英文姓名:</div>
                        <div class="listr">
                            <input type="text" name="YWXM" v-model="item.name" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>护照号码:</div>
                        <div class="listr">
                            <input type="text" name="HZHM" v-model="item.sport" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>护照有效期:</div>
                        <div class="listr">
                            <input type="text" name="HZYXQ" v-model="item.yxq" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>出发时间:</div>
                        <div class="listr">
                            <input type="text" name="CFSJ" v-model="item.stime" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>性别:</div>
                        <div class="listr">
                            <input checked="checked" name="mel" type="radio" class="sex" @click="item.sex = '男士'">先生
                            <input name="mel" type="radio" class="sex" @click="item.sex = '女士'">女士
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>出生日期:</div>
                        <div class="listr">
                            <input type="text" name="CSRQ" v-model="item.csrq" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl"><i>*</i>护照类型:</div>
                        <div class="listr">
                            <input type="text" name="HZLX" v-model="item.hzlx" maxlength="50">
                        </div>
                    </div>
                    <div class="list">
                        <div class="listl">停留期限:</div>
                        <div class="listr">
                            <input type="text" name="TLQX" v-model="item.tlqx" maxlength="50">
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn">
                <button @click="addPerson">+添加申请人</button>
            </div>
            <div class="remarks">
                <img :src='IMGW_URL + "visabook/remarks_01.png"' alt="">
                <div class="remarks_text">
                    <textarea name="" id="" cols="30" rows="1" class="BZXX" v-model="orderbody.content" placeholder="｜如果您其他备注要求请在此处填写"></textarea>
                </div>
            </div>
            <div class="pay">
                <h3>选择支付方式</h3>
                <div class="selectBank">
                    <div class="selectitle" @click="isShowWangyin = !isShowWangyin">
                        <img :src='IMGW_URL + "visabook/makevisabottom.png"' :class='isShowWangyin?"active":""' alt="">
                        <h3>网站银行支付</h3>
                        <h5>(银行卡支付,支持大额支付,需开通网银)</h5>
                    </div>
                    <div class="seleccontext" v-show="isShowWangyin">
                        <ul>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '工商银行'">
                                <img :src='IMGW_URL + "visabook/gongshang.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '招商银行'">
                                <img :src='IMGW_URL + "visabook/zhaoshang.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '农业银行'">
                                <img :src='IMGW_URL + "visabook/nongye.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '建设银行'">
                                <img :src='IMGW_URL + "visabook/jianshe.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '北京银行'">
                                <img :src='IMGW_URL + "visabook/beijing.png"' alt="">
                            </li>
                            <li class="mgr0">
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '交通银行'">
                                <img :src='IMGW_URL + "visabook/jiaotong.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '兴业银行'">
                                <img :src='IMGW_URL + "visabook/xingye.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '南京银行'">
                                <img :src='IMGW_URL + "visabook/nanjing.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '民生银行'">
                                <img :src='IMGW_URL + "visabook/minsheng.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '光大银行'">
                                <img :src='IMGW_URL + "visabook/guangda.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '中国银行'">
                                <img :src='IMGW_URL + "visabook/zhongguo.png"' alt="">
                            </li>
                            <li class="mgr0">
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '平安银行'">
                                <img :src='IMGW_URL + "visabook/pingan.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '中信银行'">
                                <img :src='IMGW_URL + "visabook/zhongxin.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '广发银行'">
                                <img :src='IMGW_URL + "visabook/guangfa.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '上海浦东发展银行'">
                                <img :src='IMGW_URL + "visabook/shanghaipudong.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '中国邮政储蓄'">
                                <img :src='IMGW_URL + "visabook/youzheng.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '上海银行'">
                                <img :src='IMGW_URL + "visabook/shanghai.png"' alt="">
                            </li>
                            <li class="mgr0">
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '华夏银行'">
                                <img :src='IMGW_URL + "visabook/huaxia.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '宁波银行'">
                                <img :src='IMGW_URL + "visabook/ningbo.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '深圳发展银行'">
                                <img :src='IMGW_URL + "visabook/shenzhne.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '浙商银行'">
                                <img :src='IMGW_URL + "visabook/zheshang.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '东亚银行'">
                                <img :src='IMGW_URL + "visabook/dongya.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '渤海银行'">
                                <img :src='IMGW_URL + "visabook/bohai.png"' alt="">
                            </li>
                            <li class="mgr0">
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '北京农村商业银行'">>
                                <img :src='IMGW_URL + "visabook/nongshang.png"' alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="selectitle" @click="isShowXinyong = !isShowXinyong">
                        <img :src='IMGW_URL + "visabook/makevisabottom.png"' :class='isShowXinyong?"active":""' alt="">
                        <h3>信用卡支付</h3>
                    </div>
                    <div class="seleccontext" v-show="isShowXinyong">
                        <ul>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '工商银行信用卡'">
                                <img :src='IMGW_URL + "visabook/gongshang.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '招商银行信用卡'">
                                <img :src='IMGW_URL + "visabook/zhaoshang.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '农业银行信用卡'">
                                <img :src='IMGW_URL + "visabook/nongye.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '建设银行信用卡'">
                                <img :src='IMGW_URL + "visabook/jianshe.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '北京银行信用卡'">
                                <img :src='IMGW_URL + "visabook/beijing.png"' alt="">
                            </li>
                            <li class="mgr0">
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '广发银行信用卡'">
                                <img :src='IMGW_URL + "visabook/guangfa.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '兴业银行信用卡'">
                                <img :src='IMGW_URL + "visabook/xingye.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '平安银行信用卡'">
                                <img :src='IMGW_URL + "visabook/pingan.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '民生银行信用卡'">
                                <img :src='IMGW_URL + "visabook/minsheng.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '中国银行信用卡'">
                                <img :src='IMGW_URL + "visabook/zhongguo.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '中信银行信用卡'">
                                <img :src='IMGW_URL + "visabook/zhongxin.png"' alt="">
                            </li>
                        </ul>
                    </div>
                    <div class="selectitle" @click="isShowOther = !isShowOther">
                        <img :src='IMGW_URL + "visabook/makevisabottom.png"' :class='isShowOther?"active":""' alt="">
                        <h3>其他支付</h3>
                        <h5>(奥斯卡支付,现金支付,银行汇款)</h5>
                    </div>
                    <div class="seleccontext" v-show="isShowOther">
                        <ul>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '奥斯卡支付'">
                                <img :src='IMGW_URL + "visabook/aosika.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '银行汇款'">
                                <img :src='IMGW_URL + "visabook/huikuan.png"' alt="">
                            </li>
                            <li>
                                <input type="radio" name="selecBank" class="selecBank" @click="orderbody.payType = '现金支付'">
                                <img :src='IMGW_URL + "visabook/xianjin.png"' alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="makeinvoice">
                <h3>开具发票</h3>
                <div class="invoiceselec">
                    <div :class='"need" + (isfapiao?"":" active")' @click="isfapiao = false">不需要</div>
                    <div :class='"need" + (isfapiao?" active":"")' @click="isfapiao = true">需要</div>
                </div>
                <div class="invoiceselectitle">
                </div>
                <div class="invoiceselectitle" v-if="isfapiao">
                    <span>发票抬头</span>
                    <input type="text" v-model="orderbody.invoice">
                </div>
            </div>
            <div class="sendtyle">
                <h3>寄返方式</h3>
                <div class="sendlist">
                    <div :class='"sendlisttitle" + (sendType == 1?" active":"")' @click="sendType = 1">自取签证</div>
                    <div class="sendlistcontext" v-if="sendType==1">
                        <p>周一至周五早9点至12点，下午1点至5点半，周末请先电话联系</p>
                        <p>北京市东城区东直门内南大街华普花园C座906室(东四十条地铁“A”出口往西北角100米) <a @click="toMap">查看地图标注</a></p>
                    </div>
                </div>
                <div class="sendlist">
                    <div :class='"sendlisttitle" + (sendType == 2?" active":"")' @click="sendType = 2">快递邮寄</div>
                    <div class="sendlistcontext KDYJ" v-if="sendType==2">
                        <ul>
                            <li>
                                <span>邮寄地址:</span>
                                <input type="text" v-model="orderbody.sendaddress">
                            </li>
                            <li>
                                <span>联系人:</span>
                                <input type="text" v-model="orderbody.sendlinkname">
                            </li>
                            <li>
                                <span>联系电话:</span>
                                <input type="text" v-model="orderbody.sendlinkphone">
                            </li>
                            <li>
                                <span>备注信息:</span>
                                <input type="text" v-model="orderbody.sendother">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="sendlist">
                    <div :class='"sendlisttitle" + (sendType == 3?" active":"")' @click="sendType = 3">市内配送(限北京市五环内)</div>
                    <div class="sendlistcontext SNPS" v-if="sendType==3">
                        <ul>
                            <li>
                                <span>邮寄地址:</span>
                                <input type="text" v-model="orderbody.sendaddress">
                            </li>
                            <li>
                                <span>联系人:</span>
                                <input type="text" v-model="orderbody.sendlinkname">
                            </li>
                            <li>
                                <span>联系电话:</span>
                                <input type="text" v-model="orderbody.sendlinkphone">
                            </li>
                            <li>
                                <span>备注信息:</span>
                                <input type="text" v-model="orderbody.sendother">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="contactp">
                <h3>联系人信息</h3>
                <h5>请准确填写联系人信息，关于办理签证相关事宜将与您及时联系</h5>
                <div class="contactpcontext">
                    <div class="contactplist">
                        <div class="contactplistl"><i>*</i>手机号码:</div>
                        <div class="contactplistr">
                            <input type="text" v-model="orderbody.booktel">
                        </div>
                    </div>
                    <div class="contactplist">
                        <div class="contactplistl"><i>*</i>姓名:</div>
                        <div class="contactplistr">
                            <input type="text" v-model="orderbody.bookname">
                        </div>
                    </div>
                    <div class="contactplist">
                        <div class="contactplistl"><i>*</i>电子邮箱:</div>
                        <div class="contactplistr">
                            <input type="text" v-model="orderbody.bookemail">
                        </div>
                    </div>
                    <div class="contactplist">
                        <div class="contactplistl"><i>*</i>联系电话:</div>
                        <div class="contactplistr">
                            <input type="text" v-model="orderbody.bookphone">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="submit" @click="submit">提交订单</div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'
export default {
    name: 'Visabook',
    data () {
        return {
            vinfo: {},
            isShowWangyin: false,
            isShowXinyong: false,
            isShowOther: false,
            isfapiao: true,
            sendType: 1,
            persons: [],
            orderbody: {
                content: '',
                payType: '',
                invoice: '',
                sendaddress: '',
                sendlinkname: '',
                sendlinkphone: '',
                sendother: '',
                booktel: '',
                bookname: '',
                bookemail: '',
                bookphone: ''
            }
        }
    },
    components: {
        Header,
        Footer
    },
    methods : {
        book (v) {
            this.$router.push({
                path: '/visabook?name=' + v
            })
        },
        toMap () {
            this.$router.push({
                path: '/linkme'
            })
        },
        toVisa () {
            this.$router.push({
                path: '/visa'
            })
        },
        addPerson () {
            this.persons.push({
                name: '',
                sport: '',
                yxq: '',
                stime: '',
                sex: '',
                csrq: '',
                hzlx: '',
                tlqx: ''
            })
        },
        delperson (i) {
            this.persons.splice(i, 1)
        },
        submit () {
            var YJFS = ''
            if (this.sendType == 1) {
                YJFS = '自取签证'
            } else {
                if (this.sendType == 2) {
                    YJFS = '快递邮寄,'
                } else if (this.sendType == 3) {
                    YJFS = '市内配送(限北京市五环内),'
                }
                YJFS += '邮寄地址:'+this.orderbody.sendaddress
                YJFS += ',联系人:'+this.orderbody.sendlinkname
                YJFS += ',联系电话:'+this.orderbody.sendlinkphone
                YJFS += ',备注信息:'+this.orderbody.sendother
            }
            var SQRname = '',SQRpassport='',SQRyxq='',SQRgotime='',SQRsex='',SQRbirth='',passType='',TLQ=''
            var p = this.persons
            for(var i=0; i<p.length; i++) {
                SQRname += p[i].name + '|'
                SQRpassport += p[i].sport + '|'
                SQRyxq += p[i].yxq + '|'
                SQRgotime += p[i].stime + '|'
                SQRsex += p[i].sex + '|'
                SQRbirth += p[i].csrq + '|'
                passType += p[i].hzlx + '|'
                TLQ += p[i].tlqx + '|'
            }
            var params = {
                "visaName":this.vinfo.name,
                "price":this.vinfo.price,
                "SQRname": SQRname,
                "SQRpassport": SQRpassport,
                "SQRyxq": SQRyxq,
                "SQRgotime": SQRgotime,
                "SQRsex": SQRsex,
                "SQRbirth": SQRbirth,
                "passType": passType,
                "TLQ": TLQ,
                "payType": this.orderbody.payType,
                "invoice": this.orderbody.invoice || '不需要',
                "YJFS": YJFS,
                "LXRphone": this.orderbody.booktel,
                "LXRname": this.orderbody.bookname,
                "LXRemail": this.orderbody.bookemail,
                "LXRtel": this.orderbody.bookphone,
                "BZXX": this.orderbody.content
            }
            this.$http.get(this.uriw + '/AddMakeVisaServlet', {
                params: params
            }).then(res => {
                if (res.data == '1') {
                    this.MessageBox('提交成功')
                } else {
                    this.MessageBox('提交失败，请检查数据！')
                }
            })
        }
    },
    created () {
        let n = this.$route.query.name
        this.$http.get(this.uriw + '/ListVisaContentByNameServlet', {
            params: {
                name: n
            }
        }).then(res => {
            console.log(res)
            //res.data
            this.vinfo = res.data[0]
            this.addPerson()
        })
    }
}
</script>

<style lang="scss">
.visabook-box{
    .center {
        width: 1200px;
        margin: 70px auto 18px;
        box-shadow: 0 0 25px 25px #eae9e9;
        border-radius: 8px;
    }

    .title {
        height: 305px;
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        padding-left: 170px;
        position: relative;
        padding-top: 105px;
        padding-right: 382px;
    }

    .title:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }

    .title h3 {
        font-size: 21px;
        color: #000;
        line-height: 21px;
        position: absolute;
        left: 20px;
        top: 15px;
        margin: 0;
    }

    .title img {
        display: block;
        position: absolute;
        left: 50px;
        top: 110px;
    }

    .title h4 {
        font-size: 25px;
        color: #000;
        line-height: 25px;
        display: block;
        margin: 0
    }

    .title a {
        font-size: 16px;
        color: #ff0000;
        line-height: 16px;
        position: absolute;
        left: 544px;
        top: 113px;
        font-weight: bold;
        cursor: pointer;
    }

    .title span {
        float: left;
        color: #666666;
        font-size: 17px;
        line-height: 21px;
        margin-top: 15px;
        font-family: "苹方";
    }

    .title p {
        font-size: 17px;
        color: #666666;
        line-height: 24px;
        margin: 0;
        margin-top: 17px;
        float: left;
        padding-top: 15px;
        padding-bottom: 15px;
        position: absolute;
        left: 170px;
        top:215px;
        width: 620px;
    }
    .title b{
        font-size: 15px;
        padding-left: 10px;
    }

    .validity,
    .stay,
    .time,
    .invitation,
    .interview,
    .acceptance,
    .invisa {
        padding-left: 13px;
        padding-right: 37px;
    }

    .dasht {
        width: 848px;
        height: 1px;
        border-top: 1px dashed #e5e5e5;
        position: absolute;
        left: 170px;
        bottom: 190px;
    }

    .dashb {
        width: 848px;
        height: 1px;
        border-top: 1px dashed #e5e5e5;
        position: absolute;
        left: 170px;
        bottom: 80px;
    }

    .price {
        height: 81px;
        line-height: 81px;
        font-size: 17px;
        margin-top: 15px;
        float: left;
        position: absolute;
        left: 170px;
        top:310px;
    }

    .price i {
        color: #ff0000;
        font-weight: bold;
    }

    .fill {
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        position: relative;
        overflow: hidden;
    }

    .fill h3 {
        font-size: 21px;
        color: #000;
        line-height: 21px;
        margin-left: 20px;
        margin-right: 20px;
        float: left;
        margin-top: 14px;
    }

    .fill h5 {
        font-size: 15px;
        color: #666;
        line-height: 15px;
        float: left;
        margin-top: 20px;
    }

    .fill:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }

    .fillcontext {
        width: 60%;
        float: left;
        padding-top: 30px;
        padding-bottom: 30px;
        position: relative;
    }

    .list {
        width: 100%;
        height: 55px;
    }

    .listl {
        float: left;
        width: 147px;
        text-align: right;
        height: 100%;
        line-height: 55px;
    }

    .listl i {
        color: red;
        padding-right: 5px;
    }

    .listr {
        width: 244px;
        height: 34px;
        float: left;
        border-radius: 3px;
        overflow: hidden;
        margin-left: 20px;
        margin-top: 10px;
    }

    .listr input {
        width: 230px;
        padding: 0;
        line-height: 34px;
        padding-left: 10px;
        height: 30px;
        outline: none;
    }

    .listr input.sex {
        width: 12px;
        height: 12px;
        margin-top: 10px;
    }

    .btn {
        width: 132px;
        height: 32px;
        border-radius: 3px;
        overflow: hidden;
        border: solid 1px #f00e0e;
        margin-top: 12px;
        margin-left: 35px;
    }

    .btn button {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        line-height: 32px;
        color: #000;
        text-align: center;
        background-color: #f0f0f0;
        cursor: pointer;
    }


    .pay {
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        position: relative;
        overflow: hidden;
    }

    .pay h3 {
        font-size: 21px;
        color: #000;
        line-height: 21px;
        margin-left: 20px;
        margin-right: 20px;
        float: left;
        margin-top: 14px;
    }

    .pay:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }

    .selectBank {
        width: 1160px;
        margin: 70px auto 0;
    }

    .selectitle {
        height: 56px;
        padding-left: 54px;
        position: relative;
        cursor: pointer;
    }

    .selectitle img {
        position: absolute;
        display: block;
        left: 20px;
        top: 23px;
        transition: transform 0.3s linear;
    }
    .selectitle img.active{
        transform: rotate(90deg);
        -ms-transform: rotate(90deg);
        /* IE 9 */
        -moz-transform: rotate(90deg);
        /* Firefox */
        -webkit-transform: rotate(90deg);
        /* Safari and Chrome */
        -o-transform: rotate(90deg);
        /* Opera */
    }
    .selectitle h3 {
        font-size: 15px;
        line-height: 56px;
        color: #131313;
        float: left;
        margin: 0;
    }

    .selectitle h5 {
        float: left;
        font-size: 15px;
        color: #b1b1b1;
        margin: 0;
        line-height: 56px;
    }

    .seleccontext {
        padding-left: 54px;
    }

    .seleccontext ul {
        padding: 0;
        overflow: hidden;
        width: 100%;
        margin: 0;
        margin-right: -50px;
    }

    .seleccontext ul li {
        list-style-type: none;
        float: left;
        height: 34px;
        margin-right: 40px;
        margin-bottom: 14px;
    }

    .seleccontext ul li.mgr0 {
        margin-right: 0;
    }

    .seleccontext ul li input {
        float: left;
        margin-top: 11px;
        margin-right: 5px;
        cursor: pointer;
    }

    .seleccontext ul li img {
        float: left;
        display: block;
    }
    .makeinvoice{
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        position: relative;
        overflow: hidden;
        height: 150px;
    }
    .makeinvoice h3{
        font-size: 21px;
        color: #000;
        line-height: 21px;
        margin-left: 20px;
        margin-right: 20px;
        float: left;
        margin-top: 14px;
    }
    .pamakeinvoicey:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }
    .invoiceselec{
        margin-top: 70px;
        padding-left: 54px;
        overflow: hidden;
    }
    .need{
        width: 80px;
        height: 20px;
        line-height: 20px;
        font-size: 15px;
        color: #131313;
        text-align: center;
        margin-right:44px; 
        float: left;
        background-image: url(../assets/images/visabook/smallblack.png);
        background-repeat: no-repeat;
        background-position: left center;
        cursor: pointer;
    }
    .need.active{
        background-image: url(../assets/images/visabook/smallred.png);
    }
    .invoiceselectitle{
        height: 30px;
        position: absolute;
        left: 86px;
        top:109px;
    }
    .invoiceselectitle span{
        float: left;
        font-size: 14px;
        color: #666666;
        line-height: 30px;
        margin-right: 18px;
    }
    .invoiceselectitle input{
        width: 234px;
        height: 26px;
        outline: none;
        float: left;
        padding-left: 10px;
    }
    .invoiceselectitle.active{
        display: block;
    }
    .sendtyle{
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        position: relative;
        overflow: hidden;
    }
    .sendtyle h3{
        font-size: 21px;
        color: #000;
        line-height: 21px;
        margin-left: 20px;
        margin-right: 20px;
        margin-top: 14px;
        margin-bottom: 40px;
    }
    .sendtyle:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }
    .sendlist{
        margin-top: 10px;
        margin-left: 50px;
    }
    .sendlisttitle{
        line-height: 20px;
        font-size: 15px;
        color: #131313;
        text-align: left;
        background-image: url(../assets/images/visabook/smallblack.png);
        background-repeat: no-repeat;
        background-position: left center;
        cursor: pointer;

        height: 20px;
        padding-left: 22px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .sendlistcontext{
        margin-left: 36px;
    }
    .sendlistcontext p{
        font-size: 14px;
        color:#666666;
        line-height: 23px;
        margin: 0;
    }
    .sendlistcontext a{
        font-size: 14px;
        color:#f00000;
        line-height: 23px;
        margin: 0;
    }
    .sendlistcontext ul{
        margin: 0;
        padding: 0;
    }
    .sendlistcontext ul li{
        display: block;
        height: 25px;
        margin: 5px 0;
    }
    .sendlistcontext ul li span{
        float: left;
        font-size: 14px;
        color: #666666;
        line-height: 14px;
        margin-top: 10px;
    }
    .sendlistcontext ul li input{
        width: 445px;
        height: 23px;
        border: none;
        outline: none;
        border-bottom: dashed 1px #dcdcdc;
        float: left;
        margin-left: 10px;
        padding-left: 10px;
    }
    .sendlisttitle.active{
        background-image: url(../assets/images/visabook/smallred.png);
    }
    .contactp{
        background-color: #fff;
        border-radius: 8px;
        border: solid 3px #e2e2e2;
        position: relative;
        overflow: hidden;
    }
    .contactp h3{
    font-size: 21px;
        color: #000;
        line-height: 21px;
        margin-left: 20px;
        margin-right: 20px;
        float: left;
        margin-top: 14px;

    }
    .contactp h5{
        float: left;
        font-size: 15px;
        color: #b1b1b1;
        margin: 0;
        line-height: 56px;
    }
    .contactp:after {
        content: "";
        width: 1160px;
        height: 1px;
        border-top: 1px solid #dcdcdc;
        position: absolute;
        left: 20px;
        top: 50px;
    }
    .contactpcontext {
        width: 60%;
        float: left;
        padding-top: 30px;
        padding-bottom: 30px;
    }

    .contactplist {
        width: 100%;
        height: 55px;
    }

    .contactplistl {
        float: left;
        width: 147px;
        text-align: right;
        height: 100%;
        line-height: 55px;
    }

    .contactplistl i {
        color: red;
        padding-right: 5px;
    }

    .contactplistr {
        width: 244px;
        height: 34px;
        float: left;
        border-radius: 3px;
        overflow: hidden;
        margin-left: 20px;
        margin-top: 10px;
    }

    .contactplistr input {
        width: 230px;
        padding: 0;
        line-height: 34px;
        padding-left: 10px;
        height: 30px;
        outline: none;
    }

    .contactplistr input.sex {
        width: 12px;
        height: 12px;
        margin-top: 10px;
    }
    .submit{
        width: 654px;
        height: 45px;
        border-radius: 3px;
        background-color: #f00000;
        margin: 30px auto 70px;
        color: #fff;
        text-align: center;
        line-height: 45px;
        font-size: 19px;
        cursor: pointer;
    }
    .btn-close{
        display: block;
        position: absolute;
        width: 30px;
        height: 30px;
        background-color: #f00000;
        font-size: 0;
        left: 0px;
        top:45px;
        cursor: pointer;
    }
    .remarks{
        margin-top: 48px;
        width: 710px;
        background-color: rgba(255,255,204,0.7);
        padding-bottom: 35px;
        margin-bottom: 20px;
        position: relative;
    }
    .remarks:after{
        content: "";
        position: absolute;
        left: 58px;
        top:60px;
        width: 590px;
        height: 1px;
        border-bottom: dashed 1px #ccc;
    }
    .remarks:before{
        content: "";
        position: absolute;
        left: 58px;
        top:100px;
        width: 590px;
        height: 1px;
        border-bottom: dashed 1px #ccc;
    }
    .remarks>div{
        width: 590px;
        margin: 0 auto;
        line-height: 56px;
        font-size: 14px;
        padding-top: 20px;
    }
    .remarks>img{
        vertical-align: middle;
        position: absolute;
        left: 30px;
        top: 33px;
    }
    .remarks_text>textarea{
        height: 80px;
        border: 0;
        width: 100%;
        background-color: transparent;
        outline: none;
        text-align: left;
        resize: none;
        line-height: 40px;
    }

}
</style>