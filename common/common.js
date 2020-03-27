var utils = {
  /*
  * startdate: 开始时间
  * NYear: N年
  * */
    getAfterNDate : function (startdate, n, type) {
        var date = new Date();
        var number = 0;
        if((typeof startdate === "object" || typeof startdate === "string") && typeof n === "number"){
            date = new Date(startdate);
            number = n;
        }else if(typeof startdate === "number"){
            number = startdate;
        }
        type = type || n;
        switch (type) {
            case "y": {
                date.setFullYear(date.getFullYear() + number);
                break;
            }
            case "q": {
                date.setMonth(date.getMonth() + number * 3);
                break;
            }
            case "m": {
                date.setMonth(date.getMonth() + number);
            }
            case "w": {
                date.setDate(date.getDate() + number * 7);
                break;
            }
            case "d": {
                date.setDate(date.getDate() + number);
                break;
            }
            case "h": {
                date.setHours(date.getHours() + number);
                break;
            }
            case "m": {
                date.setMinutes(date.getMinutes() + number);
                break;
            }
            case "s": {
                date.setSeconds(date.getSeconds() + number);
                break;
            }
            default: {
                date.setDate(date.getDate() + number);
                break;
            }
        }
        return date;
    },
    /*
    * d: date
    * fmt: yyyy-MM-dd
    * fmt: yyyy-MM-dd HH:mm:ss
    * */
    dateFormat : function (d, fmt) {
        var t = new Date();
        if(!fmt){ fmt = d; }
        else if(typeof d === "string"){ t = new Date(d.replace(/-/g,'/')) }
        else { t = d  }
        var o = {
            "M+": t.getMonth() + 1, //月份
            "d+": t.getDate(), //日
            "h+": t.getHours(), //小时
            "m+": t.getMinutes(), //分
            "s+": t.getSeconds(), //秒
            "q+": Math.floor((t.getMonth() + 3) / 3), //季度
            "S": t.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 日期比大小
     *  */
    dateTab : function(date1,date2){
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        return oDate1.getTime() > oDate2.getTime()    
    }, 
    /*
    * 获取本地存储数据
    * */
    getItem : function (key) {
        return sessionStorage.getItem(key);
    },
    /*
    * 设置本地存储数据
    * */
    setItem : function (key, data) {
        sessionStorage.setItem(key,data);
    },
    /*
    * http 请求数据
    * */
    ajax : function (options, origin) {
        var defualt = {
            name: options.name || 'Vue',
            method: options.method || 'get',
            uri: options.uri,
            params: options.params || {},
            success: options.success || function (){},
            fail: options.fail || function (){},
            compvare: options.compvare || function (){},
            origin: options.origin
        }
        if(defualt.method === 'get'){
            return defualt.name.$http.get((origin || defualt.name.urio) + defualt.uri, defualt.params)
              .then(defualt.success)
              .catch(defualt.fail)
            //.compvare(defualt.compvare);
        } else {
            return defualt.name.$http.post((origin || defualt.name.urio) + defualt.uri, defualt.params)
              .then(defualt.success)
              .catch(defualt.fail)
            //.compvare(defualt.compvare);
        }
    },
    http: function(options){
        return this.ajax(options, options.name.uris)
    },
    alert: function(vue, content, title){
        return vue.MessageBox(content, title || '温馨提示')
    },
    checkTel: function(val){
        return /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(val)
    },
    checkEmail: function(v){
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
    },
    englishName: function(name){
        return /^[a-zA-Z\/ ]{2,20}$/.test(name)
    },
    isNumber: function(v) {
        return new RegExp(/^\d+$/).test(v)
    },
    isEn: function(v){
        return new RegExp(/^[A-Za-z]+$/).test(v)
    },
    isCn: function(v){
        return new RegExp(/^[\u4e00-\u9fa5]+$/).test(v)
    },
    isNumberEn: function(v){
        return new RegExp(/^[A-Za-z0-9]+$/).test(v)
    },
    clearSpace: function(v){
        return v.replace(/ /g,'')
    },
    getAccount: function(vue){
        var _account = sessionStorage.getItem('account')
        if (!_account) {
            vue.MessageBox.alert('请登录').then(function () {
                vue.$router.push({
                    path: '/'
                })
            })
            return {}
        } else {
            return JSON.parse(_account)
        }
    },
    // 参数：金额，保留几位小数，货币符号，千位分隔符，小数分隔符
    format: function (number, places, symbol, thousand, decimal) {
        number = number || 0;
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "￥";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    },
    getCardType: function (v) {
        var arr = [
            { key: 1, value: '身份证'},
            { key: 2, value: '护照'},
            { key: 3, value: '军官证'},
            { key: 4, value: '士兵证'},
            { key: 5, value: '台胞证'},
            { key: 6, value: '其他'},
        ]
        if (v) {
            var t = ''
            for(var i in arr) {
                if (arr[i].key === v) {
                    t = arr[i].value
                }
            }
        } else {
            return arr
        }
    }
};
export default {
    utils
}
