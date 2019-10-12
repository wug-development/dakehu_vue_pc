<template>
    <div class="orderinfo-box">
        <Header></Header>
        <Menu t="order"></Menu>

        <div class="boxwidth orderinfo-box-title box-shadow">
            请仔细核对您的订单详情 <span>(取消此订单请联系管理员！)</span>
        </div>
        <div class="boxwidth orderinfo-box-body box-shadow">
            <div class="icon-back"></div>
            <div class="gn-box" v-if="orderInfo && orderInfo.dnOrderType == 0">
                <table class="detail" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td>订单号：</td>
                            <td>75770  张伟铃</td>
                            <td>预订时间 ：</td>
                            <td>2018/6/5  16:21:12</td>
                        </tr>
                        <tr>
                            <td>出发日期：</td>
                            <td>2018/6/17</td>
                            <td>订单状态：</td>
                            <td>等待处理</td>
                        </tr>
                        <tr>
                            <td>起落机场: </td>
                            <td>上海虹桥机场-北京首都机场</td>
                            <td>票号：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>航班号：</td>
                            <td>CA118</td>
                            <td>航站楼：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>起落时间：</td>
                            <td>10:55-11:55</td>
                            <td>CTCM：</td>
                            <td>18625435412</td>
                        </tr>
                        <tr>
                            <td>舱位：</td>
                            <td>经济舱</td>
                            <td>CTCT: </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>折扣：</td>
                            <td></td>
                            <td>记录编号：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>订单金额: </td>
                            <td>1260 ( 1180  + 税金 60 + 服务费 20 )*1人</td>
                            <td>备注：</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <table class="person-list" cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <th>乘机人</th>
                            <th>联系电话（CTCM)</th>
                            <th>证件类型</th>
                            <th>证件号码</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>徐坤（成人）</td>
                            <td>18625435412</td>
                            <td>身份证</td>
                            <td>26443556841422265</td>
                        </tr>
                        <tr>
                            <td>徐坤（成人）</td>
                            <td>18625435412</td>
                            <td>身份证</td>
                            <td>26443556841422265</td>
                        </tr>
                        <tr>
                            <td>徐坤（成人）</td>
                            <td>18625435412</td>
                            <td>身份证</td>
                            <td>26443556841422265</td>
                        </tr>
                        <tr>
                            <td>徐坤（成人）</td>
                            <td>18625435412</td>
                            <td>身份证</td>
                            <td>26443556841422265</td>
                        </tr>
                    </tbody>
                </table>               
            </div> 
            <div class="gj-box" v-if="orderInfo && orderInfo.dnOrderType == 1">
                <table class="detail" cellpadding="0" cellspacing="0">
                    <tbody>
                        <tr>
                            <td>订单编号：</td>
                            <td><span>{{orderInfo.dcOrderID}}</span>&nbsp;&nbsp;&nbsp;<label>{{orderInfo.dcAdminName}}</label></td>
                            <td>预订时间 ：</td>
                            <td>{{orderInfo.dtAddTime}}</td>
                            <td>订单状态：</td>
                            <td>{{orderInfo.dnStatus}}</td>
                            <td>出发日期：</td>
                            <td>{{orderInfo.dcStartDate}}</td>
                        </tr>
                        <tr>
                            <td>记录编号：</td>
                            <td>{{orderInfo.dcOrderCode}}</td>
                            <td>乘机人：</td>
                            <td>{{orderInfo.person.length> 0?orderInfo.person[0].pername:''}}</td>
                            <td>行程：</td>
                            <td>{{orderInfo.dcStartCity}}-{{orderInfo.dcBackCity}}</td>
                            <td>票号：</td>
                            <td>{{orderInfo.dcTicketNO}}</td>
                        </tr>
                        <tr>
                            <td>订单金额: </td>
                            <td colspan="7">{{orderInfo.dnTotalPrice}} ( {{orderInfo.dnPrice}}  + 税金 {{orderInfo.dnTax}} + 服务费 {{orderInfo.dnServicePrice}} )*{{orderInfo.person.length}}人</td>
                        </tr>
                    </tbody>
                </table>
                <div class="other">
                    <div>备注：</div>
                    <div class="txt">{{orderInfo.dcContent}}</div>
                </div>
                <div class="flight">
                    <div>行程：</div>
                    <table class="person-list flight-list" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th>出发日期</th>
                                <th>航班号</th>
                                <th>起飞（城市）/时间</th>
                                <th>到达（城市)/时间</th>
                                <th>航站楼</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in goFlightList" :key="i">
                                <td>{{orderInfo.dcStartDate}}</td>
                                <td>{{item.dcAirCode}}</td>
                                <td>{{item.dcSPortName}}/ {{item.dcSTime}}</td>
                                <td>{{item.dcEPortName}}/ {{item.dcETime}}</td>
                                <td>--号</td>
                            </tr>
                            <tr v-for="(f, j) in toFlightList" :key="j">
                                <td>{{orderInfo.dcBackDate}}</td>
                                <td>{{f.dcAirCode}}</td>
                                <td>{{f.dcSPortName}}/ {{f.dcSTime}}</td>
                                <td>{{f.dcEPortName}}/ {{f.dcETime}}</td>
                                <td>--号</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="person">
                    <div>乘机人信息</div>
                    <table class="person-list" cellpadding="0" cellspacing="0">
                        <thead>
                            <tr>
                                <th>乘机人</th>
                                <th>联系电话（CTCM)</th>
                                <th>证件类型</th>
                                <th>证件号码</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in orderInfo.person" :key="i">
                                <td>{{item.pername}}（{{item.type==1?'成人':'儿童'}}）</td>
                                <td>{{item.phone}}</td>
                                <td>{{orderInfo.dnOrderType == 1?'护照':'身份证'}}</td>
                                <td>{{orderInfo.dnOrderType == 1?item.pno:item.idcard}}</td>
                            </tr>
                        </tbody>
                    </table>    
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
export default {
    data () {
        return {
            orderID: '',
            orderInfo: {},
            toFlightList: [],
            goFlightList: []
        }
    },    
    components: {
        Header,
        Footer,
        Menu
    },
    created () {
        this.orderID = this.$route.query.id
        this.utils.http({
            name: this,
            uri: '/order/getorderinfo',
            params: {
                params: { id: this.orderID}
            },
            success: res=>{
                console.log(res)
                if(res.status === 200 && res.data.status === 1){
                    this.orderInfo = res.data.data
                    for (let i in this.orderInfo.flight) {
                        if (this.orderInfo.flight[i].dnFlightType === 0) {
                            this.goFlightList.push(this.orderInfo.flight[i])
                        } else {
                            this.toFlightList.push(this.orderInfo.flight[i])
                        }
                    }
                }
            }
        })
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.orderinfo-box{
    .orderinfo-box-title{
        margin-top: 50px;
        font-size: 16px;
        font-weight: bold;
        line-height: 20px;
        position: relative;
        background-color: #fff;
        padding: 25px 0 25px 25px;
        box-sizing: border-box;
        letter-spacing: 1;
        span{
            color: #fe7122;
            font-size: 14px;
        }
    }
    .orderinfo-box-title::before{
        content: "";
        position: absolute;
        left: 15px;
        top: 26px;
        height: 18px;
        border: 1.5px solid $pubcolor;
        box-sizing: border-box;
    }
    .orderinfo-box-body{
        margin-top: 20px;
        margin-bottom: 50px;
        padding: 30px;
        background-color: #fff;
        box-sizing: border-box;
        .icon-back{
            height: 22px;
            background: url('../assets/images/icon-left.png') no-repeat left center;
        }
        .person-list{
            margin-top: 50px;
            width: 720px;
            text-align: center;
            th{
                background-color: $pubcolor;
                color: #fff;
                height: 50px;
                font-weight: normal;
            }
            td{
                box-sizing: border-box;
                border-bottom: 1px solid #ccc;
                border-right: 1px solid #ccc;
                height: 50px;
            }
            td:nth-child(odd){
                width: 150px;
            }
            td:nth-child(even){
                width: 210px;
            }
            td:first-child{
                border-left: 1px solid #ccc;
            }
        }
        .gn-box{
            .detail{
                margin-top: 30px;
                width: 100%;
                tr:first-child td{
                    border-top: 1px solid #ccc;
                }
                td{
                    height: 50px;
                    border-bottom: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    box-sizing: border-box;
                }
                td:nth-child(1){
                    border-left: 1px solid #ccc;
                }
                td:nth-child(odd){
                    text-align: center;
                    background-color: #f1f1f1;
                    width: 170px;
                }
                td:nth-child(even){
                    width: 400px;
                    padding-left: 20px;
                }
            }
        }
        .gj-box{
            .detail{
                width: 100%;
                margin-top: 20px;
                td{
                    height: 40px;
                    span{
                        color: #67aef3;
                    }
                    label{
                        color: #fe7122;
                    }
                }
                td:nth-child(odd){
                    width: 100px;
                }
            }
            .other{
                margin-top: 20px;
                display: flex;
                div{                    
                    width: 100px;
                    line-height: 20px;
                }
                .txt{
                    width: 800px;
                    border: 1px solid #ccc;
                    min-height: 80px;
                    padding: 5px 15px;
                    box-sizing: border-box;
                    color: #666;
                    line-height: 30px;
                    background-color: #f8f8f8;
                }
            }
            .flight{
                margin-top: 30px;
                display: flex;
                div{                    
                    width: 100px;
                    line-height: 20px;
                }
                .flight-list{
                    width: 940px;
                    td:nth-child(odd){
                        width: auto;
                    }
                    td:nth-child(even){
                        width: auto;
                    }
                }
            }
            .person{
                margin-top: 30px;
                display: flex;
                div{                    
                    width: 100px;
                    line-height: 20px;
                }
            }
            .person-list{
                margin: 0;
            }
        }
    }
}
</style>