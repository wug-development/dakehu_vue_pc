<template>
    <div class="visa-box">        
        <Header></Header>
        <div class="banner" style="min-width: 1200px;">
            <img :src='IMGW_URL + "visa/vsia_banner_01.png"' alt="">
        </div>
        <div class="content-wrappre" style="min-width: 1200px;">
            <div class="recommend">
                <h1>凯行网推荐</h1>
                <p>给力大优惠还犹豫什么？走起</p>
            </div>
            <div class="carousel">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <el-carousel :interval="5000" arrow="always">
                            <el-carousel-item v-for="item in 3" :key="item">
                                <div class="swiper-slide">
                                    <img :src='IMGW_URL + "visa/lb-03.png"' alt="">
                                    <p>
                                        <span>日本签证</span>
                                        <span>
                                        ￥600
                                        <i>起</i>
                                    </span>
                                    </p>
                                </div>
                                <div class="swiper-slide">
                                    <img :src='IMGW_URL + "visa/lb-01.png"' alt="">
                                    <p>
                                        <span>马来西亚签证</span>
                                        <span>
                                        ￥900
                                        <i>起</i>
                                    </span>
                                    </p>
                                </div>
                                <div class="swiper-slide">
                                    <img :src='IMGW_URL + "visa/lb-02.png"' alt="">
                                    <p>
                                        <span>澳大利亚签证</span>
                                        <span>
                                        ￥1200
                                        <i>起</i>
                                    </span>
                                    </p>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
            </div>
            <div class="order-wrapper">
                <div class="order-l">
                    <div :class='"world-map-wrap " + mapbgclass'>
                        <div class="world-map" id="world_map">
                            <img :src='IMGW_URL + "visa/red-r-horn.png"' alt="世界地图" usemap="#imgMap">
                            <map name="imgMap" id="imgMap">
                                <area id="asia" shape="rect" coords="190,37,442,200" @click="changeZhou(1)" alt="Venus" />
                                <area id="africa" shape="rect" coords="16,143,196,354" @click="changeZhou(2)" alt="Venus" />
                                <area id="europe" shape="rect" coords="37,19,199,138" @click="changeZhou(3)" alt="Venus" />
                                <area id="oceania" shape="rect" coords="338,281,478,378" @click="changeZhou(4)" alt="Venus" />
                                <area id="america" shape="rect" coords="460,18,787,556" @click="changeZhou(5)" alt="Venus" />
                            </map>
                        </div>
                        <ul>
                            <li id="world_asia" v-if="showZhow==1">
                                <div class="world-map-class">
                                    <p>亚洲 Asia</p>
                                    <ul>
                                        <li>
                                            <span v-for="(item, i) in yazhou" :key="i" @click="toPage(item.name)">
                                                {{item.name}}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="world_europe" v-if="showZhow==3">
                                <div class="world-map-class">
                                    <p>欧洲 Europe</p>
                                    <ul>
                                        <li>
                                            <span v-for="(item, i) in ozhou" :key="i" @click="toPage(item.name)">
                                                {{item.name}}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="world_africa" v-if="showZhow==2">
                                <div class="world-map-class">
                                    <p>非洲 Africa</p>
                                    <ul>
                                        <li>
                                            <span v-for="(item, i) in feizhou" :key="i" @click="toPage(item.name)">
                                                {{item.name}}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="world_american" v-if="showZhow==5">
                                <div class="world-map-class">
                                    <p>美洲 American</p>
                                    <ul>
                                        <li>
                                            <span v-for="(item, i) in meizhou" :key="i" @click="toPage(item.name)">
                                                {{item.name}}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li id="world_oceania" v-if="showZhow==4">
                                <div class="world-map-class">
                                    <p>大洋洲 Oceania</p>
                                    <ul>
                                        <li>
                                            <span v-for="(item, i) in aozhou" :key="i" @click="toPage(item.name)">
                                                {{item.name}}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="order-r">
                    <h2>
                    <img :src='IMGW_URL + "visa/menu.png"' alt="">
                    最新签证订单
                </h2>
                    <ul id="messages_wrap" v-html="ulli"></ul>
                </div>
            </div>
            <div class="hotarea">
                <h1 class="hotarea-title">热门国家或地区</h1>
                <div class="hotarea-cont">
                    <ul class="hotarea-nav">
                        <li :class='changeImg === 0 ?"active-bor-b":""' @mouseenter="changeImg=0">热门</li>
                        <li :class='changeImg === 1 ?"active-bor-b":""' @mouseenter="changeImg=1">亚洲</li>
                        <li :class='changeImg === 2 ?"active-bor-b":""' @mouseenter="changeImg=2">欧洲</li>
                        <li :class='changeImg === 3 ?"active-bor-b":""' @mouseenter="changeImg=3">美洲</li>
                        <li :class='changeImg === 4 ?"active-bor-b":""' @mouseenter="changeImg=4">非洲</li>
                        <li :class='changeImg === 5 ?"active-bor-b":""' @mouseenter="changeImg=5">大洋洲</li>
                    </ul>
                    <div class="hotarea-sub">
                        <ol class="continent-box">
                            <li v-if="changeImg === 0">
                                <div class="pst-relative" @click="toPage('澳大利亚')">
                                    <img :src='IMGW_URL + "visa/adly-01.png"' alt="" class="imgfir" title="澳大利亚">
                                    <div class="pst-absolute councry-box bjcl-zs">
                                        <span>澳大利亚</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('美国')">
                                    <img :src='IMGW_URL + "visa/mg-01.png"' alt="" class="imgsec" title="美国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-ac6a00">
                                        <span>美国</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('日本')">
                                    <img :src='IMGW_URL + "visa/rb-01.png"' alt="" class="imgthi" title="日本">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-448aca">
                                        <span>日本</span>
                                        <span>签证价格789MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('韩国')">
                                    <img :src='IMGW_URL + "visa/hg-01.png"' alt="" class="imgthi" title="韩国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-fff100">
                                        <span>韩国</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('意大利')">
                                    <img :src='IMGW_URL + "visa/ydl-01.png"' alt="" class="imgthi" title="意大利">
                                    <div class="pst-absolute councry-box bjcl-hz bottom_90  ">
                                        <span>意大利</span>
                                        <span>签证价格2288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('新西兰')">
                                    <img :src='IMGW_URL + "visa/xxl-01.png"' alt="" class="imgfor" title="新西兰">
                                    <div class="pst-absolute councry-box bjcl-ll">
                                        <span>新西兰</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('澳大利亚')">
                                    <img :src='IMGW_URL + "visa/fg-01.png"' alt="" class="imgfor" title="澳大利亚">
                                    <div class="pst-absolute councry-box bjcl-zs">
                                        <span>澳大利亚</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="changeImg === 1">
                                <div class="pst-relative" @click="toPage('新加坡')">
                                    <img :src='IMGW_URL + "visa/ydl-01.png"' alt="" class="imgsec" title="新加坡">
                                    <div class="pst-absolute councry-box bjcl-fee905">
                                        <span>新加坡</span>
                                        <span>签证价格2288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('菲律宾')">
                                    <img :src='IMGW_URL + "visa/xxl-01.png"' alt="" class="imgthi" title="菲律宾">
                                    <div class="pst-absolute councry-box bjcl-ff2d00 bottom_90">
                                        <span>菲律宾</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('土耳其')">
                                    <img :src='IMGW_URL + "visa/fg-01.png"' alt="" class="imgthi" title="土耳其">
                                    <div class="pst-absolute councry-box bjcl-6a3f02 bottom_90">
                                        <span>土耳其</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('泰国')">
                                    <img :src='IMGW_URL + "visa/mg-01.png"' alt="" class="imgthi" title="泰国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-236fef">
                                        <span>泰国</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative nofloat" @click="toPage('马来西亚')">
                                    <img :src='IMGW_URL + "visa/rb-01.png"' alt="" class="imgsec" title="马来西亚">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-ff00f0">
                                        <span>马来西亚</span>
                                        <span>签证价格789MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('越南')">
                                    <img :src='IMGW_URL + "visa/hg-01.png"' alt="" class="imgsec" title="越南">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-00ffff">
                                        <span>越南</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('蒙古')">
                                    <img :src='IMGW_URL + "visa/adly-01.png"' alt="" class="imgfir" title="蒙古">
                                    <div class="pst-absolute councry-box bjcl-0aa81c">
                                        <span>蒙古</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="changeImg === 2">
                                <div class="pst-relative" @click="toPage('白俄罗斯')">
                                    <img :src='IMGW_URL + "visa/adly-01.png"' alt="" class="imgfif" title="白俄罗斯">
                                    <div class="pst-absolute councry-box bjcl-fee905 bottom_90">
                                        <span>白俄罗斯</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('挪威')">
                                    <img :src='IMGW_URL + "visa/adly-01.png"' alt="" class="imgsix" title="挪威">
                                    <div class="pst-absolute councry-box bjcl-ff00f0 bottom_90">
                                        <span>挪威</span>
                                        <span>签证价格1288MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('英国')">
                                    <img :src='IMGW_URL + "visa/mg-01.png"' alt="" class="imgsev" title="英国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-ff2d00">
                                        <span>英国</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('德国')">
                                    <img :src='IMGW_URL + "visa/rb-01.png"' alt="" class="imgsev" title="德国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-236fef">
                                        <span>德国</span>
                                        <span>签证价格789MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('瑞士')">
                                    <img :src='IMGW_URL + "visa/hg-01.png"' alt="" class="imgsev" title="瑞士">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-0aa81c">
                                        <span>瑞士</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('西班牙')">
                                    <img :src='IMGW_URL + "visa/hg-01.png"' alt="" class="imgsev" title="西班牙">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-00ffff">
                                        <span>西班牙</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="changeImg === 3">
                                <div class="pst-relative" @click="toPage('美国')">
                                    <img :src='IMGW_URL + "visa/american-01.png"' alt="" class="imgeig" title="美国">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-c92415">
                                        <span>美国</span>
                                        <span>签证价格1568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('加拿大')">
                                    <img :src='IMGW_URL + "visa/american-02.png"' alt="" class="imgeig" title="加拿大">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-024dca">
                                        <span>加拿大</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('秘鲁')">
                                    <img :src='IMGW_URL + "visa/american-03.png"' alt="" class="imgnen" title="秘鲁">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-56c901">
                                        <span>秘鲁</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('巴西')">
                                    <img :src='IMGW_URL + "visa/american-04.png"' alt="" class="imgten" title="巴西">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-c214ab">
                                        <span>巴西</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('古巴')">
                                    <img :src='IMGW_URL + "visa/american-05.png"' alt="" class="imgten" title="古巴">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-f6f905">
                                        <span>古巴</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="changeImg === 4">
                                <div class="pst-relative" @click="toPage('赞比亚')">
                                    <img :src='IMGW_URL + "visa/africa-01.png"' alt="" class="imgeig" title="赞比亚">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-fecd08">
                                        <span>赞比亚</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('纳米比亚')">
                                    <img :src='IMGW_URL + "visa/africa-02.png"' alt="" class="imgnen" title="纳米比亚">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-f94101">
                                        <span>纳米比亚</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('肯尼亚')">
                                    <img :src='IMGW_URL + "visa/africa-03.png"' alt="" class="imgeig" title="肯尼亚">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-2887fb">
                                        <span>肯尼亚</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative nofloat1" @click="toPage('刚果')">
                                    <img :src='IMGW_URL + "visa/africa-04.png"' alt="" class="imgten" title="刚果">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-2bfe08">
                                        <span>刚果</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative nofloat2" @click="toPage('埃及')">
                                    <img :src='IMGW_URL + "visa/africa-05.png"' alt="" class="imgten" title="埃及">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-024dca">
                                        <span>埃及</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                            </li>
                            <li v-if="changeImg === 5">
                                <div class="pst-relative" @click="toPage('大溪地')">
                                    <img :src='IMGW_URL + "visa/oceania-01.png"' alt="" class="imgeig" title="大溪地">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-fecd08">
                                        <span>大溪地</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative" @click="toPage('澳大利亚')">
                                    <img :src='IMGW_URL + "visa/oceania-02.png"' alt="" class="imgele" title="澳大利亚">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-2887fb">
                                        <span>澳大利亚</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                                <div class="pst-relative mg0" @click="toPage('新西兰')">
                                    <img :src='IMGW_URL + "visa/oceania-03.png"' alt="" class="imgeig" title="新西兰">
                                    <div class="pst-absolute councry-box bottom_90 bjcl-024dca">
                                        <span>新西兰</span>
                                        <span>签证价格568MB起</span>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="question">
                <h1>办理签证常见问题</h1>
                <p>一直致力于打造最专业的签证帮助平台</p>
            </div>
            <div class="q-answers">
                <div class="q-answers-l">
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4> 没按时参加美国签证面试怎么办？</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>
                                如您未能按照既定预约时间参加签证面试，按使领馆规定，可于第二个工作日致电客服人员进行重新预约。重新预约时请提供您的订单号及在本系统上注册的 邮箱号或注册所留手机号码，我们不额外收取服务费用。请注意：重新预约面试时间的次数由使领馆系统决定，原则上不会超过三次，请尽量珍惜每一次面试机会，准时参加面试！
                            </div>
                        </div>
                    </div>
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4>  如何更改已提交的填表信息？</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>
                                如果您希望更改已经提交的美国签证订单填表信息，请通过在线客服，或致电本系统客服电话进行更改，更改时请提供您的订单号及在本系统上注册的邮箱号或注册所留手机号码。我们不额外收取服务费用。请您注意，如您的订单是面试签证并预约了面试时间，按照使领馆规定，修改信息并重新填写DS160表格，需要取消原预约计划，重新选择面试时间。 请提交订单前仔细核实您的个人信息，尽量避免因修改信息影响您的面试申请进程！
                            </div>
                        </div>
                    </div>
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4> 如何更改面试时间?</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>订单处理中心将根据您订单提交时的要求和备注说明，自动为您选取最早和最希望的面试时间。如您希望更改您的面试时间，按领馆规定，建议最少提前3个工作日以上与客服人员联系更改！如更改预约时间不足3个工作日，有可能无法即时更改只能等面试时间过期后重新预约。 更改时请提供您的订单号及在本系统上注册的邮箱号或注册所留手机号码，我们不额外收取服务费。我们更改后，请重新登录您的账号，下载最新的确认文件！ 请注意：重新预约和更改面试时间的总次数由使领馆系统决定，原则上不会超过三次，请尽量珍惜每一次面试机会，准时参加面试！
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div class="q-answers-r">
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4> 如何将美国签证由代传递更改为面试？</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>任何有资格进行美国代传递的申请人，均可以选择面试的方式向美国驻华使领馆申请签证。如您订单已经建立，需要将代传递改为面试，或将面试改为代传递（符合代传递的情况下），请通过在线客服，或致电本系统客服电话进行更改，更改时请提供您的订单号及在本系统上注册的邮箱号或注册所留手机号码。我们不额外收取服务费用。
                            </div>
                        </div>
                    </div>
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4> 美签面试通过后多少天可取到签证?</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>面试通过后，如使领馆不作行政审查，通常情况下能在8-15个工作日左右可以领取护照。如果申请人被使领馆行政审查，则往往需要1-3个月左右才能领取护照。银行收到使领馆返回的护照后，将为申请人保留15天在15天内凭相关证件前往领取都是可以的。 请及时领取您的护照，超过15天未领取的护照，按照使领馆的规定，将返回使领馆！
                            </div>
                        </div>
                    </div>
                    <div class="q-answers-item">
                        <div>
                            <img :src='IMGW_URL + "visa/wenhaok.png"' alt="">
                            <h4> 接受签证官的面试需要多长时间?</h4>
                        </div>
                        <div>
                            <img :src='IMGW_URL + "visa/daank.png"' alt="">
                            <div>面试当天，从入馆到出馆，正常情况下总共约需要1到2小时左右。 在这1到2小时的时间里，美国签证面试环节却只需1到3分钟，1到3分钟将根据申请人以下情况决定：①个人旅行记录——是否有发达国家旅行记录、是否有较好的旅行记录史，能证明申请人的经济能力，和旅行能力！ ②职务收入教育——是否受过高等教育，并有一个好的工作，确保申请人留恋原单位的工作并按期回国！ ③固有资产状况——居房面积大，房产又多，又有爱车，存款又多，良好的居住生活环境，是旅行能力的最直接体现。 ④家庭约束力强——父母兄弟姐妹配偶子女等是不是您所爱的人，一个小问题或一个小细节，签证官就懂您了。 通常在无虚假材料、无虚假信息的情况下，上述各项指标较好的申请人，面试环节1-3分钟就完全够签证官作出决定了！请尽量珍惜每一次面试机会，准时参加面试！
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flow-wrap">
                <img :src='IMGW_URL + "visa/flow1.png"' alt="">
            </div>
            <div class="ad">
                <img :src='IMGW_URL + "visa/AD.png"' alt="">
            </div>
        </div>
        <div class="phone-wrap">
            24小时签证咨询：<span>13911139201</span>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from './public/MainHeader.vue'
