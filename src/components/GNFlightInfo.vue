<template>
    <div class="gnflightinfo-box">
        <Header></Header>
        <Menu t="order"></Menu>
        <ProgressBar p="3"></ProgressBar>
                
        <div class="person-box-body">
            <div class="boxwidth airinfo-box">
                <div class="airinfo-box-title"><span class="title-icon goback">直飞</span></div>
                <div class="airinfo-box-trip">
                    <div class="trip-title">
                        <span class="trip-lab">去程</span>
                        <div class="trip-timecity"><span>{{flightinfo.startTime}}</span><span>{{flightinfo.startCity}}</span><span class="ticon"></span><span>{{flightinfo.endCity}}</span></div>                    
                    </div>
                    <ul class="trip-info">
                        <li>
                            <div class="air-logo"><img :src="'/icons/' + (flight.flightNo.substr(0,2)) + '.gif'" alt="LOGO"></div>
                            <div class="air-company">{{flight.airCompanyName}} {{flight.flightNo}} {{flight.planeType}}</div>
                            <div class="air-port">
                                <div><span class="air-port-time">{{flight.depTime.substr(0,2) + ':' + flight.depTime.substr(2,2)}}</span> <span>{{flight.sAirPort}}{{flight.orgJetquay || ''}}</span></div>
                                <div class="air-port-icon"></div>
                                <div><span class="air-port-time">{{flight.arriTime.substr(0,2) + ':' + flight.arriTime.substr(2,2)}}</span> <span>{{flight.eAirPort}}{{flight.orgJetquay || ''}}</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="air-rule-notice-price">
                    <span class="rule">
                        退改签规定
                        <div class="content-layer" v-html="tgqgd"></div>
                    </span>
                    <span class="notice">购票须知
                        <div class="content-layer">婴儿不能单独订票，一位成人最多限带两名婴儿，儿童必须有成人陪伴。如无成人陪伴 请在订单里备注。</div>
                    </span>
                    <span class="price">机建+燃油<span>{{flight.airportTax}}+{{flight.fuelTax}}</span></span>
                    <span class="price">服务费<span>0</span></span>
                    <span class="price">票价<span>{{seat.parPrice + flight.airportTax}}</span></span>
                </div>
            </div>

            <div class="boxwidth whiteperson-box">
                <div class="whiteperson-box-title">填写乘机人信息<span>请准确填写乘客信息,乘客姓名必须是拼音或英文</span></div>
                <div class="person-from person-gj person-gn">
                    <ul>
                        <li v-for="(item, i) in person" :key="i">
                            <div class="cjr">
                                <span>乘客姓名：</span>
                                <el-select v-model="item.type" placeholder="成人">
                                    <el-option v-for="p in personType" :key="p" :label="p" :value="p"></el-option>
                                </el-select>
                                <input type="text" v-model="item.name" maxlength="50" />
                                <i class="icon-close" v-if="person.length > 1" @click="delPerson(i, item.id)"></i>
                            </div>
                            <div class="csrq">
                                <span>证件信息：</span>
                                <el-select v-model="item.cardtype" value-key="value" @change="changeCardType(item)" placeholder="身份证">
                                    <el-option v-for="t in cardType" :key="t.key" :label="t.value" :value="t.key"></el-option>
                                </el-select>
                                <input type="text" v-model="item.idcard" maxlength="50" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="cjrphone">
                                <span>乘机人手机：</span>
                                <input type="text" v-model="item.phone" maxlength="50" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="jjlxrphone">
                                <span>紧急人手机：</span>
                                <input type="text" v-model="item.jjphone" maxlength="50" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="safe">
                                <span>购买保险：</span>
                                <div class="form-rd">
                                    <el-radio v-model="item.safenum" label="1">是</el-radio>
                                    <el-radio v-model="item.safenum" label="0">否</el-radio>
                                    <span class="safe-price">保险20元</span>
                                </div>
                                <div class="formnotice"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="btn-all">
                        <label class="pubbtn btn-addpreson" @click="addPerson">+ 乘机人</label>
                        <label class="btn-person">常用乘机人</label>
                    </div>
                    <div class="div-persearch">
                        <input type="text" v-model="searchKey" class="txt-search" placeholder="请输入乘机人姓名或手机号" /> 
                        <div class="btn" @click="searchPer">搜索</div>
                    </div>
                    <div class="moreperson-box" v-infinite-scroll="loadMorePer" infinite-scroll-immediate="false">
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>乘机人姓名</td>
                                    <td>证件号码</td>
                                    <td>乘机人手机</td>
                                    <td>紧急人手机</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(p, i) in PersonList">
                                    <td><div :class='"checkbox" + (selP.indexOf(p.id) > -1? " cur":"")' @click="checkPerson(i, p.id)"></div></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.name" maxlength="20"></td>
                                    <td v-if="p.idcard"><input type="text" style="width:150px;" :readonly="isEdit == i ? false : 'readonly'" v-model="p.idcard" maxlength="20"></td>
                                    <td v-else="p.hzh"><input type="text" style="width:150px;" :readonly="isEdit == i ? false : 'readonly'" v-model="p.hzh" maxlength="20"></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.phone" maxlength="20"></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.jjphone" maxlength="20"></td>
                                    <td>
                                        <div class="pubbtn" v-if="isEdit == i" @click="savePerson(p)">保存</div>
                                        <div class="pubbtn" v-else @click="isEdit = i">修改</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="order-content">
                    <span>订单备注:</span>
                    <input type="text" v-model="content" maxlength="500">
                </div>
                <div class="pubbtn submit" @click="submit">提交订单</div>
            </div>

            <div class="airinfo-layer" v-if='showLayer' @click="closeLayer">
                <div>
                    您已预订成功，请等待出票！
                    <span class="layer-btn">确 定</span>
                </div>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/Header.vue'
