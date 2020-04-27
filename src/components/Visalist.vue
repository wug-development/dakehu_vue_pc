<template>
    <div class="visalist-box">
        <Header></Header>
        <div class="center">
            <div class="topSelect">
                <h6>选择办理国家</h6>
                <div class="select">
                    <input type="text" v-model="txtcountry" @focus="showSearch" @blur="hideSearch">
                </div>
                <div class="selectCity" v-show="isShowSearch">
                    <div class="citytop">请选择城市或输入城市名称的拼音或英文</div>
                    <ul class="citycontent">
                        <li v-for="(item, i) in searchlist" :key="i" @click="getList(item.name)">
                            {{item.name}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="content">
                <div class="contenttitle">
                    <img :src="imgsrc" alt="">
                    <p class="visacountry">{{visacountry}}</p>
                    <span>签证办理所在地:</span>
                    <i>{{location}}</i>
                </div>
                <ul class="list">
                    <li v-for="(item, i) in vlist" :key="i">
                        <h3>{{item.name}}</h3>
                        <span>有效期:</span>
                        <span class="validity">{{item.YXQ}}</span>
                        <span>最多停留:</span>
                        <span class="stay">{{item.TLQ}}</span>
                        <span>办理时间:</span>
                        <span class="time">{{item.BLSJ}}</span>
                        <span>邀请函:</span>
                        <span class="invitation">{{item.YQH}}</span>
                        <span>签证面试:</span>
                        <span class="interview">{{item.MS}}</span>
                        <span class="red mg">受理人群:</span>
                        <span class="red acceptance">{{item.SLRQ}}</span>
                        <i>{{item.price}}</i>
                        <button v-if="item.name != '暂无'" class="btn" @click="book(item.name)">申请办理</button>
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
    name: 'Visalist',
    data () {
        return {
            visacountry: '',
            location: '',
            imgsrc: '',
            vlist: [],
            searchlist: [],
            isShowSearch: false,
            txtcountry: ''
        }
    },
    components: {
        Header,
        Footer
    },
    methods : {
        book (v) {
            this.$router.push({
                path: '/visainfo?name=' + v
            })
        },
        showSearch () {
            this.isShowSearch = true
        },
        hideSearch () {
            setTimeout(() => {
                this.isShowSearch = false
            }, 100);
        },
        getList (v) {            
            this.$http.get(this.uriw + '/LsitVisaContentBycountryServlet', {
                params: {
                    country: v
                }
            }).then(res => {
                console.log(res)
                //res.data
                this.visacountry = res.data[0].country
                this.txtcountry = res.data[0].country
                this.location = res.data[0].Location
                this.imgsrc = res.data[0].ImgUrl
                this.vlist = res.data
            })
        },
        getSearchCountry () {
            this.$http.get(this.uriw + '/ListCountryServlet', {}).then(res => {
                console.log(res)
                this.searchlist = res.data
            })
        }
    },
    created () {
        let n = this.$route.query.name
        this.getList(n)
        this.getSearchCountry()
    }
}
</script>

<style lang="scss">
.visalist-box{
    .head-wrap {
        background-color: #fff;
    }

    .center {
        width: 1200px;
        margin: 40px auto 0;
    }

    .topSelect {
        width: 100%;
        height: 150px;
        background-color: #f3f3f3;
        border-radius: 8px;
        box-shadow: 0 0 25px 25px #eae9e9;
        position: relative;
    }

    .topSelect h6 {
        float: left;
        font-size: 23px;
        color: #000;
        line-height: 150px;
        padding: 0 24px 0 50px;
        margin: 0;
    }

    .selectCity {
        width: 923px;
        height: 238px;
        border: solid 1px #f00000;
        position: absolute;
        left: 212px;
        top: 108px;
        background-color: #fff;
        z-index: 10;
    }

    .citytop {
        width: 100%;
        height: 39px;
        border-bottom: solid 1px #f00000;
        line-height: 39px;
        color: #f11111;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
    }

    .citycontent {
        overflow: hidden;
        padding-right: 20px;
        padding-top: 9px;
        padding-left: 15px;
    }

    .selectCity.active {
        display: block;
    }

    .citycontent li {
        float: left;
        font-size: 14px;
        line-height: 14px;
        padding: 9px 15px;
        cursor: pointer;
    }

    .citycontent li:hover {
        color: #ff1111;
    }

    .select {
        width: 928px;
        height: 62px;
        overflow: hidden;
        background-color: #fff;
        border-radius: 8px;
        float: left;
        margin-top: 45px;
    }

    .select input {
        border: none;
        outline: none;
        font-size: 23px;
        color: #cccccc;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 20px;
        line-height: 62px;
    }

    .content {
        width: 100%;
        background-color: #f6f6f6;
        box-shadow: 0 0 25px 25px #eae9e9;
        border-radius: 8px;
        margin-top: 60px;
    }

    .contenttitle {
        width: 100%;
        height: 160px;
        background-color: #fff;
        border-radius: 8px;
    }

    .contenttitle img {
        float: left;
        margin-left: 45px;
        margin-top: 56px;
    }

    .contenttitle p {
        float: left;
        font-size: 25px;
        line-height: 25px;
        color: #000;
        margin: 0;
        padding: 0;
        margin-left: 36px;
        margin-top: 50px;
        margin-right: 900px;
    }

    .contenttitle span {
        float: left;
        color: #666666;
        font-size: 21px;
        line-height: 21px;
        margin-left: 36px;
        margin-top: 23px;
    }

    .contenttitle i {
        float: left;
        color: #666666;
        font-size: 21px;
        line-height: 21px;
        margin-top: 23px;
        margin-left: 18px;
        font-style: normal;
    }

    .list li {
        width: 1132px;
        height: 292px;
        margin: 0 auto;
        border-bottom: solid 1px #c9c9c9;
        position: relative;
    }

    .list li:after {
        content: "";
        width: 100%;
        height: 1px;
        border-top: dashed 1px #e5e5e5;
        position: absolute;
        left: 0;
        bottom: 104px;
    }

    .list li h3 {
        font-size: 23px;
        color: #000;
        line-height: 23px;
        margin: 0;
        padding: 0;
        margin-top: 38px;
        float: left;
        width: 100%;
        text-align: left;
    }

    .list li span {
        float: left;
        color: #666666;
        font-size: 21px;
        line-height: 21px;
        margin-top: 29px;
        font-family: "苹方";
    }

    .list li i {
        font-size: 20px;
        color: #f00000;
        position: absolute;
        right: 196px;
        bottom: 43px;
        font-style: normal;
        font-weight: bold;
    }

    .validity,
    .stay,
    .time,
    .invitation,
    .interview,
    .acceptance {
        padding-left: 15px;
        padding-right: 25px;
    }

    .mg {
        margin-right: 150px;
    }

    .list li span.red {
        color: #f00000;
    }

    .list li button {
        width: 150px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 3px;
        background-color: #f00000;
        position: absolute;
        bottom: 33px;
        right: 0;
        outline: none;
        border: none;
        font-size: 20px;
        color: #fff;
        cursor: pointer;
    }
}
</style>