<template>
    <div class="index-box">
        <Header></Header>
        <Menu t="index"></Menu>
        <ProgressBar p="1"></ProgressBar>

        <div class="boxwidth bookbox">
            <div class="tab">
                <div data-type="gn" @click="selCountry(0)" :class="flightType == 1?'':'cur'">预订国内</div>
                <div data-type="gj" @click="selCountry(1)" :class="flightType == 1?'cur':''">预订国际</div>
            </div>
            <div class="padding">
                <div class="menu">
                    <div @click="ticketType = 0" :class="'go' + (ticketType == 0?' cur':'')">单程</div>
                    <div v-show="flightType == 1" @click="ticketType = 1" :class="'return' + (ticketType == 1?' cur':'')">往返</div>
                    <div @click="ticketType = 2" :class="'made' + (ticketType == 2?' cur':'')">定制</div>
                </div>
                <div class="go-return-box" v-if="ticketType != 2">
                    <div class="out">
                        <el-autocomplete class="inline-input" :clearable="false" v-model="flightInfo.startCityText" :fetch-suggestions="querySearch" :placeholder="flightInfo.startCityPlaceholder" @blur="checkCity(0)" @select="selStartCity" ></el-autocomplete>
                    </div>
                    <div class="daoda">
                        <el-autocomplete class="inline-input" :clearable="false" v-model="flightInfo.endCityText" :fetch-suggestions="queryEndSearch" :placeholder="flightInfo.endCityPlaceholder" @blur="checkCity(1)" @select="selEndCity" ></el-autocomplete>
                    </div>
                    <div class="outdate">
                        <el-date-picker v-model="flightInfo.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择出发日期"> </el-date-picker>
                    </div>
                    <div class="daodadate" v-show="flightType == 1 && ticketType">
                        <el-date-picker v-model="flightInfo.endTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择返回日期"> </el-date-picker>
                    </div>
                    <div class="btn" @click="findFlight">搜索</div>
                </div>
                <div class="made-box" v-else>
                    <div class="text-box">
                        <textarea id="txt_made" v-model="dzContent" cols="30" rows="10" placeholder="请尽量详细描述您的航班需求，以便我们能更好为您量身设计行程！"></textarea>
                    </div>
                    <div class="btn" @click="saveDingzhi">提交</div>
                </div>
            </div>
        </div>

        <div class="todayorder boxwidth">
            <div class="todayorder-title">今日订单</div>
            <table class="todayorder-list" cellpadding="0" cellspacing="0">
                <thead>
                    <th>订单号</th>
                    <th>乘机人</th>
                    <th>出发日期</th>
                    <th>行程</th>
                    <th>记录编号</th>
                    <th>金额</th>
                    <th>预定时间</th>
                    <th>状态</th>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in orderList" :key="i">
                        <td  class="cur" @click="checkInfo(item.dcOrderID)">{{item.dcOrderID}}</td>
                        <td>{{item.dcLinkName}}</td>
                        <td>{{item.dcStartDate}}</td>
                        <td>{{item.dcStartCity}} - {{item.dcBackCity}}</td>
                        <td>{{item.dcOrderCode}}</td>
                        <td>{{item.dnTotalPrice}}</td>
                        <td>{{item.dtAddTime.replace('T', ' ')}}</td>
                        <td>{{item.dnStatus == 1?'处理完成':'等待处理'}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
            startCity: '',
            endCity: '',
            flightType: 0, // 1国际 0国内航线
            ticketType: 1, // 0直飞 1往返
            accountInfo: {
                id: '',
                username: '',
                password: ''
            },
            flightInfo: {
                startCity: '',
                startCityValue: '',
                startCityShort: '',
                startCityText: '',
                startCityPlaceholder: '出发地',
                endCity: '',
                endCityValue: '',
                endCityShort: '',
                endCityText: '',
                endCityPlaceholder: '目的地',
                startTime: '',
                endTime: ''
            },
            startCityList: [],
            gjendCityList: [],
            gnendCityList: [],
            startDateShow: false,
            endDateShow: false,
            visibleStartCity: false,
            visibleGJEndCity: false,
            visibleGNEndCity: false,
            startEndTime: '',
            startTime: '',
            linkmans: [],
            subCompanyLinkMans: [],
            other: {
                linkman: '',
                subc: 0
            },
            dzContent: '',
            orderList: [],
            page: 1
        }
    },
    components: {
        Header,
        Footer,
        Menu,
        ProgressBar
    },
    methods: {
        selCountry (v) {
            if (v) {
                this.flightType = 1
                this.ticketType = 1
            } else {
                this.flightType = 0
                this.ticketType = 0
            }
            this.flightInfo.endCityText = ''
            this.flightInfo.endCityShort = ''
            this.flightInfo.endCityValue = ''
            this.flightInfo.endCityPlaceholder = '目的地'
        },
        querySearch (queryString, cb) {
            if (queryString.indexOf('(') > 0) {
                queryString = ''
                this.flightInfo.startCityText = ''
                this.flightInfo.startCityPlaceholder = this.flightInfo.startCityValue + '(' + this.flightInfo.startCityShort + ')'
            }
            let res = this.startCityList
            let arr = []
            for (let i=0; i < res.length; i++) {
                for (let j=0; j < res[i].items.length; j++) {
                    let v = res[i].items[j]
                    if(v.airportname.indexOf(queryString) > -1 || v.name.indexOf(queryString) > -1 || v.enname.indexOf(queryString.toLocaleUpperCase()) > -1 || v.code.indexOf(queryString.toLocaleUpperCase()) > -1) {
                        v.value = v.airportname + ' ' + v.name + ' ' + v.enname + ' (' + v.code + ') ' + v.country,
                        v.address = ''
                        arr.push(v)
                    }
                }
            }
            cb(arr)
        },
        queryEndSearch (queryString, cb) {
            if (queryString.indexOf('(') > 0) {
                queryString = ''
                this.flightInfo.endCityText = ''
                this.flightInfo.endCityPlaceholder = this.flightInfo.endCityValue + '(' + this.flightInfo.endCityShort + ')'
            }
            let res = []
            if (this.flightType) {
                res = this.gjendCityList
            } else {
                res = this.gnendCityList
            }            
            let arr = []
            for (let i=0; i < res.length; i++) {
                for (let j=0; j < res[i].items.length; j++) {
                    let v = res[i].items[j]
                    if(v.airportname.indexOf(queryString) > -1 || v.name.indexOf(queryString) > -1 || v.enname.indexOf(queryString.toLocaleUpperCase()) > -1 || v.code.indexOf(queryString.toLocaleUpperCase()) > -1) {
                        v.value = v.airportname + ' ' + v.name + ' ' + v.enname + ' (' + v.code + ') ' + v.country,
                        v.address = ''
                        arr.push(v)
                    }
                }
            }
            cb(arr)
        },
        checkCity (v) {
            if (v) {
                if (this.flightInfo.endCityText != '' && this.flightInfo.endCityValue) {
                    this.flightInfo.endCityText = this.flightInfo.endCityValue + '(' + this.flightInfo.endCityShort + ')'
                } else if (this.flightInfo.endCityText == '' && this.flightInfo.endCityValue) {
                    this.flightInfo.endCityText = this.flightInfo.endCityValue + '(' + this.flightInfo.endCityShort + ')'
                } else {
                    this.flightInfo.endCityText = ''
                }
            } else {
                if (this.flightInfo.startCityText != '' && this.flightInfo.startCityValue) {
                    this.flightInfo.startCityText = this.flightInfo.startCityValue + '(' + this.flightInfo.startCityShort + ')'
                } else if (this.flightInfo.startCityText == '' && this.flightInfo.startCityValue) {
                    this.flightInfo.startCityText = this.flightInfo.startCityValue + '(' + this.flightInfo.startCityShort + ')'
                } else {
                    this.flightInfo.startCityText = ''
                }
            }
        },
        selStartCity: function(val){
            this.flightInfo.startCity = val.name
            this.flightInfo.startCityValue = val.airportname
            this.flightInfo.startCityShort = val.code
            this.flightInfo.startCityText = val.airportname + '(' + val.code + ')'
        },
        selEndCity: function(val){
            this.flightInfo.endCity = val.name
            this.flightInfo.endCityValue = val.airportname
            this.flightInfo.endCityShort = val.code
            this.flightInfo.endCityText = val.airportname + '(' + val.code + ')'
        },
        findFlight: function () {
            if (this.flightInfo.startCityShort === "") {
                this.utils.alert(this, '请选择出发城市')
            }else if (this.flightInfo.endCityShort === "") {
                this.utils.alert(this, '请选择到达城市')
            }else if (this.flightInfo.startTime === "") {
                this.utils.alert(this, '请选择出发时间')
            } else if (this.flightType === 1 && this.flightInfo.endTime === "") {
                this.utils.alert(this, '请选择返回时间')
            } else if (this.flightType === 1 && this.utils.dateTab(this.flightInfo.startTime, this.flightInfo.endTime)) {
                this.utils.alert(this, '返回时间不得早于出发时间')
            } else {
                this.utils.setItem("scity", this.flightInfo.startCity)
                this.utils.setItem("scode", this.flightInfo.startCityShort)
                this.utils.setItem("sflight", this.flightInfo.startCityValue)
                this.utils.setItem("ecity", this.flightInfo.endCity)
                this.utils.setItem("ecode", this.flightInfo.endCityShort)
                this.utils.setItem("eflight", this.flightInfo.endCityValue)
                this.utils.setItem("stime", this.flightInfo.startTime)
                this.utils.setItem("etime", this.flightInfo.endTime)
                this.utils.setItem("ttype", this.ticketType == 1)
                this.utils.setItem("ftype", this.flightType == 1)
                this.$router.push({
                    path: '/flightlist'
                })
            }
        },
        saveDingzhi () {
            if (this.dzContent != ''){
                let params = {
                    content: this.dzContent,
                    cid: this.accountInfo.id
                }
                this.utils.http({
                    name: this,
                    uri: '/order/submitdingzhiorder',
                    method: 'post',
                    params: params,
                    success: res=>{
                        if(res.status === 200 && res.data.status === 1){
                            this.MessageBox('下单成功！').then(action => {
                                this.$router.push({
                                    path: '/orderlist'
                                })
                            })                            
                        } else {
                            this.MessageBox('下单失败！', res.data.msg)
                        }
                    }
                })
            }
        },
        checkInfo (id) {
            this.$router.push({
                path: '/orderdetail?id=' + id
            })
        },
        getNowOrder () {
            this.utils.http({
                name: this,
                uri: '/order/GetNowOrder',
                params: {
                    params: {
                        cid: this.accountInfo.id,
                        page: this.page,
                        pagenum: 100
                    }
                },
                success: res=>{
                    if(res.data.status === 1){
                        this.orderList = res.data.data.data
                    }
                }
            })
        },
        getDefaultData () {
            let scode = this.utils.getItem("scode") || 'PEK'
            let ecode = this.utils.getItem("ecode") || 'CAN' // LAX
            let stime = this.utils.getItem("stime") || this.utils.dateFormat(this.utils.getAfterNDate(1,'d'),'yyyy-MM-dd')
            let etime = this.utils.getItem("etime") || this.utils.dateFormat(this.utils.getAfterNDate(2,'d'),'yyyy-MM-dd')
            let ttype = this.utils.getItem("ttype") || false
            let ftype = this.utils.getItem("ftype") || false
            let scity = this.utils.getItem("scity") || '北京'
            let ecity = this.utils.getItem("ecity") || '广州' // 洛杉矶  (加利福尼亚州) 
            let sflight = this.utils.getItem("sflight") || '北京首都机场'
            let eflight = this.utils.getItem("eflight") || '广州白云机场' // 洛杉矶国际机场
            console.log(ttype, ftype)
            if(ttype == false || ttype == 'false'){
                this.ticketType = 0
            } else {
                this.ticketType = 1
            }
            if(ftype == false || ftype == 'false'){
                this.flightType = 0
            } else {
                this.flightType = 1
            }
            this.flightInfo.startCity = scity
            this.flightInfo.startCityShort = scode
            this.flightInfo.startCityValue = sflight
            this.flightInfo.startCityText = sflight + '(' + scode + ')'
            this.flightInfo.endCity = ecity
            this.flightInfo.endCityShort = ecode
            this.flightInfo.endCityValue = eflight
            this.flightInfo.endCityText = eflight + '(' + ecode + ')'
            this.flightInfo.startTime = stime
            this.flightInfo.endTime = etime
        }
    },
    created () {
        const _account = sessionStorage.getItem('account')
        if (!_account) {
            this.MessageBox.alert('请登录').then(() => {
                this.$router.push({
                    path: '/'
                })
            })
        } else {
            let _user = JSON.parse(_account)
            this.accountInfo.username = _user.uname
            this.accountInfo.password = _user.upass
            this.accountInfo.id = _user.id
        }

        this.getDefaultData()

        // 获取城市列表
        getCityList(this)

        this.getNowOrder()

    }
}


