<template>
    <div class="index-box">
        <div class="banner"></div>

        <div class="boxwidth bookbox">
            <div class="tab">
                <div data-type="gn">预订国内</div>
                <div data-type="gj" class="cur">预订国际</div>
            </div>
            <div class="padding">
                <div class="menu">
                    <div class="go cur">单程</div>
                    <div class="return">往返</div>
                    <div class="made">定制</div>
                </div>
                <div class="go-return-box">
                    <div class="out"><select name="modules" id="ddl_startCity" lay-verify="required" lay-search=""><option value="">出发地</option></select></div>
                    <div class="daoda"><select name="modules" lay-verify="required" lay-search=""><option value="">目的地</option></select></div>
                    <div class="outdate"><input type="text" name="date" id="startDate" lay-verify="date" placeholder="出发日期" autocomplete="off" class="layui-input"></div>
                    <div class="daodadate"><input type="text" name="date" id="endDate" lay-verify="date" placeholder="到达日期" autocomplete="off" class="layui-input"></div>
                    <div class="btn"><a href="flightlist.html">搜索</a></div>
                </div>
                <div class="made-box">
                    <div class="text-box">
                        <textarea id="txt_made" cols="30" rows="10" placeholder="请尽量详细描述您的航班需求，以便我们能更好为您量身设计行程！"></textarea>
                    </div>
                    <div class="btn">搜索</div>
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
                    <tr>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td class="red">111</td>
                    </tr>
                    <tr>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                    </tr>
                    <tr>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td>111</td>
                        <td class="red">111</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Header from './public/Header.vue'
import Footer from './public/Footer.vue'
export default {
    data () {
        return {

        }
    },
    components: {
        Header,
        Footer
    },
}
</script>

<style lang="scss">
@import '@/assets/sass/public.scss';
.index-box{
    .banner{
        background-image: url('../assets/images/banner.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 480px;
        display: block;
    }
    .bookbox{
        position: relative;
        top: -110px;
        @import '@/assets/sass/flightsearch.scss';
    }
    .todayorder{
        position: relative;
        top: -90px;
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
                }
            }
        }
    }
}
</style>