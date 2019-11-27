<template>
    <div class="flightlist-box">
        <Header></Header>
        <Menu t="index"></Menu>
        <ProgressBar p="1"></ProgressBar>

        <div v-loading="isLoading">
            <div class="boxwidth bookbox">
                <div class="padding">
                    <div class="menu">
                        <div @click="ticketType = 0" :class="'go' + (ticketType == 0?' cur':'')">单程</div>
                        <div v-if="flightType" @click="ticketType = 1" :class="'return' + (ticketType == 1?' cur':'')">往返</div>
                        <div @click="ticketType = 2" :class="'made' + (ticketType == 2?' cur':'')">定制</div>
                    </div>
                    <div class="go-return-box" v-if="ticketType != 2">
                        <div class="out">
                            <el-autocomplete class="inline-input" :clearable="false" v-model="flightInfo.startCityText" :fetch-suggestions="querySearch" placeholder="出发地" @blur="checkCity(0)" @select="selStartCity" ></el-autocomplete>
                        </div>
                        <div class="daoda">
                            <el-autocomplete class="inline-input" :clearable="false" v-model="flightInfo.endCityText" :fetch-suggestions="queryEndSearch" placeholder="出发地" @blur="checkCity(1)" @select="selEndCity" ></el-autocomplete>
                        </div>
                        <div class="outdate">
                            <el-date-picker v-model="flightInfo.startTime" type="date" value-format="yyyy-MM-dd" placeholder="选择出发日期"> </el-date-picker>
                        </div>
                        <div class="daodadate" v-if="ticketType">
                            <el-date-picker v-model="flightInfo.endTime" type="date" value-format="yyyy-MM-dd" placeholder="选择返回日期"> </el-date-picker>
                        </div>
                        <div class="btn" @click="findFlight">搜索</div>
                    </div>
                    <div class="made-box" v-else>
                        <div class="text-box">
                            <textarea id="txt_made" cols="30" rows="10" placeholder="请尽量详细描述您的航班需求，以便我们能更好为您量身设计行程！"></textarea>
                        </div>
                        <div class="btn">搜索</div>
                    </div>
                </div>
            </div>

            <!--国际列表-->
            <div class="flight-search boxwidth" v-if='flightType'>
                <div class="flight-search-title"><span class="go">{{flightInfo.startCity}}</span> <span class="icon-go"></span> <span class="mudi">{{flightInfo.endCity}}</span> <span class="ltype s">（{{flightInfo.ticketType==1?'往返':'单程'}}）</span> <span class="gdate s">{{flightInfo.startTime}}</span></div>
                <ul class="flight-search-list" v-if="startList.length > 0">
                    <li class="thead">
                        <div class="w15">航空公司</div>
                        <div class="w18">航班信息</div>
                        <div class="w15">出发机场</div>
                        <div class="w12"></div>
                        <div class="w15">到达机场</div>
                        <div class="w12"></div>
                        <div class="w11">票价+税金</div>
                        <div class="w12"></div>
                    </li>
                    <li class="tbody" v-for="(item, i) in startList" :key="i">
                        <div class="tbody-flg">
                            <div class="w15 flg-company flg-flex">
                                <div><img :src="item[0].airinfo.Picture" alt=""></div>
                                <div>{{item[0].airinfo.CompanyName}}</div>
                            </div>
                            <div class="w60">
                                <div class="flg-airinfo-port">
                                    <div class="w18 flg-info">
                                        <div class="flg-info-type flg-flex">
                                            <div v-if="flightInfo.ticketType == 1">去程</div>
                                            <div>{{item[0].otherFlight.length > 0? item[0].otherFlight.length + "次转机":"直飞"}}</div>
                                        </div>
                                        <div class="flg-info-model">
                                            <div>
                                                <div class="jixing">{{item[0].AirCode}}</div>
                                                <div>机型：<span>{{item[0].Jixing}}</span></div>
                                            </div>
                                            <div v-for="(f, index) in item[0].otherFlight" :key="index">
                                                <div class="jixing">{{f.AirCode}}</div>
                                                <div>机型：<span>{{f.Jixing}}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w15 flg-airport">
                                        <div>
                                            <div>{{item[0].SPortName}}</div>
                                            <span><span>{{item[0].STime}}</span><span>出发</span></span>
                                        </div>
                                        <div v-for="(f, index) in item[0].otherFlight" :key="index">
                                            <div>{{f.SPortName}}</div>
                                            <span><span>{{f.STime}}</span><span>出发</span></span>
                                        </div>
                                    </div>
                                    <div class="w12 flg-icon"></div>
                                    <div class="w15 flg-airport">
                                        <div>
                                            <div>{{item[0].EPortName}}</div>
                                            <span><span>{{item[0].ETime}}</span><span>到达</span></span>
                                        </div>
                                        <div v-for="(f, index) in item[0].otherFlight" :key="index">
                                            <div>{{f.EPortName}}</div>
                                            <span><span>{{f.ETime}}</span><span>到达</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="flg-airinfo-port flg-air-back" v-if="flightInfo.ticketType && backList.length > 0">
                                    <div class="w18 flg-info">
                                        <div class="flg-info-type flg-flex">
                                            <div v-if="flightInfo.ticketType == 1">回程</div>
                                            <div>{{backList[i][0].otherFlight.length > 0? backList[i][0].otherFlight.length + "次转机":"直飞"}}</div>
                                        </div>
                                        <div class="flg-info-model">
                                            <div>
                                                <div class="jixing">{{backList[i][0].AirCode}}</div>
                                                <div>机型：<span>{{backList[i][0].Jixing}}</span></div>
                                            </div>
                                            <div v-for="(f, index) in backList[i][0].otherFlight" :key="index">
                                                <div class="jixing">{{f.AirCode}}</div>
                                                <div>机型：<span>{{f.Jixing}}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w15 flg-airport">
                                        <div>
                                            <div>{{backList[i][0].SPortName}}</div>
                                            <span><span>{{backList[i][0].STime}}</span><span>出发</span></span>
                                        </div>
                                        <div v-for="(f, index) in backList[i][0].otherFlight" :key="index">
                                            <div>{{f.SPortName}}</div>
                                            <span><span>{{f.STime}}</span><span>出发</span></span>
                                        </div>
                                    </div>
                                    <div class="w12 flg-icon"></div>
                                    <div class="w15 flg-airport">
                                        <div>
                                            <div>{{backList[i][0].EPortName}}</div>
                                            <span><span>{{backList[i][0].ETime}}</span><span>到达</span></span>
                                        </div>
                                        <div v-for="(f, index) in backList[i][0].otherFlight" :key="index">
                                            <div>{{f.EPortName}}</div>
                                            <span><span>{{f.ETime}}</span><span>到达</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w12 flg-more flg-flex">
                                <div v-if="item.length > 1" class="cur">
                                    <span v-if="showMore === i" @click="showMore = ''">收起</span>
                                    <span v-else @click="showMore = i">更多航班</span>
                                </div>
                                <div v-else>更多航班</div>
                            </div>
                            <div class="w11 flg-moneyfix flg-flex">
                                <div class="flg-money"><span>&yen;</span>{{item[0].piaojia.TicketPrice}}</div>
                                <div class="flg-fix">税金：&asymp;&yen;{{flightInfo.ticketType == 1?item[0].jipiao.WFS:item[0].jipiao.DCS}}</div>
                            </div>
                            <div class="w12 flg-handle flg-flex">
                                <div class="flg-btn pubbtn" @click="selFlight(item[0].AirID,i,item[0].STime,item[0].AirCode,flightInfo.ticketType)">预定</div>
                                <div class="flg-btn-changecontent">
                                    退改签说明
                                    <div class="content-layer" v-html="checkContent(item[0].piaojia.beizhu)"></div>
                                </div>
                            </div>
                        </div>
                        <div class="more-go-return" v-if="item.length > 1 && showMore === i">
                            <div>
                                <div class="grtitle"><div>去程</div></div>
                                <ul class="grlist">
                                    <li class="gritem" v-for="(f, j) in item" :key="j" v-if="j != 0" @click="changeGoFlight(item[0], item[j], i, j)">
                                        <div>
                                            <div class="gritem-airmodel">
                                                <span>{{f.AirCode}}</span>
                                                <div>机型：<span>{{f.Jixing}}</span></div>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{f.SPortName}}</div>
                                                <span>起飞：{{f.STime}}</span>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{f.EPortName}}</div>
                                                <span>到达：{{f.ETime}}</span>
                                            </div>
                                        </div>
                                        <div v-for="(o, k) in f.otherFlight" :key="k">
                                            <div class="gritem-airmodel">
                                                <span>{{o.AirCode}}</span>
                                                <div>机型：<span>{{o.Jixing}}</span></div>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{o.SPortName}}</div>
                                                <span>起飞：{{o.STime}}</span>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{o.EPortName}}</div>
                                                <span>到达：{{o.ETime}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div v-if="flightInfo.ticketType && backList.length > 0">
                                <div class="grtitle"><div>回程</div></div>
                                <ul class="grlist">
                                    <li class="gritem" v-for="(f, j) in backList[i]" :key="j" v-if="j != 0" @click="changeBackFlight(backList[i][0], f, i, j)">
                                        <div>
                                            <div class="gritem-airmodel">
                                                <span>{{f.AirCode}}</span>
                                                <div>机型：<span>{{f.Jixing}}</span></div>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{f.SPortName}}</div>
                                                <span>起飞：{{f.STime}}</span>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{f.EPortName}}</div>
                                                <span>到达：{{f.ETime}}</span>
                                            </div>
                                        </div>
                                        <div v-for="(o, k) in f.otherFlight" :key="k">
                                            <div class="gritem-airmodel">
                                                <span>{{o.AirCode}}</span>
                                                <div>机型：<span>{{o.Jixing}}</span></div>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{o.SPortName}}</div>
                                                <span>起飞：{{o.STime}}</span>
                                            </div>
                                            <div class="gritem-airport">
                                                <div>{{o.EPortName}}</div>
                                                <span>到达：{{o.ETime}}</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <!--国内列表-->
            <div class="flight-search boxwidth" v-else>
                <div class="flight-search-title"><span class="go">{{this.flightInfo.startCity}}</span> <span class="icon-go"></span> <span class="mudi">{{this.flightInfo.endCity}}</span> <span class="ltype s">（单程）</span> <span class="gdate s">{{this.flightInfo.startTime}}</span></div>
                <ul class="flight-search-list">
                    <li class="thead">
                        <div class="w26">航空公司/舱位/航班号</div>
                        <div class="w10">起降时间</div>
                        <div class="w15">起降机场</div>
                        <div class="w15">价格/折扣（不含税费）</div>
                        <div class="w12"></div>
                    </li>
                    <li class="tbody" v-for="(item, i) in dataList" :key="i">
                        <div class="tbody-flg">
                            <div class="w26 flg-airinfo flg-flex">
                                <div>
                                    <div class="flg-airinfo-logo"><img :src="'/icons/' + (item.flightNo.substr(0,2)) + '.gif'" alt=""></div>
                                    <div class="flg-airinfo-company">
                                        <div>{{checkAirCompany(item.flightNo.substr(0,2))}}</div> 
                                        <span>机型：<span>{{item.planeType}}</span></span>
                                    </div>
                                    <div class="flg-airinfo-site">
                                        <div>{{item.flightNo}}</div>
                                        <span>({{item.seatItems[0].seatMsg.replace("特价舱","特价经济舱")}})</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w10 flg-airtime flg-flex">
                                <div>{{item.depTime.substr(0,2) + ':' + item.depTime.substr(2,2)}}<span>出发</span></div>
                                <div>{{item.arriTime.substr(0,2) + ':' + item.arriTime.substr(2,2)}}<span>到达</span></div>
                            </div>
                            <div class="w15 flg-airport flg-flex">
                                <div>
                                    <div>{{checkAirPort(item.orgCity)}}{{item.orgJetquay || ''}}</div>
                                    <div>{{checkAirPort(item.dstCity)}}{{item.dstJetquay || ''}}</div>
                                </div>
                            </div>
                            <div class="w15 flg-moneyfix flg-flex">
                                <div class="flg-money"><span>&yen;</span>{{item.seatItems[0].parPrice}}</div>
                                <div class="flg-fix">{{ReturnDisCount(item.seatItems[0].discount)}}  
                                    <span class="flg-moneyfix-tgq" @mouseover="checkTGQ(item.flightNo.substr(0,2), item.seatItems[0].seatCode, i, 0)">
                                        退改签
                                        <label class="tgq" v-html="item.seatItems[0].param4"></label>
                                    </span>
                                </div>
                            </div>
                            <div class="w12 flg-handle flg-flex">
                                <div class="flg-btn pubbtn" @click="bookFlight(item, item.seatItems[0])">预定</div>
                                <div v-if="item.seatItems.length > 1" :class='"flg-btn-changecontent" + (selMore == item.flightNo?" flg-btn-more":"")' @click="checkMore(item.flightNo)">更多航班</div>
                            </div>
                        </div>
                        <ul class="flg-morelist" v-show="selMore == item.flightNo">
                            <li class="flg-morelist-item" v-for="(f, index) in item.seatItems" :key="index" v-if="index > 0">
                                <div class="w26 flg-company flg-flex"></div>
                                <div class="w10 flg-airtime flg-flex"></div>
                                <div class="w15 flg-airport flg-flex">
                                    <div>
                                        <div>{{f.seatMsg.replace("特价舱","特价经济舱")}}</div>
                                    </div>
                                </div>
                                <div class="w15 flg-moneyfix flg-flex">
                                    <div class="flg-money"><span>&yen;</span>{{f.parPrice}}</div>
                                    <div class="flg-fix">{{ReturnDisCount(f.discount)}} 
                                        <span class="flg-moneyfix-tgq" @mouseover="checkTGQ(item.flightNo.substr(0,2), f.seatCode, i, index)">
                                            退改签
                                            <label class="tgq" v-html="f.param4"></label>
                                        </span>
                                    </div>
                                </div>
                                <div class="w12 flg-handle flg-flex">
                                    <div class="flg-btn pubbtn" @click="bookFlight(item, f)">预定</div>
                                </div>
                            </li>                     
                        </ul>
                        <div class="flg-other">
                            <span>机建+燃油：{{item.airportTax}}+{{item.fuelTax}}元</span>
                            <span>飞行时间：{{checkTime(item.depTime,item.arriTime)}}</span>
                        </div>
                    </li>
                </ul>
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
            isLoading: false,
            accountInfo: {
                id: '',
                username: '',
                password: ''
            },
            flightType: 1, // 1国际 0国内航线
            ticketType: 1, // 0直飞 1往返
            flightInfo: {
                flightType: 1, // 1国际 0国内航线
                ticketType: 1, // 0直飞 1往返
                startCity: '',
                startCityValue: '',
                startCityShort: '',
                startCityText: '',
                endCity: '',
                endCityValue: '',
                endCityShort: '',
                endCityText: '',
                startTime: '',
                endTime: ''
            },
            startCityList: [],
            gjendCityList: [],
            gnendCityList: [],
            startList: [],
            backList: [],
            airCompany: [],
            airPort: [],
            dataList: [],
            selMore: '',
            showMore: ''
        }
    },
    methods: {
        querySearch (queryString, cb) {
            let res = this.startCityList
            let arr = []
            for (let i=0; i < res.length; i++) {
                for (let j=0; j < res[i].items.length; j++) {
                    let v = res[i].items[j]
                    if(v.airportname.indexOf(queryString) > -1 || v.name.indexOf(queryString) > -1 || v.enname.indexOf(queryString.toLocaleUpperCase()) > -1 || v.code.indexOf(queryString) > -1) {
                        v.value = v.airportname + ' ' + v.name + ' ' + v.enname + ' (' + v.code + ') ' + v.country,
                        v.address = ''
                        arr.push(v)
                    }
                }
            }
            cb(arr)
        },
        queryEndSearch (queryString, cb) {
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
                    if(v.airportname.indexOf(queryString) > -1 || v.name.indexOf(queryString) > -1 || v.enname.indexOf(queryString.toLocaleUpperCase()) > -1 || v.code.indexOf(queryString) > -1) {
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
                } else {
                    this.flightInfo.endCityText = ''
                }
            } else {
                if (this.flightInfo.startCityText != '' && this.flightInfo.startCityValue) {
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
        changeGoFlight (v1, v2, i, j) {
            let obj = JSON.stringify(v1)
            this.startList[i][0] = JSON.parse(JSON.stringify(v2))
            this.startList[i][j] = JSON.parse(obj)
            this.$forceUpdate();
        },
        changeBackFlight (v1, v2, i, j) {
            let obj = JSON.stringify(v1)
            this.backList[i][0] = JSON.parse(JSON.stringify(v2))
            this.backList[i][j] = JSON.parse(obj)
            this.$forceUpdate();
        },
        checkContent (v) {
            return v.replace(/\n/g,"<br/>")
        },
        findFlight: function () {
            if (this.flightInfo.startCityShort === "") {
                this.utils.alert(this, '请选择出发城市')
            }else if (this.flightInfo.endCityShort === "") {
                this.utils.alert(this, '请选择到达城市')
            }else if (this.flightInfo.startTime === "") {
                this.utils.alert(this, '请选择出发时间')
            } else if (this.ticketType === 1 && this.flightInfo.endTime === "") {
                this.utils.alert(this, '请选择返回时间')
            } else if (this.utils.dateTab(this.flightInfo.startTime, this.flightInfo.endTime)) {
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
                this.utils.setItem("ttype", this.ticketType)
                this.utils.setItem("ftype", this.flightType)

                this.flightInfo.ticketType = this.ticketType
                this.flightInfo.flightType = this.flightType

                let param = {
                    params: {
                        'scode': this.flightInfo.startCityShort,
                        'ecode': this.flightInfo.endCityShort,
                        'type': this.ticketType
                    }
                }
                if (this.flightInfo.ticketType) {
                    getFightList(this, param)
                } else {
                    this.getGNFlightList()
                }
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
                            this.MessageBox('下单成功！', res.data.msg)
                        }
                    }
                })
            }
        },
        selFlight: function(id, i, stime, scode, ftype){
            let s = [];
            s.push(this.startList[i][0])
            this.utils.setItem('startFlight', JSON.stringify(s))
            this.utils.setItem('sairtime', stime)
            this.utils.setItem('saircode', scode)
            this.utils.setItem('sairid', id)
            this.utils.setItem('flightinfo', JSON.stringify(this.flightInfo))
            
            if(ftype){
                let e = [];
                e.push(this.backList[i][0])
                this.utils.setItem('backFlight', JSON.stringify(e))
            }
            this.$router.push({ path: '/flightinfo' })
        },
        getGNFlightList () {
            this.isLoading = true
            // 获取航班
            this.$http.get(this.urim + '/flight/getgnflights', {params: {
                scity: this.flightInfo.startCityShort,
                ecity: this.flightInfo.endCityShort,
                sdate: this.flightInfo.startTime
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    var _d = res.data.data
                    if (_d.data.returnCode === 'S') {
                        this.airCompany = _d.airCompany
                        this.airPort = _d.airPort
                        this.dataList = _d.data.flightItems[0].flights
                    }
                }
                this.isLoading = false
            }).catch(res => {
                this.isLoading = false
            })
        },
        checkCompany: function () {
            this.selChildCompany = ''
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childCompany = res.data.data
                }
            })
        },
        checkMore (v) {
            if (this.selMore == v) {
                this.selMore = ''
            } else {
                this.selMore = v
            }
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
        checkAirPort (v) {
            let txt = '';
            if (v) {
                for (let i=0; i<this.airPort.length; i++) {
                    if (this.airPort[i].dcCode == v) {
                        txt = this.airPort[i].dcAirPortName
                        break;
                    }
                }
            }
            return txt
        },
        ReturnDisCount (discount){
            var str = "";
            if (parseFloat(discount) * 10 >= 10)
            {
                str = "全价";
            }
            else
            {
                str = parseFloat(parseFloat(discount) * 10).toFixed(1) + "折";
            }
            return str;
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
        checkTGQ (v, code, m, n) {
            // 获取退改签
            if (!this.dataList[m].seatItems[n].param4) {
                this.$http.get(this.uris + '/flight/getflighttgq', {params: {
                    flightNo: v,
                    seatCode: code
                }})
                .then(res => {
                    if (res && res.data && res.data.status != 0) {
                        var _o = res.data.data.replace('更改条件', '<b>更改条件</b>').replace('退票条件', '<br/><b>退票条件</b>').replace('签转条件', '<br/><b>签转条件</b>')
                        if (_o == '') {
                            this.dataList[m].seatItems[n].param4 = '未找到条件';
                        } else {
                            this.dataList[m].seatItems[n].param4 = _o;
                        }
                    }
                })
            }
        },
        bookFlight (item, f) {
            this.utils.setItem('selFlight', JSON.stringify(item))
            this.utils.setItem('bookFlightSeat', JSON.stringify(f))
            this.$router.push({ path: '/gnflightinfo' })
        }
    },
    components: {
        Header,
        Footer,
        Menu,
        ProgressBar
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
            this.flightInfo.ticketType = 0
        }
        if(ftype == false || ftype == 'false'){
            this.flightType = 0
            this.flightInfo.flightType = 0
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
        
        // 获取城市列表
        getCityList(this)

        let param = {
            params: {
                'scode': scode,
                'ecode': ecode,
                'type': ttype
            }
        }
        
        if (this.flightType) {
            getFightList(this, param)
        } else {
            this.getGNFlightList()
        }
    }
}