//获取城市列表
function getCityList(vue){
    vue.utils.http({
        name: vue,
        uri: '/city/getallcity',
        success: res=>{
            if(res.data.status === 1){
                getStartCityList(vue, res.data.data.ds)
                getEndCityList(vue, res.data.data.ds1)
            }
        }
    })
}
//获取出发城市
function getStartCityList(vue, data){
    let sCity = data.sort(function(x,y){
        return x.pinyin.trim()>y.pinyin.trim()?1:-1
    })
    let sArr = [{
        index: '*',
        items: []
    }]
    let m = 1;
    for(let i = 65; i < 91; i++ ){
        sArr.push({
            index : String.fromCharCode(i),
            items : []
        })
    }
    for(let c in sCity){
        let g = sCity[c].pinyin.trim().substr(0,1).toLocaleUpperCase()
        if (sCity[c].hot == 1) {
            sArr[0].items.push(sCity[c])
        } else if(c != 0 && g != sArr[m].index && m<25){
            m++
        }
        if (sCity[c].hot != 1) {
            sArr[m].items.push(sCity[c])
        }
    }
    if (sArr[0].items.length < 1) {
        sArr.shift(0,1)
    }
    console.log(sArr)
    vue.startCityList = sArr
    vue.gnendCityList = sArr
}
//获取到达城市
function getEndCityList(vue, data){
    let eCity = data.sort(function(x,y){
        return x.pinyin.trim()>y.pinyin.trim()?1:-1
    })
    let eArr = [{
        index: '*',
        items: []
    }]
    let m = 1
    for(let i = 65; i < 91; i++ ){
        eArr.push({
            index : String.fromCharCode(i),
            items : []
        })
    }
    let len = eCity.length
    for(let a=0; a < len; a++){
        let g = eCity[a].pinyin.trim().substr(0,1).toLocaleUpperCase()
        if (eCity[a].hot == 1) {
            eArr[0].items.push(eCity[a])
        } else if(a && g != eArr[m].index && m<25){
            m++;
        }
        if (eCity[a].hot != 1) {
            eArr[m].items.push(eCity[a])
        }
    }
    if (eArr[0].items.length < 1) {
        eArr.shift(0,1)
    }
    vue.gjendCityList = eArr
}
</script>