import Footer from './public/Footer.vue'
import Menu from './public/Menu.vue'
import ProgressBar from './public/ProgressBar.vue'
export default {
    data () {
        return {
            userID: '',
            username: '',
            showLayer: false,
            ticketType: '',
            flightinfo: {},
            flight: {},
            seat: {},
            airCompany: [],
            TotalPrice: 0,
            personType: ['成人', '儿童'],
            cardType: [],
            selP: [],
            search: {},
            PersonList: '',
            shiliPerson: {
                name: '',//联系人
                hzh: '',//护照号码
                idcard: '',//身份证
                type: '成人',//类型
                id: '',
                phone: '',//手机号
                jjphone: '',//紧急手机号
                safenum: '0', // 购买保险
                cardtype: 1, // 1身份证2护照
            },
            person: [],
            pList: [], // 提交订单
            content: '',
            tgqgd: '',
            isEdit: 'null',
            isSumiting: false,
            searchKey: '',
            page: 0,
            isMorePer: false,
            morePerLoading: false
        }
    },
    components: {
        Header,
        Footer,
        Menu,
        ProgressBar
    },
    methods: {
        checkContent (v) {
            return v.replace(/\n/g,"<br/>")
        },
        searchPer () {
            this.page = 0
            this.isMorePer = false
            this.loadMorePer()
        },
        loadMorePer () {
            if (!this.morePerLoading && !this.isMorePer) {
                this.page += 1
                this.morePerLoading = true
                this.getPerson()
            }
        },
        changeCardType (item) {
            if (item.id) {
                for (let i in this.PersonList) {
                    if (this.PersonList[i].id === item.id) {
                        if (item.cardtype === 1) {
                            item.idcard = this.PersonList[i].idcard
                        } else if (item.cardtype === 2) {
                            item.idcard = this.PersonList[i].hzh
                        }
                    }
                }
            }
        },
        getPerson () {
            this.$http.get(this.uris + '/passenger/GetPersonList', {params: {
                cid: this.userID,
                page: this.page,
                pagenum: 20,
                key: this.searchKey
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    if (res.data.data.data.length > 0) {
                        if (res.data.data.pagecount) {
                            this.PersonList = res.data.data.data
                            for(let i in this.PersonList) {
                                this.PersonList[i].checked = false
                            }
                        } else {
                            for (let i in res.data.data.data) {
                                res.data.data.data[i].checked = false
                                this.PersonList.push(res.data.data.data[i])
                            }
                        }
                    } else {
                        this.isMorePer = true
                    }            
                }
                this.morePerLoading = false
            });
        },
        checkPerson (v, id) {
            let _index = this.selP.indexOf(id)
            if (_index > -1) {
                this.selP.splice(_index, 1)
                let _i = this.person.findIndex(item => {
                    return item.id === id
                })
                this.person.splice(_i, 1)
                if (this.person.length < 1) {
                    this.addPerson()
                }
            } else {
                this.selP.push(id)
                if (this.selP.length) {
                    let obj = this.PersonList[v]
                    let _no = obj.idcard
                    let _t = 1
                    if (_no.trim() === '' && obj.hzh.trim() !== '') {
                        _no = obj.hzh
                        _t = 2
                    }
                    let p = {
                        id: obj.id,
                        type: obj.type == 1? "成人": "儿童",
                        name: obj.name,
                        cardtype: _t,
                        idcard: _no,
                        phone: obj.phone,
                        jjphone: obj.jjphone,
                        safenum: '0'
                    }
                    if (this.person.length < 2 && this.person[0].name === '') {
                        this.person = []
                    }
                    console.log(p)
                    this.person.push(p)
                }
            }
        },
        addPerson () {
            this.person.push(JSON.parse(JSON.stringify(this.shiliPerson)))
        },
        savePerson (p) {
            this.$http.post(this.uris + '/passenger/saveperson', p)
            .then(res => {
                console.log(res)
                if (res && res.data && res.data.status != 0) {
                    this.isEdit = 'null'
                }
            });
        },
        delPerson (i, id) {
            let _index = this.selP.indexOf(id)
            if (_index > -1) {
                this.selP.splice(_index, 1)
                let _i = this.person.findIndex(item => {
                    return item.id === id
                })
                this.person.splice(_i, 1)
                if (this.person.length < 1) {
                    this.addPerson()
                }
            } else {                
                this.person.splice(i, 1)
            }
        },
        submit () {
            if(!this.isSumiting){
                let that = this
                console.log(this.person)
                if (this.person[0].phone.trim() === '') {
                    this.MessageBox('请输入乘机人手机号')
                } else {
                    this.isSumiting = true
                    let orderBody = {
                        cid: this.userID,
                        cname: this.username,
                        scity: this.search.scity,
                        ecity: this.search.ecity,
                        sdate: this.flightinfo.startTime,
                        personlist: this.person,
                        airbody: this.flight,
                        airseat: this.seat,
                        content: this.content
                    }
                    console.log(orderBody)
                    this.$http.post(this.uris + '/gnorder/submitordercn', orderBody)
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            this.showLayer = true
                            this.utils.setItem('selFlight', '')
                            this.utils.setItem('bookFlightSeat', '')
                        } else {
                            this.MessageBox("下单失败 " + (res.msg || ''), '温馨提示')
                        }
                        this.isSumiting = false
                    }).catch(res => {
                        this.isSumiting = false
                    })
                }
            }
        },
        checkTime(v1, v2) {
            var h1 = Number(v1.substr(0,2))
            var m1 = Number(v1.substr(2,2))
            var h2 = Number(v2.substr(0,2))
            var m2 = Number(v2.substr(2,2))
            var hours = 0, minutes = 0
            hours = h2 - h1
            if (h2 < h1) {
                hours = h2 + 24 - h1
            }
            minutes = m2 - m1
            if (m2 < m1) {
                hours -= 1
                minutes = m2 + 60 -m1
            }
            return hours + "时" + minutes + "分";
        },
        checkTGQ (v, code) {
            // 获取退改签
            this.$http.get(this.uris + '/flight/getflighttgq', {params: {
                flightNo: v,
                seatCode: code
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    var _o = res.data.data.replace('更改条件', '<b>更改条件</b>').replace('退票条件', '<br/><b>退票条件</b>').replace('签转条件', '<br/><b>签转条件</b>')
                    this.tgqgd = _o
                }
            })
        },
        checkAirCompany (v) {
            let txt = '';
            if (v) {
                for (let i=0; i<this.airCompany.length; i++) {
                    if (this.airCompany[i].CarrierCode == v) {
                        txt = this.airCompany[i].ShortName
                    }
                }
            }
            return txt
        },
        closeLayer () {
            this.$router.push({
                path: '/orderlist'
            })
        }
    },
    created () {
        const _account = this.utils.getAccount(this)
        this.userID = _account.id || ''
        this.username = _account.uname

        this.addPerson()

        this.loadMorePer()
        
        this.cardType = this.utils.getCardType()
        
        let scode = this.utils.getItem("scode") || 'PEK'
        let ecode = this.utils.getItem("ecode") || 'LAX'
        let stime = this.utils.getItem("stime") || this.utils.dateFormat(this.utils.getAfterNDate(1,'d'),'yyyy-MM-dd')
        let etime = this.utils.getItem("etime") || this.utils.dateFormat(this.utils.getAfterNDate(2,'d'),'yyyy-MM-dd')
        let ttype = this.utils.getItem("ttype") || true
        let ftype = this.utils.getItem("ftype") || true
        let scity = this.utils.getItem("scity") || '北京'
        let ecity = this.utils.getItem("ecity") || '洛杉矶  (加利福尼亚州) '
        let sflight = this.utils.getItem("sflight") || '北京首都机场'
        let eflight = this.utils.getItem("eflight") || '洛杉矶国际机场'
        if(ttype == false || ttype == 'false'){
            this.ticketType = 0
            this.flightinfo.ticketType = 0
        }
        if(ftype == false || ftype == 'false'){
            this.flightType = 0
            this.flightinfo.flightType = 0
        }
        this.flightinfo.startCity = scity
        this.flightinfo.startCityShort = scode
        this.flightinfo.startCityValue = sflight
        this.flightinfo.startCityText = sflight + '(' + scode + ')'
        this.flightinfo.endCity = ecity
        this.flightinfo.endCityShort = ecode
        this.flightinfo.endCityValue = eflight
        this.flightinfo.endCityText = eflight + '(' + ecode + ')'
        this.flightinfo.startTime = stime
        this.flightinfo.endTime = etime
        
        this.search = {
            scity: {
                airportname: sflight,
                code: scode,
                name: scity
            },
            ecity: {
                airportname: eflight,
                code: ecode,
                name: ecity
            }
        }

        let f = this.utils.getItem('selFlight')
        if (f) {
            this.flight = JSON.parse(f)
            let s = this.utils.getItem('bookFlightSeat')
            this.seat = JSON.parse(s)
            this.checkTGQ(this.flight.flightNo.substr(0,2), this.seat.seatCode)
        } else {
            this.$router.push({
                path: '/index'
            })
        }
    }
}