//获取航班线路
function getFightList(vue, param){
    vue.isLoading = true
    vue.utils.http({
        uri: '/flight/getflightlist',
        params: param,
        name: vue,
        success: res => {
            if(res.data.status === 1 && res.data.data.hangxian.length > 0){
                let data = res.data.data
                let slist = []; //去程列表
                let elist = []; //返程列表
                let clist = []; //航空公司列表
                let alist = []; //机型列表
                let month = parseInt(vue.flightInfo.startTime.split('-')[1])
                let len = data.hangxian.length
                //单程
                for(let i=0, j=0; i<len; i++){
                    let item = data.hangxian[i]
                    if(item.length>0){
                        let sm = vue.flightInfo.startTime.split('-')[1]
                        let piaojia = getPiaojia(data.piaojia[i], parseInt(sm))
                        if(piaojia){
                            clist.push(item[0].CompanyCode)
                            for(let m=0; m<item.length; m++){
                                item[m].otherFlight = data.zhuanji[i][m]
                                item[m].piaojia = piaojia
                                item[m].jipiao = data.jipiao[i]
                                item[m].index = j
                                alist.push(item[m].Jixing)
                            }
                            j++
                            slist.push(item)
                        }
                    }
                }
                //返程
                if(vue.flightInfo.flightType === 1){
                    for(let i=0; i<len; i++){
                        let item = data.hangxianS[i]
                        if(item.length>0){           
                            let em = vue.flightInfo.endTime.split('-')[1]
                            let dnum = DateDiff(vue.flightInfo.startTime, vue.endDate)
                            let piaojia = getPiaojia(data.piaojia[i], em, dnum)
                            if(piaojia){     
                                clist.push(item[0].CompanyCode)
                                for(let m=0; m<item.length; m++){
                                    item[m].otherFlight = data.zhuanjiS[i][m]
                                    item[m].piaojia = piaojia
                                    item[m].jipiao = data.jipiao[i]
                                    alist.push(item[m].Jixing)
                                }
                                elist.push(item)
                            }
                        }
                    }
                }
                
                vue.utils.ajax({
                    uri: 'FindAirComJixingServlet',
                    params: {
                        params: {
                            aircom: JSON.stringify(clist),
                            jixing: JSON.stringify(alist)
                        }
                    },
                    name: vue,
                    success: regs => {
                        if(regs.status === 200 && regs.data.airInfo.length > 0){
                            len = slist.length
                            for(let i=0; i<len; i++){
                                let sitem = slist[i]
                                for(let m=0; m<sitem.length; m++){
                                    sitem[m].airinfo = regs.data.aircomInfo[i]
                                }
                                if(vue.flightType === 1){
                                    let eitem = elist[i]
                                    for(let n=0; n<eitem.length; n++){
                                        eitem[n].airinfo = regs.data.aircomInfo[len+i]
                                    }
                                }
                            }

                            let m = 0;
                            for(let i=0; i<slist.length; i++){
                                for(let j in slist[i]){
                                    slist[i][j].airtype = regs.data.airInfo[m++]
                                }
                            }
                            vue.startList = compare(slist)
                            if(vue.flightType === 1){
                                for(let i=0; i<elist.length; i++){
                                    for(let j in elist[i]){
                                        elist[i][j].airtype = regs.data.airInfo[m++]
                                    }
                                }
                                vue.backList = compare(elist)
                            }
                            vue.isLoading = false
                        }else{
                            vue.isLoading = false
                            vue.notFind = true
                        }
                    },
                    fail: ()=>{
                        vue.isLoading = false
                        vue.notFind = true
                    }
                })
            }else{
                vue.isLoading = false
                vue.notFind = true
            }
        },
        fail: ()=>{
            vue.isLoading = false
            vue.notFind = true
        }
    })
}