<style lang="scss">
@import '@/assets/sass/public.scss';
.index-box{
    background: url($imguri + 'passenger-bg.png') no-repeat bottom center;
    background-size: auto 1200px;
    min-height: 1200px;
    box-sizing: border-box;
    .banner{
        background-image: url($imguri + 'banner.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 480px;
        display: block;
    }
    .bookbox{
        position: relative;
        top: 60px;
        @import '@/assets/sass/flightsearch.scss';
    }
    .todayorder{
        position: relative;
        top: 80px;
        .todayorder-title{
            height: 60px;
            line-height: 60px;
            padding-left: 5px;
            box-sizing: border-box;
        }
        .todayorder-list{
            width: 100%;
            background-color: #fff;
            box-shadow: 0 5px 20px #ccc;
            border: 0;
            text-align: center;
            > thead {
                background-color: #CCEBDB;
                border: 0;
                th {
                    height: 40px;
                    line-height: 40px;
                    border-left: 1px solid #fff;
                    box-sizing: border-box;
                }
                th:first-child{
                    border: 0;
                }
            }
            > tbody {
                tr {
                    td{
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px dotted #ccc;
                    }
                    .red {
                        color: #f00;
                    }
                    .cur{
                        color: #22a070;
                        cursor: pointer;
                    }              
                }
            }
        }
    }
}
</style>