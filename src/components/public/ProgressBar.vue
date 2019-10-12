<template>
    <div class="progressbar">
        <div class="barnum">
            <div :class="tab==1?'cur':''">
                <div>1</div>
                <span>搜索</span>                    
            </div>        
            <div :class="tab==2?'cur':''">
                <div>2</div>
                <span>选择</span>                    
            </div>
            <div :class="tab==3?'cur':''">
                <div>3</div>
                <span>预定</span>                    
            </div>
            <div :class="tab==4?'cur':''">
                <div>4</div>
                <span>提交</span>                    
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['p'],
    data () {
        return {
            tab: 1
        }
    },    
    created() {
        this.tab = this.p
    }
}
</script>

<style lang="scss">
.progressbar{
    height: 70px;
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    .barnum{
        margin: 0 auto;
        width: 720px;
        height: 25px;
        border-bottom: 1px solid #fe7122;
        display: flex;
        justify-content: space-between;
        > div {
            background-color: #fff;
            width: 100px;
            height: 50px;
            line-height: 40px;
            text-align: center;
            display: flex;
            justify-content: center;
            padding-top: 5px;
            padding-left: 10px;
            box-sizing: border-box;
            > div {
                width: 40px;
                height: 40px;
                border-radius: 40px;
                background-color: #f3f3f3;
                line-height: 40px;
                color: #fe7122;
                font-size: 16px;
                box-shadow: 2px 2px 4px #e6e6e6;
            }
            span{
                width: 50px;
                text-align: center;
                font-size: 16px;
            }
        }
        > .cur{
            > div{
                background-color: #fe7122;
                color: #fff;
            }                
        }
    }
}
</style>