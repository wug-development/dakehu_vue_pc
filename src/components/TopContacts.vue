<template>
    <div class="contacts-box">
        <Header></Header>
        <Menu t="contact"></Menu>

        <div class="contacts-box-body">
            <div class="boxwidth contacts-box-body-white">
                <div class="contacts-title">乘机人查询</div>
                <div class="contacts-search-box">
                    <input type="search" placeholder="请输入姓名、公司名称进行搜索" v-model="tname" maxlength="50" />
                    <div class="pubbtn btn" @click="getList">搜索</div>
                </div>
                <table class="table-list" cellpadding="0" cellspacing="0">
                    <thead>
                        <th>姓名</th>
                        <th>公司名称</th>
                        <th>乘机人手机</th>
                        <th>紧急人手机</th>
                        <th>证件号码</th>
                        <th>护照号</th>
                        <th>护照有效期</th>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in personList" :key="i">
                            <td>{{item.dcPerName}}</td>
                            <td>{{item.uname}}</td>
                            <td>{{item.dcPhone}}</td>
                            <td>{{item.dcUrgentPhone}}</td>
                            <td>{{item.dcIDNumber}}</td>
                            <td>{{item.dcPassportNo}}</td>
                            <td>{{item.dcPassportDate}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="boxwidth">
                <div id="page" class="page_div">
                    <el-pagination background layout="prev, pager, next" @current-change="changePage" :total="1000"></el-pagination>
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
            personList: '',
            page: 1,
            userID: '',
            tname: ''
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
        },
        getList () {
            this.utils.http({
                name: this,
                uri: '/people/getpersonlist',
                params: {
                    params: { 
                        cid: this.userID,
                        page: this.page,
                        pagenum: 10,
                        filtername: this.tname
                    }
                },
                success: res=>{
                    console.log(res)
                    if(res.status === 200 && res.data.status === 1){
                        this.personList = res.data.data
                        // this.pList = res.data.data
                    }
                }
            })
        }
    },
    created () {
        let acount = JSON.parse(sessionStorage.getItem('account'))
        this.userID = acount.id        
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.contacts-box{
    .contacts-box-body{
        background: url('../assets/images/passenger-bg.png') no-repeat bottom center;
        background-size: auto 978px;
        height: 978px;
        padding-top: 50px;
        box-sizing: border-box;
        .contacts-box-body-white{
            background-color: #fff;
            height: 740px;
            box-sizing: border-box;
            padding: 30px;
            box-shadow: 2px 2px 5px #ccc;
            .contacts-title{
                font-size: 16px;
                font-weight: bold;
                height: 20px;
                line-height: 20px;
                position: relative;
            }
            .contacts-title::before{
                content: "";
                position: absolute;
                left: -10px;
                top: 1px;
                height: 18px;
                border: 1.5px solid $pubcolor;
                box-sizing: border-box;
            }
            .contacts-search-box{
                margin-top: 25px;
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 25px;
                box-sizing: border-box;
                display: flex;
                input{
                    height: 40px;
                    line-height: 38px;
                    box-sizing: border-box;
                    padding-left: 15px;
                    color: #666;
                    font-size: 14px;
                    width: 400px;
                    margin-right: 50px;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }
                .btn{
                    height: 40px;
                    line-height: 30px;
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