</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.gnflightinfo-box{
    .person-box-body{
        min-height: 500px;
        padding-bottom: 20px;
        .airinfo-box{
            margin-top: 20px;
            background-color: #fff;
            box-shadow: 2px 2px 4px #ddd;
            padding: 20px 0 10px 0;
            .airinfo-box-title{
                height: 22px;
                line-height: 22px;
                border-left: 2px solid $pubcolor;
                box-sizing: border-box;
                padding-left: 20px;
                .title-icon{
                    padding-left: 25px;   
                    font-size: 22px;
                    color: #000;             
                }
                .goback{
                    background: url('../assets/images/icon_flight_goback.png') no-repeat;
                    background-position: left center;
                    background-size: auto 20px;
                }
            }
            .airinfo-box-trip{
                margin-top: 25px;
                padding-left: 20px;
                box-sizing: border-box;
                .trip-title{
                    display: flex;
                    .trip-lab{
                        background-color: $pubcolor;
                        color: #fff;
                        width: 60px;
                        height: 22px;
                        line-height: 22px;
                        font-size: 16px;
                        text-align: center;                    
                    }
                    .trip-timecity{
                        margin-left: 15px;
                        color: #000;
                        font-size: 16px;
                        line-height: 22px;
                        font-weight: bold;
                        display: flex;
                        span{
                            margin: 0 5px;
                        }
                        .ticon{
                            width: 23px;
                            background: url('../assets/images/icon_list_go.png') no-repeat;
                            background-position: center;
                            background-size: 23px auto;
                        }
                        .tomany{
                            font-size: 14px;
                            font-weight: normal;
                        }
                    }
                }
                .trip-info{
                    padding-left: 80px;
                    box-sizing: border-box;
                    > li{
                        display: flex;
                        margin-top: 20px;
                        .air-logo{
                            max-width: 30px;
                            max-height: 20px;
                            margin-right: 5px;
                            img{
                                max-width: 30px;
                                max-height: 20px;
                            }
                        }
                        .air-company{
                            color: #000;
                            font-size: 14px;
                        }
                        .air-port{
                            display: flex;
                            margin-left: 50px;
                            line-height: 22px;
                            height: 22px;
                            div{
                                margin: 0 5px;
                                display: flex;
                                .air-port-time{
                                    margin-right: 10px;
                                    font-size: 22px;
                                }
                            }
                            .air-port-icon{
                                width: 126px;
                                background: url('../assets/images/icon_person_goback.png') no-repeat;
                                background-position: center;
                                background-size: 100%;
                            }
                        }
                    }
                }
            }
            .air-rule-notice-price{
                margin-top: 20px;
                text-align: right;
                padding-top: 20px;
                padding-right: 10px;
                border-top: 1px dashed #ccc;
                box-sizing: border-box;
                span{
                    margin-left: 25px;
                }
                .rule{
                    color: #f00;
                    padding-left: 18px;
                    background: url('../assets/images/icon_rule.png') no-repeat left center;
                    background-size: 14px;
                    position: relative;
                }
                .content-layer{
                    display: none;
                    position: absolute;
                    left: -100px;
                    top: 20px;
                    width: 300px;
                    padding: 10px 15px;
                    box-sizing: border-box;
                    background-color: #EEFFF9;
                    color: #444;
                    border: 1px solid #ccc;
                    text-align: left;
                    z-index: 1;
                }
                .rule:hover{
                    .content-layer{
                        display: block;
                    }
                }
                .notice{
                    position: relative;
                    color: #f00;
                    padding-left: 17px;
                    background: url('../assets/images/icon_notice.png') no-repeat left center;
                    background-size: 13px;
                }
                .notice:hover{
                    .content-layer{
                        display: block;
                    }
                }
                .price{
                    font-size: 22px;
                    color: #000;
                    font-weight: bold;
                    span{
                        color: #f00;
                        margin-left: 5px;
                    }
                }
            }
        }
        .whiteperson-box{
            margin-top: 40px;
            position: relative;
            .whiteperson-box-title{
                font-size: 22px;
                color: #000;                
                font-family: '黑体', sans-serif;
                padding-left: 15px;
                margin: 15px 0;
                line-height: 22px;
                height: 22px;
                border-left: 2px solid $pubcolor;
                span{
                    margin-left: 20px;
                    font-size: 14px;
                    color: #666;
                }
            }
            .person-from{
                background-color: #fff;
                padding: 50px 20px 20px 20px;
                box-sizing: border-box;
                box-shadow: 2px 2px 4px #ddd;
                position: relative;
                ul{
                    li{
                        border-bottom: 1px dotted #ccc;
                        margin-bottom: 20px;
                        > div{
                            display: flex;
                            height: 65px;
                            line-height: 36px;
                            flex-wrap: wrap;
                            >span{
                                height: 36px;
                                width: 120px;
                                text-align: right;
                                font-family: '黑体', sans-serif;
                                font-size: 16px;
                            }
                            select{
                                position: relative;
                                border: 1px solid #ccc;
                                border-radius: 3px;
                                width: 80px;
                                height: 36px;
                                line-height: 34px;
                                box-sizing: border-box;
                                padding-left: 10px;
                                margin-right: 10px;
                                cursor: pointer;
                            }
                            input[type='text']{
                                position: relative;
                                border: 1px solid #ccc;
                                border-radius: 3px;
                                width: 240px;
                                height: 36px;
                                line-height: 34px;
                                box-sizing: border-box;
                                padding-left: 10px;
                            }
                            .el-select{
                                margin-right: 10px;
                                .el-input__inner{
                                    width: 90px;
                                }
                            }
                            .formnotice{
                                font-family: '宋体', sans-serif;
                                width: 100%;
                                color: #f00;
                                line-height: 12px;
                                height: 20px;
                                font-size: 12px;
                                padding-left: 125px;
                                box-sizing: border-box;
                            }
                            .form-rd{
                                display: flex;
                                height: 13px;
                                line-height: 13px;
                                margin-top: 11.5px;
                                label{
                                    margin: 0 30px 0 5px;
                                    cursor: pointer;
                                }
                                .safe-price{
                                    color: #f00;
                                }
                            }
                        }
                        .icon-close{
                            width: 20px;
                            height: 20px;
                            cursor: pointer;
                            background: url('../assets/images/icon-close.png') no-repeat center;
                            background-size: 70%;
                            border-radius: 30px;
                            border: 2px solid #666;
                            position: relative;
                            top: 5px;
                            margin-left: 20px;
                        }
                    }
                    li:last-child{
                        border: 0;
                    }
                }      
            }
            .person-gn{
                .moreperson-box{
                    max-height: 275px;
                    overflow-y: auto;
                    width: 665px;
                    right: 25px;
                    padding: 10px 15px;
                    .pubbtn{
                        padding: 5px 0;
                        width: 60px;
                    }
                }
            }          
            .btn-all{
                position: absolute;
                top: 50px;
                right: 600px;
                .btn-addpreson{
                    margin-left: 40px;
                    margin-top: 3px;
                    height: 20px;
                    width: 80px;
                    padding: 5px 0;
                    border-radius: 3px;
                    padding: 5px 15px;
                }
                .btn-person{
                    margin-left: 20px;
                    margin-top: 3px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    width: 100px;
                    padding: 5px 0;
                    border-radius: 3px;
                    background-color: #FE7122;
                    color: #fff;
                    cursor: pointer;
                    display: none;
                }
                .btn-person:hover{
                    background-color: #E65D0C;
                }
            }
            .div-persearch{
                position: absolute;
                top: 45px;
                right: 150px;
                display: flex;
                .txt-search{
                    width: 240px;
                    padding-left: 10px;
                }
                .btn{
                    margin-left: 15px;
                    width: 80px;
                }
            }  
            .moreperson-box{
                position: absolute;
                top: 100px;
                right: 60px;
                background-color: #ebebeb;
                height: auto;
                max-height: 440px;
                overflow-y: auto;
                width: 720px;
                padding: 10px 20px;
                box-sizing: border-box;
                table{
                    width: 100%;
                    line-height: 30px;
                    td{
                        padding-bottom: 10px;
                        text-align: center;
                    }
                    input{
                        width: 120px;
                        height: 30px;
                        margin: 0 auto;
                        text-align: center;
                        padding: 0;
                        box-sizing: border-box;
                        border: 0;
                    }
                    input:read-only{
                        background-color: #ebebeb;
                    }
                    .checkbox{
                        width: 30px;
                        height: 30px;
                        border: 1px solid $pubcolor;
                        box-sizing: border-box;
                        background-color: #fff;
                        cursor: pointer;
                    }
                    .checkbox.cur{
                        background: url('../assets/images/icon_dui.png') no-repeat center;
                        background-size: 20px;
                        background-color: $pubcolor;
                    }
                    .btn{
                        cursor: pointer;
                    }
                }
            }
            .order-content{
                background-color: #fff;
                margin-top: 20px;
                height: 40px;
                line-height: 40px;
                padding-left: 15px;
                box-sizing: border-box;
                border-bottom: 1px dotted #ddd;
                overflow: hidden;
                input{
                    width: 1100px;
                    border: 0;
                }
            }
            .submit{
                width: 140px;
                height: 40px;
                line-height: 30px;
                margin: 25px auto;
                border-radius: 3px;
                box-sizing: border-box;
                font-size: 16px;
            }
        }
        .airinfo-layer{
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 99;
            background-color: rgba(0,0,0,0.3);
            div{
                position: absolute;
                left: 50%;
                top: 50%;
                width: 612px;
                height: 228px;
                margin-left: -306px;
                margin-top: -114px;
                padding: 60px 80px;
                box-sizing: border-box;
                color: #000;
                font-family: "黑体", sans-serif;
                font-size: 30px;
                background: url('../assets/images/icon_layer_bg.png') no-repeat;
                background-position: 365px 110px;
                background-color: #fff;
                border-radius: 10px;
                .layer-btn{
                    position: absolute;
                    width: 100px;
                    height: 40px;
                    line-height: 40px;
                    margin-left: -50px;
                    color: #fff;
                    background-color: #22a070;
                    left: 50%;
                    bottom: 30px;
                    text-align: center;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>