//获取票价
function getPiaojia(pj, m, num){
    let list = []
    let dt = {}
    let len = pj.length
    if(len > 0){
        list = pj.filter(function(x){
            return parseInt(x.startM) <= parseInt(m) && parseInt(m) <= parseInt(x.endM)
        })
        list.sort(function(x,y){
            return parseInt(x.TicketPrice) - parseInt(y.TicketPrice)
        })
        dt = list[0]
    }
    return dt
}

//获取天数
function DateDiff(d1, d2) {
    var day = 24 * 60 * 60 * 1000;
    try {
        var dateArr = d1.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1] - 1, dateArr[2]);
        var checkTime = checkDate.getTime();

        var dateArr2 = d2.split("-");
        var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1] - 1, dateArr2[2]);
        var checkTime2 = checkDate2.getTime();

        var cha = Math.ceil((checkTime - checkTime2) / day);
        return cha;
    } catch (e) {
        return 0;
    }
}

//航班排序
function compare(dlist){
    let zf = [];
    let zz = [];
    zf = dlist.filter(function(i){
        return i[0].otherFlight.length<1
    })
    zz = dlist.filter(function(i){
        return i[0].otherFlight.length>0 && i[0].piaojia
    })
    zf.sort(function(x,y){
        return parseInt(x[0].piaojia.TicketPrice) - parseInt(y[0].piaojia.TicketPrice)
    })
    zz.sort(function(x,y){
        return parseInt(x[0].piaojia.TicketPrice) - parseInt(y[0].piaojia.TicketPrice)
    })
    return zf.concat(zz)
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
@import '@/assets/sass/set.scss';
.flightlist-box{
    .bookbox{
        margin-top: 40px;
        @import '@/assets/sass/flightsearch.scss';
        .btn{
            margin: 0 !important;
        }
    }
    .flight-search{
        margin-top: 20px;
        padding-bottom: 20px;
        .flight-search-title{
            padding: 20px 0 20px 20px;
            display: flex;
            font-size: 16px;
            color: #000;            
            .icon-go{
                width: 40px;
                background: url('../assets/images/icon_list_go.png') no-repeat;
                background-position: center;                
            }
            .s{
                font-size: 14px;
                color: #666;
            }
        }
        .flight-search-list{
            width: 100%;
            min-height: 260px;
            .thead {
                background-color: #333333;
                color: #fff;
                display: flex;
                height: 40px;
                line-height: 40px;
                justify-content: space-around;
                text-align: center;
            }
            .tbody{
                margin-top: 10px;
                border-top: 5px solid $pubcolor;
                background-color: #fff;   
                .tbody-flg{
                    min-height: 80px;
                    line-height: 30px;
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    text-align: center;
                    box-shadow: 0 2px 4px #ededed;
                    padding: 10px 0;                 
                }                
                .flg-flex{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }
                .flg-company{
                    box-sizing: border-box;
                    img{
                        display: block;
                        margin: 0 auto;
                    }
                }
                .flg-airinfo-port{
                    display: flex;
                }
                .flg-air-back{
                    border-top: 1px dotted #ccc;
                }
                .flg-info{
                    display: flex;
                    .flg-info-type{
                        color: #747474;
                        line-height: 20px;
                        width: 80px;
                        div:nth-child(1){
                            color: #1c87ca;
                        }
                    }
                    .flg-info-model{
                        width: 100px;
                        padding-left: 20px;
                        box-sizing: border-box;
                        text-align: left;
                        > div {
                            line-height: 20px;
                            padding: 10px 0;
                            span{
                                color: #4eb0e4;
                            }
                        }
                        .jixing{
                            color: #000;
                        }
                    }        
                }
                .flg-airport{
                    color: #000;
                    > div{
                        padding: 5px 0;
                        color: #000;
                        line-height: 22px;
                        > div{
                            margin-bottom: 6px;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }
                        > span{
                            color: #747474;
                            span{
                                margin: 0 10px;
                            }                            
                        }
                    }
                }
                .flg-icon{
                    background: url('../assets/images/icon_list_goback.png') no-repeat;
                    background-position: center;
                }
                .flg-more{
                    div{
                        width: 90px;
                        height: 20px;
                        line-height: 20px;
                        border: 1px solid #b1b0b0;
                        color: #b1b0b0;
                        span{
                            display: block;
                        }
                    }
                    .cur{
                        border: 1px solid #fe7122;
                        color: #fe7122;
                        cursor: pointer;
                    }
                }
                .flg-moneyfix{
                    line-height: 24px;
                    align-items: flex-start;
                    padding-left: 10px;
                    box-sizing: border-box;
                    .flg-money{
                        color: #f00;
                        font-size: 16px;
                        font-weight: bold;
                        span{
                            font-size: 12px;
                        }
                    }
                    .flg-fix{                        
                        color: #b1b0b0;
                        .flg-moneyfix-tgq{
                            position: relative;
                            color: #4eb0e4;
                            cursor: pointer;
                            .tgq{
                                display: none;
                                position: absolute;
                                z-index: 99999;
                                width: 240px;
                                left: 0;
                                top: 15px;
                                border: 1px solid $pubcolor;
                                background-color: #fff;
                                padding: 10px 6px;
                                box-sizing: border-box;
                                text-align: left;
                                color: #777;
                                b{
                                    color: #000;
                                }
                            }
                        }
                        span:hover .tgq{
                            display: block;
                        }
                    }
                }
                .flg-handle{
                    .flg-btn{
                        width: 90px;
                        padding: 6px 20px;
                        box-sizing: border-box;
                        border-radius: 5px;
                    }
                    .flg-btn-changecontent{
                        color: #fe7122;
                        line-height: 20px;
                        cursor: pointer;
                        position: relative;
                        padding-right: 10px;
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
                        }
                    }
                    .flg-btn-changecontent:hover{
                        .content-layer{
                            display: block;
                        }
                    }
                    .flg-btn-more{
                        color: #fe7122;
                    }
                    .flg-btn-changecontent::after{
                        content: ' ';
                        position: absolute;
                        right: -2px;
                        top: 7px;
                        width:0;
                        height:0;
                        border-width:6px 6px 0;
                        border-style:solid;
                        border-color:#fe7122 transparent transparent;/*灰 透明 透明 */
                    }
                    .flg-btn-more::after{
                        content: '';
                        position: absolute;
                        top: 0;
                        right: -2px;
                        border-width:6px;
                        border-style:solid;
                        border-color: transparent transparent #fe7122 transparent;
                    }
                }             
                .flg-morelist{
                    width: 1200px;
                    .flg-morelist-item{
                        display: flex;
                        justify-content: space-around;
                        flex-wrap: wrap;
                        text-align: center;
                        border-top: 1px dotted #ccc;
                        padding: 10px 0;
                    }
                    .flg-morelist-item:first-child{
                        border: 0;
                    }
                }
                .flg-airinfo{
                    > div {
                        display: flex;
                        width: 100%;
                        text-align: left;
                        .flg-airinfo-logo{
                            width: 50px;
                            padding-top: 16px;
                        }
                        .flg-airinfo-company{
                            width: 100px;
                            div{
                                color: #000;
                                font-size: 16px;
                            }
                            >span{
                                font-size: 14px;
                                color: #999;
                                span{
                                    color: #4eb0e4;
                                }
                            }
                        }
                        .flg-airinfo-site{
                            font-size: 14px;
                            color: #999;
                            div{
                                color: #000;
                            }
                        }
                    }                    
                }
                .flg-airtime{
                    span{
                        margin: 0 10px;
                        color: #999;
                    }
                }
                .flg-other{
                    height: 40px;
                    line-height: 40px;
                    border-top: 1px dashed #999;
                    padding-left: 80px;
                    box-sizing: border-box;
                    span{
                        margin-right: 40px;
                    }
                }
            }
            .w15{
                width: 150px;
            }
            .w10{
                width: 100px;
            }
            .w11{
                width: 110px;
            }
            .w12{
                width: 120px;
            }
            .w18{
                width: 180px;
            }
            .w20{
                width: 200px;
            }
            .w26{
                width: 260px;
            }
            .w60{
                width: 600px;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            }
        }
        .more-go-return{
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            > div {
                width: 590px;
                box-sizing: border-box;
                > .grtitle{
                    border-bottom: 1px solid $pubcolor;
                    padding-left: 10px;
                    box-sizing: border-box;
                    >div{
                        height: 20px;
                        line-height: 20px;
                        width: 50px;
                        background-color: $pubcolor;
                        color: #fff;
                        text-align: center;
                    }
                }
                > .grlist{
                    padding: 0 10px;
                    .gritem{
                        padding: 5px 0;
                        border-bottom: 1px dotted #ccc;
                        cursor: pointer;
                        > div {
                            display: flex;
                            .gritem-airmodel{
                                text-align: center;
                                width: 100px;
                                >span{
                                    color: #000;
                                }
                                >div {
                                    color: #999;
                                    span{
                                        color: #4eb0e4;
                                    }
                                }
                            }
                            .gritem-airport{
                                margin-left: 60px;
                                width: 150px;
                                text-align: center;
                                div{
                                    color: #000;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    white-space: nowrap;
                                }
                                span{
                                    color: #999;
                                }
                            }
                        }
                    }
                    .gritem:hover{
                        background-color: #e3ebe9;
                    }
                }
            }
        }
    }
}
</style>