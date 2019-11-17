<template>
    <div class="flightinfo-box">
        <Header></Header>
        <Menu t="index"></Menu>
        <ProgressBar p="3"></ProgressBar>
                
        <div class="person-box-body">
            <div class="boxwidth airinfo-box">
                <div class="airinfo-box-title"><span class="title-icon goback">{{flightinfo.ticketType == 1? '往返' : '直飞'}}</span></div>
                <div class="airinfo-box-trip">
                    <div class="trip-title">
                        <span class="trip-lab">去程</span>
                        <div class="trip-timecity"><span>{{flightinfo.startTime}}</span><span>{{flightinfo.startCity}}</span><span class="ticon"></span><span>{{flightinfo.endCity}}</span><span class="tomany">{{sFlight.otherFlight.length > 0? sFlight.otherFlight.length + '次换乘':'直飞'}}</span></div>                    
                    </div>
                    <ul class="trip-info">
                        <li>
                            <div class="air-logo"><img :src="sFlight.airinfo.Picture" alt="LOGO"></div>
                            <div class="air-company">{{sFlight.airinfo.CompanyName}} {{sFlight.AirCode}} {{sFlight.Jixing}}</div>
                            <div class="air-port">
                                <div><span class="air-port-time">{{sFlight.STime}}</span> <span>{{sFlight.SPortName}}</span></div>
                                <div class="air-port-icon"></div>
                                <div><span class="air-port-time">{{sFlight.ETime}}</span> <span>{{sFlight.EPortName}}</span></div>
                            </div>
                        </li>
                        <li v-if="sFlight.otherFlight.length > 0" v-for="(item, i) in sFlight.otherFlight" :key="i">
                            <div class="air-logo"><img :src="sFlight.airinfo.Picture" alt=""></div>
                            <div class="air-company">{{sFlight.airinfo.CompanyName}} {{item.AirCode}} {{item.Jixing}}</div>
                            <div class="air-port">
                                <div><span class="air-port-time">{{item.STime}}</span> <span>{{item.SPortName}}</span></div>
                                <div class="air-port-icon"></div>
                                <div><span class="air-port-time">{{item.ETime}}</span> <span>{{item.EPortName}}</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="airinfo-box-trip" v-if="flightinfo.ticketType && bFlight">
                    <div class="trip-title">
                        <span class="trip-lab">返程</span>
                        <div class="trip-timecity"><span>{{flightinfo.endTime}}</span><span>{{flightinfo.endCity}}</span><span class="ticon"></span><span>{{flightinfo.startCity}}</span><span class="tomany">{{bFlight.otherFlight.length > 0? bFlight.otherFlight.length + '次换乘':'直飞'}}</span></div>                    
                    </div>
                    <ul class="trip-info">
                        <li>
                            <div class="air-logo"><img :src="bFlight.airinfo.Picture" alt="LOGO"></div>
                            <div class="air-company">{{bFlight.airinfo.CompanyName}} {{bFlight.AirCode}} {{bFlight.Jixing}}</div>
                            <div class="air-port">
                                <div><span class="air-port-time">{{bFlight.STime}}</span> <span>{{bFlight.SPortName}}</span></div>
                                <div class="air-port-icon"></div>
                                <div><span class="air-port-time">{{bFlight.ETime}}</span> <span>{{bFlight.EPortName}}</span></div>
                            </div>
                        </li>
                        <li v-if="bFlight.otherFlight.length > 0" v-for="(item, i) in bFlight.otherFlight" :key="i">
                            <div class="air-logo"><img :src="bFlight.airinfo.Picture" alt=""></div>
                            <div class="air-company">{{bFlight.airinfo.CompanyName}} {{item.AirCode}} {{item.Jixing}}</div>
                            <div class="air-port">
                                <div><span class="air-port-time">{{item.STime}}</span> <span>{{item.SPortName}}</span></div>
                                <div class="air-port-icon"></div>
                                <div><span class="air-port-time">{{item.ETime}}</span> <span>{{item.EPortName}}</span></div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="air-rule-notice-price">
                    <span class="rule">
                        退改签规定
                        <div class="content-layer" v-html="checkContent(sFlight.piaojia.beizhu)"></div>
                    </span>
                    <span class="notice">购票须知</span>
                    <span class="price">税金<span>{{fix}}</span></span>
                    <span class="price">服务费<span>0</span></span>
                    <span class="price">票价<span>{{TotalPrice}}</span></span>
                </div>
            </div>

            <div class="boxwidth whiteperson-box">
                <div class="whiteperson-box-title">填写乘机人信息<span>请准确填写乘客信息,乘客姓名必须是拼音或英文</span></div>
                <div class="person-from person-gj" v-if="flightinfo.flightType">
                    <ul>
                        <li v-for="(item, i) in person" :key="i">
                            <div class="cjr">
                                <span>乘机人：</span>
                                <input type="text" maxlength="50" v-model="item.CjrName" />
                                <div class="formnotice">例如：zhang/tiantian</div>
                            </div>
                            <div class="csrq">
                                <span>出生年月日：</span>
                                <input type="text" maxlength="50" v-model="item.CSRQ" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="hzhm">
                                <span>护照号码：</span>
                                <input type="text" maxlength="50" v-model="item.HZH" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="hzdateend">
                                <span>护照到期日：</span>
                                <input type="text" maxlength="50" v-model="item.HZYXQ" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="cjrphone">
                                <span>乘机人手机：</span>
                                <input type="text" maxlength="50" v-model="item.phone" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="jjlxrphone">
                                <span>紧急人手机：</span>
                                <input type="text" maxlength="50" v-model="item.jingji" />
                                <div class="formnotice"></div>
                            </div>
                            <div class="safe">
                                <span>购买保险：</span>
                                <div class="form-rd">
                                    <input type="radio" name="rd_safe" v-model="item.isSafe" value="1" id="rd_y" /><label for="rd_y">是</label>
                                    <input type="radio" name="rd_safe" v-model="item.isSafe" value="0" id="rd_n" checked /><label for="rd_n">否</label>
                                    <span class="safe-price">保险20元</span>
                                </div>
                                <div class="formnotice"></div>
                            </div>
                            <div class="xingbie">
                                <span>性别：</span>
                                <div class="form-rd">
                                    <input type="radio" name="rd_sex" v-model="item.Sex" value="男" id="rd_nan" /><label for="rd_nan">先生</label>
                                    <input type="radio" name="rd_sex" v-model="item.Sex" value="女" id="rd_nv" /><label for="rd_nv">女士</label>
                                </div>
                                <div class="formnotice"></div>
                            </div>
                        </li>
                    </ul>
                    <div class="btn-all">
                        <label class="pubbtn btn-addpreson" @click="addPerson">+ 乘机人</label>
                        <label class="btn-person">常用乘机人</label>
                    </div>
                    <div class="moreperson-box">
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>乘机人姓名</td>
                                    <td>护照号码</td>
                                    <td>乘机人手机</td>
                                    <td>紧急人手机</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(p, i) in PersonList">
                                    <td><div :class='"checkbox" + (selP.indexOf(i) > -1? " cur":"")' @click="checkPerson(p, i)"></div></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.CjrName" maxlength="20"></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.HZH" maxlength="20"></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.phone" maxlength="20"></td>
                                    <td><input type="text" :readonly="isEdit == i ? false : 'readonly'" v-model="p.jingji" maxlength="20"></td>
                                    <td>
                                        <div class="pubbtn" v-if="isEdit == i" @click="savePerson(p)">保存</div>
                                        <div class="pubbtn" v-else @click="isEdit = i">修改</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="person-from person-gn" v-else>
                    <div class="cjr">
                        <span>乘客姓名：</span>
                        <select name="ddl_person_type">
                            <option value="1">成人</option>
                            <option value="2">儿童</option>
                        </select>
                        <input type="text" maxlength="50" />
                        <label class="pubbtn btn-addpreson">+ 乘机人</label>
                    </div>
                    <div class="csrq">
                        <span>证件信息：</span>
                        <select name="ddl_card" id="">
                            <option value="1">身份证</option>
                        </select>
                        <input type="text" maxlength="50" />
                        <div class="formnotice"></div>
                    </div>
                    <div class="cjrphone">
                        <span>乘机人手机：</span>
                        <input type="text" maxlength="50" />
                        <div class="formnotice"></div>
                    </div>
                    <div class="jjlxrphone">
                        <span>紧急人手机：</span>
                        <input type="text" maxlength="50" />
                        <div class="formnotice"></div>
                    </div>
                    <div class="safe">
                        <span>购买保险：</span>
                        <div class="form-rd">
                            <input type="radio" name="rd_safe" id="rd_y" /><label for="rd_y">是</label>
                            <input type="radio" name="rd_safe" id="rd_n" checked /><label for="rd_n">否</label>
                            <span class="safe-price">保险20元</span>
                        </div>
                        <div class="formnotice"></div>
                    </div>
                    <div class="moreperson-box" v-if="PersonList">
                        <table>
                            <thead>
                                <tr>
                                    <td></td>
                                    <td>乘机人姓名</td>
                                    <td>证件信息</td>
                                    <td>乘机人手机</td>
                                    <td>紧急人手机</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(p, i) in PersonList">
                                    <td><div :class='"checkbox" + (selP.indexOf(i) > -1? " cur":"")' @click="checkPerson(p, i)"></div></td>
                                    <td><input type="text" value="王丽" maxlength="20"></td>
                                    <td><input type="text" value="12345678" maxlength="20"></td>
                                    <td><input type="text" value="13888889999" maxlength="20"></td>
                                    <td><input type="text" value="13888889999" maxlength="20"></td>
                                    <td><div class="pubbtn">保存</div></td>
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

            <div class="airinfo-layer" v-if='showLayer'>
                <div>
                    您已预订成功，请等待出票！
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
            flightinfo: '',
            sFlight: '',
            bFlight: '',
            stime: '',
            scode: '',
            airid: '',
            fix: '',
            TotalPrice: 0,
            selP: [],
            PersonList: '',
            shiliPerson: {
                CjrName: '',//联系人
                Sex: '',//性别
                HZH: '',//护照号码
                HZYXQ: '',//护照有效期
                CSRQ: '',//出生日期
                idcard: '',//身份证
                type: '1',//类型1成人 0儿童
                id: '',
                phone: '',//手机号
                jingji: '',//紧急手机号
                isSafe: '' // 购买保险
            },
            person: [],
            pList: [], // 提交订单
            content: '',
            isEdit: 'null'
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
        checkPerson (p, i) {
            if (this.selP.indexOf(i) > -1) {
                this.selP.splice(this.selP.indexOf(i), 1)
                let index = this.person.findIndex(v => {
                    return v.id === p.id
                })
                this.person.splice(index, 1)
                if (this.person.length < 1) {
                    this.person.push(JSON.parse(JSON.stringify(this.shiliPerson)))
                }
            } else {
                this.selP.push(i)
                if (this.person.length === 1 && this.person[0].CjrName === '') {
                    this.person[0] = p
                } else {
                    this.person.push(p)
                }
            }
        },
        addPerson () {
            this.person.push(JSON.stringify(this.shiliPerson))
        },
        savePerson (p) {
            this.utils.http({
                name: this,
                uri: '/people/saveperson',
                method: 'post',
                params: p,
                success: res=>{
                    if (res.status === 200 && res.data.status === 1) {
                        this.isEdit = 'null'
                    } else {
                        this.MessageBox('保存失败，请检查数据')
                    }
                }
            })
        },
        submit () {
            let ischeck = checkVal(this)
            
            if(ischeck && !this.isSubmitIng){
                let that = this
                // this.Indicator.open('提交中...')
                
                let toIDS = []
                let toBackIDS = []
                for (let i in this.sFlight.otherFlight) {
                    toIDS.push(this.sFlight.otherFlight[i].SubAirID)
                }
                if(this.flightinfo.ticketType){
                    for (let i in this.bFlight.otherFlight) {
                        toBackIDS.push(this.bFlight.otherFlight[i].SubAirID)
                    }
                }

                const params = {
                    cid: this.userID,
                    cname: this.username,
                    persons: this.pList,
                    airinfo: {
                        airtype: this.flightinfo.ticketType,
                        startDate: this.flightinfo.startTime,
                        backDate: this.flightinfo.endTime,
                        startCity: this.flightinfo.startCity,
                        backCity: this.flightinfo.endCity,
                        flightInfo: {
                            airID: this.sFlight.AirID,
                            ticketID: this.sFlight.jipiao.TicketID,
                            detailID: this.sFlight.piaojia.DetailID,
                            toFlightInfo: toIDS
                        },
                        backFlightInfo: {
                            airID: this.bFlight.AirID,
                            ticketID: this.bFlight.jipiao.TicketID,
                            detailID: this.bFlight.piaojia.DetailID,
                            toFlightInfo: toBackIDS
                        }
                    }
                }
                console.log(params)
                this.utils.http({
                    name: this,
                    uri: '/order/submitorder',
                    method: 'post',
                    params: params,
                    success: res=>{
                        console.log(111)
                        if(res.status === 200 && res.data.status === 1){
                            this.MessageBox('下单成功！').then(action => {
                                this.$router.push({
                                    path: '/orderlist'
                                })
                            })                            
                        } else {
                            this.MessageBox('下单成功！', res.data.msg)
                        }
                    }
                })
            }
        }
    },
    created () {
        const _account = this.utils.getAccount(this)
        this.userID = _account.id || ''
        this.username = _account.uname

        this.sFlight = JSON.parse(this.utils.getItem('startFlight'))[0]
        this.stime = this.utils.getItem('sairtime')
        this.scode = this.utils.getItem('saircode')
        this.airid = this.utils.getItem('sairid')
        this.flightinfo = JSON.parse(this.utils.getItem('flightinfo'))
        if (this.flightinfo && this.flightinfo.ticketType) {
            this.bFlight = JSON.parse(this.utils.getItem('backFlight'))[0]
            this.TotalPrice = Number(this.sFlight.piaojia.TicketPrice) + parseInt(this.sFlight.jipiao.WFS)
            this.fix = parseInt(this.sFlight.jipiao.WFS)
        } else {
            this.TotalPrice = Number(this.sFlight.piaojia.TicketPrice) + parseInt(this.sFlight.jipiao.DCS)
            this.fix = parseInt(this.sFlight.jipiao.DCS)
        }
        console.log(this.flightinfo)
        console.log(this.sFlight)
        console.log(this.bFlight)

        this.person.push(this.shiliPerson)

        this.utils.http({
            name: this,
            uri: '/passenger/getpersons',
            params: {
                params: { id: this.userID}
            },
            success: res=>{
                if(res.status === 200 && res.data.status === 1){
                    this.PersonList = res.data.data
                    console.log(this.PersonList)
                }
            }
        })
    }
}


