<template>
    <div class="payrecord-box">
        <Header></Header>
        <Menu t="record"></Menu>

        <div class="payrecord-box-body">
            <div class="boxwidth payrecord-money-box">
                <div class="money fukuan">
                    <div class="icon-money icon-fukuan"></div>
                    <div>
                        <div>{{utils.format(account.paycount)}}</div>
                        <span>付款总额</span>
                    </div>
                </div>
                <div class="money qiankuan">
                    <div class="icon-money icon-qiankuan"></div>
                    <div>
                        <div>{{utils.format(account.debt)}}</div>
                        <span>剩余欠款</span>
                    </div>
                </div>
                <div class="money xinyong">
                    <div class="icon-money icon-xinyong"></div>
                    <div>
                        <div>{{utils.format(account.credit, 0, '')}}</div>
                        <span>可用额度</span>
                    </div>
                </div>
                <div class="money jiesuan">
                    <div class="icon-money icon-jiesuan"></div>
                    <div>
                        <div>{{utils.format(account.urgentmoney)}}</div>
                        <span>急需结算金额</span>
                    </div>
                </div>
            </div>

            <div class="boxwidth payrecord-box-body-white">
                <div class="payrecord-title">付款记录</div>
                <table class="table-list" cellpadding="0" cellspacing="0">
                    <thead>
                        <th>汇款金额</th>
                        <th>方式</th>
                        <th>日期</th>
                        <th>付款单位</th>
                        <th>备注</th>
                        <th>状态</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in paylist" :key="i">
                            <td>￥{{item.dnMoney}}</td>
                            <td>{{item.dcPayType}}</td>
                            <td>{{item.dtAddDatetime}}</td>
                            <td>{{uname}}</td>
                            <td>{{item.dcRemarks}}</td>
                            <td><span :class='item.dnStatus == 1?"green":""'>{{item.dnStatus == 1?'收款完成':'等待确认'}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="boxwidth">
                <div id="page" class="page_div">                    
                    <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="itemCount"></el-pagination>
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
            uname: '',
            userID: '',
            page: 1,   
            itemCount: 0,
            account: {},
            paylist: []
        }
    },    
    components: {
        Header,
        Footer,
        Menu
    },
    methods: {
        changePage (v) {
            this.page = v
            this.getList()
        },
        getList () {
            this.utils.http({
                name: this,
                uri: '/payrecord/getPayList',
                params: {
                    params: { 
                        cid: this.userID,
                        page: this.page,
                        pagenum: 10
                    }
                },
                success: res=>{
                    console.log(res)
                    if(res.status === 200 && res.data.status === 1){
                        this.paylist = res.data.data.data
                        if (this.page === 1) {
                            this.itemCount = res.data.data.pagecount
                        }
                    }
                }
            })
        },
        getAccountInfo () {
            this.utils.http({
                name: this,
                uri: '/company/getCompanyAccount',
                params: {
                    params: { 
                        id: this.userID
                    }
                },
                success: res=>{
                    if(res.status === 200 && res.data.status === 1){
                        this.account = res.data.data[0]
                        console.log(this.account)
                    }
                }
            })
        }
    },
    created () {        
        let acount = JSON.parse(sessionStorage.getItem('account'))
        this.userID = acount.id
        this.uname = acount.uname
        this.getList()
        this.getAccountInfo()
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.payrecord-box{
    .payrecord-box-body{
        background: url('../assets/images/passenger-bg.png') no-repeat bottom center;
        background-size: auto 1100px;
        height: 1100px;
        padding-top: 50px;
        box-sizing: border-box;
        .payrecord-money-box{
            height: 128px;
            display: flex;
            justify-content: space-between;
            margin-bottom: 50px;
            .money{
                width: 274px;
                background-color: #fff;
                box-sizing: border-box;
                display: flex;
                .icon-fukuan{
                    width: 112px;
                    background: url('../assets/images/icon-money_1.png') no-repeat center;
                    background-color: #ff9979;
                }
                .icon-qiankuan{
                    width: 112px;
                    background: url('../assets/images/icon-money_2.png') no-repeat center;
                    background-color: #6ec7e5;
                }
                .icon-xinyong{
                    width: 112px;
                    background: url('../assets/images/icon-money_3.png') no-repeat center;
                    background-color: #bda7e2;
                }
                .icon-jiesuan{
                    width: 112px;
                    background: url('../assets/images/icon-money_4.png') no-repeat center;
                    background-color: #83cec9;
                }
                div{
                    padding-left: 15px;
                    div{
                        padding: 32px 0 18px 0;
                        color: $pubcolor;
                        font-size: 16px;
                        font-weight: bold;
                    }
                }
            }
        }

        .payrecord-box-body-white{
            background-color: #fff;
            min-height: 770px;
            box-sizing: border-box;
            padding: 30px;
            box-shadow: 2px 2px 5px #ccc;
            .payrecord-title{
                font-size: 16px;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                position: relative;
            }
            .payrecord-title::before{
                content: "";
                position: absolute;
                left: -10px;
                top: 1px;
                height: 18px;
                border: 1.5px solid $pubcolor;
                box-sizing: border-box;
            }
            .green{
                color: $pubcolor;
            }
            @import '@/assets/sass/tablelist.scss';        
        }
        @import '@/assets/sass/page.scss';
    }
}
</style>