import Footer from './public/MainFooter.vue'
export default {
    name: 'Visa',
    data () {
        return {
            showZhow: 1,
            meizhou: [],
            ozhou: [],
            yazhou: [],
            aozhou: [],
            feizhou: [],
            mapbgclass: 'map-yazhou',
            tabli: 1,
            ulli: '',
            changeImg: 0
        }
    },
    components: {
        Header,
        Footer
    },
    methods: {
        changeZhou (v) {
            this.showZhow = v
            if (v === 1) {
                this.mapbgclass = 'map-yazhou'
            } else if (v === 2) {
                this.mapbgclass = 'map-feizhou'
            } else if (v === 3) {
                this.mapbgclass = 'map-ozhou'
            } else if (v === 4) {
                this.mapbgclass = 'map-aozhou'
            } else if (v === 5) {
                this.mapbgclass = 'map-meizhou'
            } 
        },
        toPage (v) {
            this.$router.push({
                path: '/visalist?name=' + v
            })
        }
    },
    created () {        
        this.$http.get(this.uriw + '/ListCountryServlet', {}).then(res => {
            console.log(res)
            if (res.status === 200 && res.data.length > 0) {
                let d = res.data
                for (let i = 0; i<d.length; i++) {
                    if (d[i].location == '美洲') {
                        this.meizhou.push({name: d[i].name})
                    } else if (d[i].location == '亚洲') {
                        this.yazhou.push({name: d[i].name})
                    } if (d[i].location == '欧洲') {
                        this.ozhou.push({name: d[i].name})
                    } if (d[i].location == '非洲') {
                        this.feizhou.push({name: d[i].name})
                    } if (d[i].location == '大洋洲') {
                        this.aozhou.push({name: d[i].name})
                    } 
                }
            }
        })

        this.ulli = reli(1)
        setInterval(() => {
            this.tabli = (this.tabli===1?2:1)
            this.ulli = reli(this.tabli)
        }, 2000);
    }
}

