<template>
    <div class="pubheader">
        <div class="pubheader-box">
            <div class="logo"><img src="../../assets/images/logo.png" alt=""></div>
            <div class="name-box">
                <a class="name" id="lab_name">M秒奇艺</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
.pubheader{
    background-color: #fff;
    height: 70px;
    .pubheader-box{
        width: $body-width;
        margin: 0 auto;        
        .logo{
            float: left;
            padding-top: 8px;
        }
        .name-box{
            float: right;
            height: 70px;
            line-height: 70px;
            .name{
                text-decoration: underline;
                cursor: pointer;
            }
        }
    }
}
</style>