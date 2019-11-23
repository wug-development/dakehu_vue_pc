<template>
    <div class="orderlist-box">
        <Header></Header>
        <Menu t="order"></Menu>
        
        <div class="orderlist-box-body">
            <div class="boxwidth orderlist-box-body-white">
                <div class="orderlist-title">订单查询</div>
                <div class="orderlist-search-box">
                    <div class="book-time">
                        预订时间：
                        <el-date-picker
                        value-format="yyyy-MM-dd"
                        v-model="dates"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                    <div class="div_mag" v-if="comList.length > 0">
                        分公司：
                        <el-select class="txt" v-model="childCompany" placeholder="请选择">
                            <el-option
                            v-for="item in comList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="div_mag">
                        姓名：
                        <el-input class="txt" v-model="name" maxlength="50" placeholder=""></el-input>
                    </div>
                    <div class="div_mag div_no">
                        <span>票号：</span>
                        <el-input class="txt" v-model="ticketno" maxlength="50" placeholder=""></el-input>
                    </div>
                    <div class="pubbtn btn" @click="getList">搜索</div>
                </div>
                <table class="table-list" cellpadding="0" cellspacing="0">
                    <thead>
                        <th>订单号</th>
                        <th>乘机人</th>
                        <th>出发日期</th>
                        <th>行程</th>
                        <th>记录编号</th>
                        <th>金额</th>
                        <th>预订时间</th>
                        <th>状态</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in orderList" :key="i">
                            <td class="cur" @click="checkInfo(item.OrderID)">{{item.OrderID}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.startDate}}</td>
                            <td>{{item.startCity}} - {{item.endCity}}</td>
                            <td>{{item.OrderCode}}</td>
                            <td>{{item.TotalPrice}}</td>
                            <td>{{item.addTime}}</td>
                            <td>{{item.Status == 1?'处理完成':'等待处理'}}</td>
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
            userID: '',
            orderList: '',
            itemCount: 0,
            comList: [],
            page: 1,
            dates: [],
            childCompany: '',
            name: '',
            ticketno: ''
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
        checkInfo (id) {
            this.$router.push({
                path: '/orderdetail?id=' + id
            })
        },
        getList () {
            this.dates = this.dates || []
            this.utils.http({
                name: this,
                uri: '/order/getorderlist',
                params: {
                    params: { 
                        cid: this.userID,
                        page: this.page, 
                        pagenum: 10, 
                        sdate: this.dates[0] || '', 
                        edate: this.dates[1] || '', 
                        filtername: this.name, 
                        tno: this.ticketno,
                        subcid: this.childCompany.id || ''
                    }
                },
                success: res=>{
                    console.log(res)
                    if(res.status === 200 && res.data.status === 1){
                        this.orderList = res.data.data.data
                        if (res.data.data.count) {
                            this.itemCount = res.data.data.count
                        }
                    }
                }
            })
        },
        getCompnay () {            
            this.$http.get(this.uris + '/company/getfiltersubcompany', {params: {
                id: this.userID
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.comList = res.data.data
                }
            })
        }
    },
    created () {
        let acount = JSON.parse(sessionStorage.getItem('account'))
        this.userID = acount.id
        this.getList()
        this.getCompnay()   
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.orderlist-box{
    .orderlist-box-body{
        background: url('../assets/images/passenger-bg.png') no-repeat bottom center;
        background-size: auto 978px;
        height: 978px;
        padding-top: 50px;
        box-sizing: border-box;

        .orderlist-box-body-white{
            background-color: #fff;
            height: 740px;
            box-sizing: border-box;
            padding: 30px;
            box-shadow: 2px 2px 5px #ccc;
            .orderlist-title{
                font-size: 16px;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                position: relative;
            }
            .orderlist-title::before{
                content: "";
                position: absolute;
                left: -10px;
                top: 1px;
                height: 18px;
                border: 1.5px solid $pubcolor;
                box-sizing: border-box;
            }
            .orderlist-search-box{
                position: relative;
                margin-top: 25px;
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 25px 25px 0 25px;
                box-sizing: border-box;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                div{
                    line-height: 35px;
                    span{
                        margin: 0 5px;
                    }
                    .txt{
                        width: 170px;
                    }
                }
                .div_mag{
                    margin-bottom: 20px;
                }
                .div_no{
                    span{
                        margin: 0 28px 0 0;
                    }
                }
                .btn{
                    height: 35px;
                    line-height: 23px;
                    border-radius: 5px;
                    width: 100px;
                    box-sizing: border-box;
                    box-shadow: 1px 1px 6px #999;
                }
            }
            @import '@/assets/sass/tablelist.scss';
        }

        @import '@/assets/sass/page.scss';
    }
}
</style>