function checkVal(vue) {
    let ischeck = true
    let p = vue.PersonList        

    for(let i in p){
        vue.pList[i] = {}
        vue.pList[i].PName = vue.utils.clearSpace(p[i].CjrName)
        vue.pList[i].PCode = ""
        vue.pList[i].PHZ = vue.utils.clearSpace(p[i].HZH)
        vue.pList[i].PBD = vue.utils.clearSpace(p[i].CSRQ)
        vue.pList[i].PSEX = vue.utils.clearSpace(p[i].Sex)
        vue.pList[i].PHZYXQ = vue.utils.clearSpace(p[i].HZYXQ)
        vue.pList[i].PTYPE = p[i].type
        vue.pList[i].FlightID = 0
        vue.pList[i].ID = p[i].id
        let myDate = vue.utils.dateFormat('yyyy')
        let age = 0
        if(p[i].CSRQ.length > 1){
            age = parseInt(myDate) - parseInt(p[i].CSRQ.substr(0,4))
        }
        if(p[i].CjrName.length < 1 || p[i].CjrName.length > 20 || !vue.utils.englishName(p[i].CjrName)){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人姓名必须是拼音或英文')
            ischeck = false
            break
        }else if(p[i].HZH.length < 1){
            vue.utils.alert(vue, '请输入第' + (parseInt(i)+1) + '位乘机人的护照号码')
            ischeck = false
            break
        }else if(p[i].HZH.length > 50 || vue.utils.isEn(p[i].HZH) || !vue.utils.isNumberEn(p[i].HZH)){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人护照号码格式不正确')
            ischeck = false
            break
        }else if(p[i].CSRQ.length < 1){
            vue.utils.alert(vue, '请选择第' + (parseInt(i)+1) + '位乘机人的出生日期')
            ischeck = false
            break
        }else if(p[i].type == '0' && age > 12){
            vue.utils.alert(vue, '第' + (parseInt(i)+1) + '位乘机人年龄超出，请重新选择出生日期')
            ischeck = false
            break
        }else if(p[i].Sex.length < 1){
            vue.utils.alert(vue, '请选择第' + (parseInt(i)+1) + '位乘机人的性别')
            ischeck = false
            break
        }
    }
    return ischeck
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.flightinfo-box{
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
                }
                .rule:hover{
                    .content-layer{
                        display: block;
                    }
                }
                .notice{
                    color: #f00;
                    padding-left: 17px;
                    background: url('../assets/images/icon_notice.png') no-repeat left center;
                    background-size: 13px;
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
                    }
                    li:last-child{
                        border: 0;
                    }
                }                
                .btn-all{
                    position: absolute;
                    top: 50px;
                    right: 690px;
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
            }
            .person-gn{
                .moreperson-box{
                    max-height: 275px;
                    overflow-y: auto;
                    width: 665px;
                    right: 25px;
                    padding: 10px 15px;
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
                padding: 60px 0 0 80px;
                box-sizing: border-box;
                color: #000;
                font-family: "黑体", sans-serif;
                font-size: 30px;
                background: url('../assets/images/icon_layer_bg.png') no-repeat;
                background-position: 325px 110px;
                background-color: #fff;
                border-radius: 10px;
            }
        }
    }
}
</style>