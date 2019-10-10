<template>
    <div class="pubfooter">
        <div class="footer-box">
            <div class="footerbox-beian">
                <div><img src="../../assets/images/beian_icon.png" alt=""></div>
                <div>互联网站<br>备案信息</div>
            </div>
            <div class="footerbox-info">
                ©2000-2019 Air, .Inc or its affiliates. All Rights Reserved. <br>
                版权所有 京ICP证060116号 京ICP备05055661号-1
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.pubfooter{
    background-color: #fff;
    height: 120px;
    .footer-box{
        display: flex;
        justify-content: center;
        height: 100%;
        padding-top: 36px;
        box-sizing: border-box;
        .footerbox-beian{
            border: 1px solid #ccc;
            display: flex;
            justify-content: space-between;
            height: 50px;
            div{
                padding: 5px 10px;
                box-sizing: border-box;
                line-height: 20px;
            }
            div:first-child{
                border-right: 1px solid #ccc;
                padding-top: 8px;
                box-sizing: border-box;
                width: 50px;
                text-align: center;
            }
        }
        .footerbox-info{
            margin-left: 30px;    
            text-align: center;
        }
    }
}
</style>