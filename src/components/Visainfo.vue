<template>
    <div class="visainfo-box">
        <Header></Header>
        <div class="center">
            <div class="title">
                <img :src="vinfo.ImgUrl" alt="">
                <h3>{{vinfo.name}}</h3>
                <p>办理费用：<i>{{vinfo.price}}</i></p>
                <span>有效期:</span>
                <span class="validity">{{vinfo.YXQ}}</span>
                <span>最多停留:</span>
                <span class="stay">{{vinfo.TLQ}}</span>
                <span>办理时间:</span>
                <span class="time">{{vinfo.BLSJ}}</span>
                <span>邀请函:</span>
                <span class="invitation">{{vinfo.YQH}}</span>
                <span>签证面试:</span>
                <span class="interview">{{vinfo.MS}}</span>
                <span>入境规定:</span>
                <span class="invisa">{{vinfo.RJGD}}</span>
                <button @click="book(vinfo.name)">申请办理</button>
            </div>
            <div class="context">
                <ul>
                    <li>
                        <div class="lil">护照</div>
                        <div class="lir">
                            <p>（1）行程结束后还有半年以上有效期</p>
                            <p>（2）末页须有持证人中文亲笔签名（不能用铅笔）</p>
                            <p>（3）至少留有连续3页空白签证页（不是备注页）</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">照片</div>
                        <div class="lir">
                            <p>提供近半年内拍摄的大小为3.5cm x 4.5cm的白底光面彩照4张</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">身份证</div>
                        <div class="lir">
                            <p>提供第二代有效身份证正反面复印件</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">户口本</div>
                        <div class="lir">
                            <p>（1）户口本原件和复印件，若配偶或子女的信息不在同一户口本上，还需提交配偶和子女的户口本原件和复印件</p>
                            <p>（2）如果是集体户口，请提供集体户口首页复印件以及本人页的原件</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">暂住证或居住证</div>
                        <div class="lir">
                            <p>非北京领区的签证申请人，需要提供在北京领区工作或居住半年以上的暂住证，或者是当地派出所出具的居住证明</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">结婚证</div>
                        <div class="lir">
                            <p>如已婚，请提供夫妻二人的结婚证的原件和复印件</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">单位在职证明</div>
                        <div class="lir">
                            <p>需要用单位正式抬头纸打印，内容包括：</p>
                            <p>（1）申请人的姓名、出生日期、护照号码</p>
                            <p>（2）申请人的职位、入职时间、工资收入</p>
                            <p>（3）申请人的赴加目的和期限，单位准假</p>
                            <p>（4）单位担保申请人按期回国，遵守当地法律和法规</p>
                            <p>（5）单位领导姓名、职位、签字</p>
                            <p>（6）单位盖章，有单位名称、地址、电话和传真</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">营业执照</div>
                        <div class="lir">
                            <p>公司营业执照复印件，有年检记录，单位盖上公章</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">资产证明</div>
                        <div class="lir">
                            <p>（1）提供至少10万元的存款证明</p>
                            <p>（2）工资卡正反面复印件，以及最近1年的的银行对账单，加盖银行公章</p>
                            <p>（3）1年以上个人所得税税单原件和复印件，地税局盖章</p>
                            <p>（4）1年以上信用卡对账单，以及信用卡正反面复印件</p>
                            <p>（5）其他房本、车本、基金、股票交割单的原件和复印件</p>
                        </div>
                    </li>
                    <li>
                        <div class="lil">未成年人</div>
                        <div class="lir">
                            <p>（1）孩子与父母三方的亲属关系公证书</p>
                            <p>（2）若父母双方只有一方陪同，还需另外出具父母不去的一方同意另一方带孩子出去的公证书</p>
                            <p>（3）若是双方都不陪同，则还需出具双方的同意书的公证书</p>
                        </div>
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
    name: 'Visainfo',
    data () {
        return {
            vinfo: {}
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
        })
    }
}
</script>

<style lang="scss">
.visainfo-box{
    .head-wrap {
        background-color: #fff;
    }

    .center {
        width: 1200px;
        margin: 70px auto 18px;
        box-shadow: 0 0 6px 6px #eae9e9;
        border-radius: 8px;
    }

    .title {
        padding-left: 170px;
        height: 289px;
        box-shadow: 0 0 6px 6px #eae9e9;
        background-color: #fff;
        border-radius: 8px;
        position: relative;
    }

    .title h3 {
        font-family: "苹方";
        font-size: 25px;
        color: #000;
        display: block;
        margin: 0;
        line-height: 25px;
        padding-top: 60px;
    }

    .title p {
        display: block;
        font-size: 23px;
        line-height: 23px;
        margin: 0;
        margin-top: 22px;
        color: #666666;
    }

    .title i {
        color: #f00000;
        font-style: normal;
    }

    .title span {
        float: left;
        color: #666666;
        font-size: 17px;
        line-height: 21px;
        margin-top: 23px;
        font-family: "苹方";
    }

    .validity,
    .stay,
    .time,
    .invitation,
    .interview,
    .acceptance,
    .invisa {
        padding-left: 15px;
        padding-right: 31px;
    }

    .title button {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 3px;
        background-color: #f00000;
        outline: none;
        border: none;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
        display: block;
        position: absolute;
        bottom: 58px;
        left: 170px;
    }

    .title img {
        display: block;
        position: absolute;
        left: 50px;
        top: 67px;
    }

    .context {
        width: 100%;
        background-color: #fcfcfc;
    }

    .context ul {
        width: 1132px;
        overflow: hidden;
        margin: 0 auto;
    }

    .context ul li {
        border-bottom: dashed 1px #e5e5e5;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 230px;
        list-style-type: none;
        overflow: hidden;
        position: relative;
    }

    .lil {
        position: absolute;
        left: 0px;
        top: 50%;
        margin-top: -14px;
        font-size: 21px;
        line-height: 28px;
        height: 28px;
        color: #000;
        width: 200px;
        text-align: right;
    }

    .lir {
        float: left;
        margin-left: 57px;
    }

    .lir p {
        font-size: 16px;
        line-height: 32px;
        color: #666666;
        margin: 0;
        padding: 0;
    }
}
</style>