function reli (v) {
    var messages_wrapLiFir = '<li>\
        <p>用户张亚* 132****7321 | 2018-06-01</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户王* 131****2321 | 2018-06-01</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户白义* 135****2229 | 2018-06-04</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户周璐* 137****6621 | 2018-06-04</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户王馨* 135****3321 | 2018-06-05</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户武* 132****7321 | 2018-06-06</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户郑* 132****7321 | 2018-06-06</p>\
        <span>预订了利比亚商务包签</span>\
    </li>';

    var messages_wrapLiSec = '<li>\
        <p>用户陈义* 132****7321 | 2018-06-06</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户张亚* 132****7321 | 2018-06-07</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户陈义* 132****7321 | 2018-06-07</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户张亚* 132****7321 | 2018-06-08</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户郑* 132****7321 | 2018-06-11</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户周璐* 132****7321 | 2018-06-11</p>\
        <span>预订了利比亚商务包签</span>\
    </li>\
    <li>\
        <p>用户王馨* 132****7321 | 2018-06-12</p>\
        <span>预订了利比亚商务包签</span>\
    </li>';
    if (v === 1) {
        return messages_wrapLiFir
    } else {
        return messages_wrapLiSec
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.visa-box{
    .banner{
        font-size: 0;
        overflow: hidden;
    }
    .banner>img{
        display: inline-block;
        width: 100%;
        height: inherit;
    }
    .content-wrappre{
        max-width: 1200px;
        margin: 0 auto;
        font-family: "平方";
    }
    .recommend{
        width: 100%;
        text-align: center;
        padding: 38px 0 34px;
    }
    .recommend>h1{
        font-size: 26px;
        font-weight: bold;
        padding-bottom: 14px;
    }
    .recommend>p{
        font-size: 24px;
        color: #999999;
    }

    .carousel{
        height: 270px;
        margin-bottom: 20px;
    }
    .carousel .swiper-wrapper{
        width: 1200px;
        height: 270px;
        overflow: hidden;
        position: absolute;
        left: 0;
        top:0;

    }
    .carousel .swiper-wrapper .swiper-slide{
        width: 386px;
        height: 265px;
        float: left;
        border: 1px solid #cccccc;
        margin-right: 18px;
        border-top:transparent;
        box-shadow: 0 3px 1px #cccccc;
    }
    .el-carousel__item .swiper-slide:last-child{
        margin: 0;
    }
    .el-carousel__arrow{
        background-color: rgba(255,255,255, .4);
    }
    .el-carousel__indicators{
        display: none;
    }
    .carousel .swiper-wrapper img{
        display: inline-block;
        width: 100%;
        height: 218px;
    }
    .carousel .swiper-wrapper p{
        display: inline-block;
        width: 100%;
        height: 50px;
        line-height: 49px;
        font-size: 22px;
        margin-top: -1px;
    }
    .carousel .swiper-wrapper p:hover,.carousel .swiper-wrapper p:hover i{
        background-color: #a0a0a0;
        color: #ffffff;
    }
    .carousel .swiper-wrapper p span:first-child{
        float: left;
        margin-left: 13px;
    }
    .carousel .swiper-wrapper p span:last-child{
        float: right;
        margin-right: 13px;
        color: red;
        font-weight: bold;
    }
    .carousel .swiper-wrapper i{
        font-style: normal;
        color: #000000;
        font-weight: normal;
    }
    /*----------------------------------------------------------*/

    .order-wrapper{
        width: 100%;
        height: 558px;
        background-color: #ffffff;

    }
    .order-l{
        float: left;
        width: 804px;
        height: inherit;
        position: relative;
    }
    .order-l>img{
        position: absolute;
        width: 100%;
        height: 553px;
    }
    .order-ip{
        position: absolute;
        width: 100%;
        height: 173px;
        background-color: rgba(0,0,0,0.56);
        bottom: 0;
    }
    .order-iptext {
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        padding-left: 65px;
        line-height: 53px;
    }
    .order-r{
        width: 358px;
        float: right;
        height: 551px;
        border: 1px solid #cccccc;
        overflow: hidden;
    }
    .order-r h2{
        display: block;
        margin-top: 15px;
        margin-left: 18px;
        font-size: 26px;
        height: 36px;
    }
    .order-r ul {
        height: 480px;
        margin-top: 24px;
        display: block;
        width: 100%;
        overflow-y: auto;
    }
    .order-r ul li{
        margin-bottom: 24px;
        margin-left: 18px;
        background: url($imguri + "visa/people.png") no-repeat left;
        text-indent: 32px;
    }
    .order-r ul li>p{
        line-height: 20px;
        font-size: 16px;
    }
    .order-r ul li>span{
        line-height: 20px;
        font-size: 14px;
        color: #858585;
        display: block;
    }

    /*hotarea*/
    .hotarea{
        padding-top: 38px;
        width: 100%;
        background-color: #ffffff;
    }
    .hotarea-title{
        font-size: 26px;
        font-weight: bold;
        text-align: center;
    }
    .swiper-container{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .hotarea-nav{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #999999;
        margin-top: 10px;
    }
    .hotarea-nav>li{
        display: inline-block;
        margin: 0 24px;
        cursor: pointer;
    }
    .active-bor-b{
        border-bottom: 4px solid #f00000;
    }
    .hotarea-sub{
        margin-top: 24px;
        background-color: #ffffff;
        height: 632px;
    }
    .hotarea-sub ol{
        position: relative;
        height: 100%;
        overflow: hidden;
    }
    .hotarea-sub ol li{
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        margin-right: -17px;
        margin-bottom: -16px;
    }
    .hotarea-sub ol li img{
        cursor: pointer;
    }

    .asia-l{
        float: left;
        width: 416px;
        height: inherit;
    }
    .asia-l>div{
        width: 100%;
        height: 197px;
        margin-bottom: 20px;
    }
    .asia-r{
        width: 770px;
        float: right;
        height: inherit;
    }
    .asia-r-cimg{
        width: 100%;
        height: 414px;
        display: flex;
        float: right;
        margin-bottom: 20px;

    }
    .europe-top{
        width: 100%;

        margin-bottom: 20px;

    }
    .europe-topl{
        width: 416px;
        height: 197px;
        float: left;
    }
    .europe-topr{
        float: right;
        height: 197px;
        width: 770px;
    }
    .europe-lower{
        width: 100%;
        height: 414px;
        display: flex;
        float: right;
        margin-top: 20px;
        justify-content: space-between;
    }
    .europe-lower>div{
        margin-right: 15px;
    }
    .europe-lower>div:last-child{
        margin-right: 0!important;
    }
    .asia-r-cimg>div{
        flex: 1;
        height: inherit;
        margin-right: 15px;
    }
    .asia-r-timg{
        width: 100%;
        height: 197px;
    }
    .asia-r-timg img{
        display: inline-block;
        width: 100%;
        height: inherit;
    }

    .america>div{
        width: 590px;
        height: 631px;
    }
    .america-l{
        float: left;
        display: flex;
        justify-content: space-between;

    }
    .america-l>div{
        width: 288px;
    }
    .america-r{
        float: right;
    }
    .america-rtop{
        width: 100%;
        height: 164px;
        margin-bottom: 15px;
    }
    .america-rtop img{
        display: inline-block;
        width: 100%;
        height: 164px;
    }
    .america-rlower{
        display: flex;
        justify-content: space-between;
    }
    .america-rlower>div{
        width: 288px;
        height: 452px;
    }
    .america-rlower>div img{
        height: 452px;
        display: inline-block;
    }


    .sil-cimg{
        width: 100%;
        height: 414px;
        display: flex;
    }
    .sil-cimg>div{
        flex: 1;
        height: inherit;
        margin-right: 15px;
    }
    .sil-cimg>div:last-child{
        margin-right: 0!important;
    }
    .sil-cimg>div img{
        display: inline-block;
        width: 100%;
        height: inherit;
    }

    .africa{
        width: 100%;
        height: inherit;
        overflow: hidden;
    }
    .continent-item{
        width: 288px;
        height: inherit;
    }
    .africa-l{
        float: left;
        margin-right: 15px;
    }
    .africa-l img{
        display: inline-block;
        width: 100%;
        height: 631px;
    }
    .africa-r{
        float: right;
    }
    .africa-r img{
        display: inline-block;
        width: 100%;
        height: 631px;
    }
    .africa-m{
        float: left;
        width: 592px;
        height: inherit;
    }
    .africa-mtop{
        width: 100%;
        height: 164px;
    }
    .africa-mtop img{
        display: inline-block;
        width: 100%;
        height: 164px;
    }
    .america-mlower{
        display: flex;
        justify-content: space-between;
    }
    .america-mlower>div{
        width: 288px;
        height: 452px;
        margin-top: 15px;
    }
    .oceania img{
        display: inline-block;
        height: inherit;
        height: 631px;
    }
    .oceania-l{
        float: left;
    }
    .oceania-m{
        float: left;
        width: 592px;
        margin-left: 16px;
        height: 632px;
        overflow:hidden;
    }
    .oceania-r{
        float: right;
    }
    .oceania-r img{
        display: inline-block;
        height: inherit;
    }


    /*question*/
    .question{
        width: 100%;
        text-align: center;
        margin-top: 38px;
        padding-bottom: 17px;
        border-bottom: 1px dashed #bfbfbf;
    }
    .question>h1{
        font-size: 26px;
        font-weight: bold;
        padding-bottom: 15px;

    }
    .question>p:last-child {
        font-size: 20px;
        color: #999999;
    }
    /*
    q-answers*/
    .q-answers{
        width: 100%;
        margin-top:20px;
    }
    .q-answers>div{
        width: 588px;
        height: 615px;
        border: 1px solid #e8e8e8;
        background-color: #ffffff;
    }
    .q-answers-l{
        float: left;
    }
    .q-answers-r{
        float: right;
    }
    .q-answers-item{
        padding: 25px 10px 0;
    }
    .q-answers-item>div:first-child{
        padding-bottom: 10px;
        border-bottom: 1px dashed #bfbfbf;
        margin-bottom: 10px;
    }
    .q-answers-item>div>img{
        float: left;
        display: block;
        width: 30px;
        height: 27px;
    }
    .q-answers-item>div>h4{
        display: inline-block;
        height: 27px;
        line-height: 27px;
        font-size: 18px;
        text-indent: 10px;
        font-weight: normal;
    }
    .q-answers-item>div>div{
        float: left;
        width: 495px;
        font-size: 14px;
        height: 98px;
        line-height: 28px;
        padding: 0px 20px 20px 15px;
        display: -webkit-box !important;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        margin-bottom: 30px;
    }
    .flow-wrap{
        -height: 194px;
        padding:28px 114px;
        overflow: hidden;
    }
    .flow-wrap img{
        display: inline-block;
        width: 100%;
    }

    /*world_map*/
    .world-map-wrap{
        width: 804px;
        height: 558px;
        position: relative;
        background: url($imguri + 'visa/map.jpg') no-repeat;
    }
    .order-l .map-yazhou{
        background-position: 0 -1116px;
    }
    .order-l .map-feizhou{
        background-position: 0 -2790px;
    }
    .order-l .map-ozhou{
        background-position: 0 -1674px;
    }
    .order-l .map-aozhou{
        background-position: 0 -2232px;
    }
    .order-l .map-meizhou{
        background-position: 0 -558px;
    }

    .world-asia{
        background-position: 0 -1116px;
    }
    .world-africa{
        background-position: 0 -2790px;
    }
    .world-map{
        width: 804px;
        height: 558px;
    }
    .world-map img{
        opacity: 0;
        width: 804px;
        height: 558px;
    }
    .world-map-class{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 174px;
        width: 100%;
        background-color: rgba(0,0,0,.56);
    }
    .world-map-class>p{
        padding: 18px 50px;
        font-size: 20px;
        color: #ffffff;
    }
    .world-map-class ul{
        margin: 0;
        padding:0 24px ;
    }
    .world-map-class ul li{
        list-style: none;
    }
    .world-map-class ul li span{
        color: #f7f9fa;
        text-decoration: none;
        font-size: 16px;
        padding-right: 16px;
        
        line-height: 28px;
        cursor: pointer;
    }
    .world-map-class ul li span:hover{
        text-decoration: underline;
        color: #f00000;
    }

    .title-wrap{
        display: block;
        width: 100%;
        border-left: 2px solid #ff001e;
        text-indent: 10px;
        font-size: 20px;
        font-weight: normal;
    }
    .title-wrap>a{
        float: right;
        font-size: 14px;
        color: #ff0000;
        text-decoration: none;
        vertical-align: middle;
        line-height: 20px;
    }
    .ph-title{
        width: 100%;
        background-color: #FFFFFF;
    }
    .active-bjgray{
        background-color: #eeeeee;
    }

    .swiper-button-black{
        cursor: pointer;
        width: 32px;
        height: 36px;
        position: absolute;

    }
    .swiper-button-prev{
        left: 0;
        top:117px;
        background-image: url($imguri + "visa/swiL.png");
        background-repeat: no-repeat;
    }
    .swiper-button-next{
        right: 0;
        top:117px;
        background-image: url($imguri + "visa/sweiR.png");
        background-repeat: no-repeat;
    }
    .pst-relative{
        position: relative;
        overflow: hidden;
        float: left;
        margin-right: 16px;
        margin-bottom: 16px;
    }
    .nofloat{
        position: absolute;
        left: 0;
        top:213px;
    }
    .nofloat1{
        position: absolute;
        left: 304px;
        top:180px;
    }
    .nofloat2{
        position: absolute;
        left: 608px;
        top:180px;
    }
    .mg0{
        margin-right: 0;
    }
    .imgfir{
        width: 770px;
        height: 197px;
        display: block;
    }
    .imgsec{
        width: 414px;
        height: 197px;
        display: block;
    }
    .imgthi{
        width: 246px;
        height: 408px;
        display: block;
    }
    .imgfor{
        width: 414px;
        height: 196px;
        display: block;
    }
    .imgfif{
    width: 422px;
    height: 164px;
    display: block;
    }
    .imgsix{
        width: 761px;
        height: 164px;
    }
    .imgsev{
        width: 288px;
        height: 444px;
        display: block;
    }
    .imgeig{
        width: 288px;
        height: 620px;
        display: block;
    }
    .imgnen{
        width: 592px;
        height: 164px;
        display: block;
    }
    .imgten{
        width: 288px;
        height: 441px;
        display: block;
    }
    .imgele{
        width: 591px;
        height: 620px;
        display: block;
    }
    
    /*kf-r*/
    .kf-r{
        height: 313px;
        width: 67px;
        position: fixed;
        margin-top: -67px;
        right: 0;
        top:45%;
        z-index: 999;
        background-color: #ffffff;
    }
    .kf-item{
        position: relative;
        width: 65px;
        height: 65px;
        background-color: red;
        margin-bottom: 3px;
        text-align: center;
    }
    .kf-item img{
        display: inline-block;
        margin-top: 8px;
        padding-bottom: 8px;
    }
    .kf-item>span{
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #ffffff;
    }
    .back-top{
        width: 65px;
        height: 37px;
        background-color: red;
        text-align: center;
        line-height: 37px;

    }

    .before-cont{
        display: none;
        position:absolute ;
        width: 156px;
        height: 65px;
        right: 65px;
        background-color: rgba(240,0,0,.3);
        font-size: 18px;
        line-height: 65px;
        text-align: center;
        color: #ffffff;
        letter-spacing: 2px;
    }
    .councry-box{
        width: 180px;
        height: 180px;
        -webkit-border-radius:100%;
        -moz-border-radius:100%;
        border-radius:100%;
        bottom: -50%;
        left: 50%;
        margin-left: -90px;
    }
    .councry-box span{
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #ffffff;
    }
    .councry-box span:first-child{
        font-size: 24px;
        margin-top: 20px;
        font-family: "平方粗体";
    }
    .councry-box span:last-child{
        font-size: 16px;
        margin-top: 10px;
    }
    .bottom_90{
        bottom: -90px!important;
    }
    /**/

    .pst-relative{
        position: relative;
        overflow: hidden;
        
    }
    .pst-absolute{
        position: absolute;
    }

    /*background-color*/
    .bjcl-zs{
        background-color: rgba(146,7,131,0.7);
    }
    .bjcl-hz{
        background-color: rgba(95,82,160,0.7);
    }
    .bjcl-ll{
        background-color: rgba(0,255,255,0.7);
    }
    .bjcl-ac6a00{
        background-color: rgba(172,106,0,.7);
    }
    .bjcl-448aca{
        background-color: rgba(68,138,202,.7);
    }
    .bjcl-fff100{
        background-color: rgba(255,241,0,.7);
    }
    .bjcl-fee905{
        background-color: rgba(254,233,5,.7);
    }
    .bjcl-ff2d00{
        background-color: rgba(255,45,0,.7);
    }
    .bjcl-6a3f02{
        background-color: rgba(106,63,2,.7);
    }
    .bjcl-236fef{
        background-color: rgba(35,111,239,.7);
    }
    .bjcl-ff00f0{
        background-color: rgba(255,0,240,.7);
    }
    .bjcl-00ffff{
        background-color: rgba(0,255,255,.7);
    }
    .bjcl-0aa81c{
        background-color: rgba(10,168,28,.7);
    }
    .bjcl-c92415{
        background-color: rgba(201,36,21,.7);
    }
    .bjcl-024dca{
        background-color: rgba(2,77,202,.7);
    }
    .bjcl-c214ab{
        background-color: rgba(194,20,171,.7);
    }
    .bjcl-f6f905{
        background-color: rgba(194,20,171,.7);
    }
    .bjcl-56c901{
        background-color: rgba(86,201,1,.7);
    }
    .bjcl-fecd08{
        background-color: rgba(254,205,8,.7);
    }
    .bjcl-f94101{
        background-color: rgba(249,65,1,.7);
    }
    .bjcl-2887fb{
        background-color: rgba(40,135,251,.7);
    }
    .bjcl-2bfe08{
        background-color: rgba(43,254,8,.7);
    }

    /*font-color*/
    .col-0daef4{
        color: #0daef4;
    }
    .col-b4b4b4{
        color: #b4b4b4;
    }
    /*font-size*/
    .font18{
        font-size: 18px;
    }
    /*line-height*/
    .lh36{
        line-height: 36px;
    }
    /*ad*/
    .ad{
        width: 100%;
        margin-bottom: 40px;
    }
    .ad img{
        display: inline-block;
        width: 100%;

    }


    .page-cont{
        max-width: 1200px;
        margin: 0 auto ;
        font-family: "平方";
    }

    /*world_map*/
    .world-map-wrap{
        width: 804px;
        height: 558px;
        position: relative;
        background: url($imguri + 'visa/map.png') no-repeat;
    }

    .world-asia{
        background-position: 0 -1116px;         
    }
    .world-africa{
        background-position: 0 -2790px;         
    }
    .world-map{
        width: 804px;
        height: 558px;
    }
    .world-map img{
        opacity: 0;
        width: 804px;
        height: 558px;
    }
    .world-map-class{
        position: absolute;
        bottom: 0;
        left: 0;
        height: 174px;
        width: 100%;
        background: url($imguri + 'visa/label_01.png') no-repeat 10px top;
        background-color: rgba(0,0,0,.56);
    }
    .world-map-class>p{
        padding: 18px 50px;
        font-size: 20px;
        color: #ffffff;
    }
    .world-map-class ul{
        margin: 0;
        padding:0 24px ;
    }
    .world-map-class ul li{
        list-style: none;
    }
    .world-map-class ul li a{
        color: #f7f9fa;
        text-decoration: none;
        font-size: 16px;
        padding-right: 16px;
        white-space: nowrap;
        line-height: 28px;
    }
    .world-map-class ul li a:hover{
        text-decoration: underline;
        color: #f00000;
    }
        
    .title-wrap{
        display: block;
        width: 100%;
        border-left: 2px solid #ff001e;
        text-indent: 10px;
        font-size: 20px;
        font-weight: normal;
    }
    .title-wrap>a{
        float: right;
        font-size: 14px;
        color: #ff0000;
        text-decoration: none;
        vertical-align: middle;
        line-height: 20px;
    }
    .ph-title{
        width: 100%;
        background-color: #FFFFFF;
    }
    .active-bjgray{
        background-color: #eeeeee;
    }



    /*清除浮动*/

    .clearboth{
        clear: both;
    }
    .phone-wrap{
        position: fixed;
        background-color: #f00000;
        color: #FFFFFF;
        right: 0;
        top: 300px;
        -width: 200px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        z-index: 999;
        padding: 10px;
    }
}
</style>