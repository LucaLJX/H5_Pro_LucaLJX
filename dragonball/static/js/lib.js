/**
 * Created by zhangshuangjian on 2017/7/14.
 */

/**
 * Created by zhangshuangjian on 2017/4/10.
 */

//var domain = "http://api.vigoo.cn/";  // 接口域名
//var domain = "http://192.168.1.8:8000";
//var baseUrl = domain + "/hyct";    // 二级接口域名
//var pageSize = 10;
//判断是不是微信浏览器
function is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}
//发送请求
var sendRequest = function(requestURI,method,datatype,paramData,asy,successCallBack,errorCallBack){
    var url = requestURI;
    console.log(paramData);
    $.ajax({
        url:url,
        data:paramData,
        type:method,
        cache:false,
        async: asy,
        dataType:datatype,
        contentType:"application/json",
        success:function(data){
            console.log("successUrl:"+url);
            console.log(data);
            successCallBack(data);
        },
        error:function (data) {
            console.log("errorUrl:"+url);
            console.log(data);
            errorCallBack(data);
        },
        complete:function (xhr,ts) {

        }
    });
};
//get请求
var getAjax = function(requestURI,successCallBack,errorCallBack){
//  var url = baseUrl+requestURI;
    var url = requestURI;
    $.ajax({
        url:url,
        type:'GET',
        cache:false,
        async:false,
        contentType:'text/html ',
        dataType:'json',
        success:function(data) {
            //console.log("success请求地址："+url);
            successCallBack(data);
//          console.log(data);
        },error:function(data){
            console.log("error请求地址："+url);
            errorCallBack(data);
        }
    });
};
//DELETE请求
var delAjax = function(requestURI,successCallBack,errorCallBack){
    var url = baseUrl+requestURI;
    $.ajax({
        url:url,
        type:'DELETE',
        cache:false,
        contentType:'text/html ',
        dataType:'json',
        success:function(data) {
            console.log("success请求地址："+url);
            successCallBack(data);
        },error:function(data){
            console.log("error请求地址："+url);
            errorCallBack(data);
        }
    });
};

function checkTips(id,msg){
    layer.tips(msg,id, {
        tips: [1, '#0FA6D8'] //还可配置颜色
    });
}

//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    //console.log("cookie:"+document.cookie.match(reg));
    if (arr = document.cookie.match(reg)) return decodeURIComponent(arr[2]);
    else return null;
}
//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

//获取地址栏hash
function GetHashString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href.match(reg);
    //console.log(window.location.href.match(reg));
    //console.log("GetHashString--------param:"+r);
    if (r != null)return decodeURIComponent(r[2]);
    return null;
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    //console.log("url_param:"+r);
    if (r != null)return unescape(r[2]);
    return null;
}
//添加样式
function addClass(elm, newClass) {
    var classes = elm.className.split(' ');
    var classIndex = hasClass(elm, newClass);
    if (classIndex == -1) {
        classes.push(newClass);
    }
    elm.className = classes.join(' ');
}

function hasClass(elm, className) {
    var classes = elm.className.split(' ');
    for (var a in classes) {
        if (classes[a] == className) {
            return a;
        }
    }
    return -1;
}
function removeClass(elm, className) {
    var classes = elm.className.split(' ');
    var classIndex = hasClass(elm, className);
    if (classIndex != -1) {
        classes.splice(classIndex, 1);
    }
    elm.className = classes.join(' ');
}
//获取dom
function getEl(id) {
    return document.getElementById(id);
}

//=========================================================================
//getJsonP
function fetchApi(api_addr, callback) {
    $.ajax({
        url: domain + api_addr,
        dataType: "jsonp",
        jsonpCallback: callback
    });
}

//数据交互接口
//ContentType{application/x-www-form-urlencoded,application/json}
function sendRequest(api_addr, callback, postData, method) {
    //alert(postData);
    var req = createXMLHTTPObject();
    if (!req) return;
    req.open(method, baseUrl + api_addr, true);
    //req.setRequestHeader('User-Agent','XMLHTTP/1.0');
    // console.log(contentType + ":" + method)
    if (postData && method == "post")
        req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    else if (postData && method == "json")
        req.setRequestHeader('Content-type', 'application/json');
    else if (postData && method == "put")
        req.setRequestHeader('Content-type', 'application/json');

    req.onreadystatechange = function () {
        if (req.readyState != 4) return;
        if (req.status != 200 && req.status != 304) {
            //alert('HTTP error ' + req.status);
            return;
        }
        callback(req);
    };
    if (req.readyState == 4) return;
    req.send(postData);
}

var XMLHttpFactories = [
    function () {
        return new XMLHttpRequest()
    },
    function () {
        return new ActiveXObject("Msxml2.XMLHTTP")
    },
    function () {
        return new ActiveXObject("Msxml3.XMLHTTP")
    },
    function () {
        return new ActiveXObject("Microsoft.XMLHTTP")
    }
];

function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}
//获取位置对应的地理位置
function getPoint(addrss, Province) {
	var myGeo = new BMap.Geocoder();
	// 将地址解析结果显示在地图上,并调整地图视野
	myGeo.getPoint(addrss, function(point) {
		if(point) {
			console.log(point);
			return point;
			/*map.centerAndZoom(point, 16);
			map.addOverlay(new BMap.Marker(point));*/
		} else {
			alert("您选择地址没有解析到结果!");
		}
	}, Province)
}
function isEmpty(obj) {
    if ( '' == obj ||  null == obj || 'undefined' == obj || "null" == obj) return true;
    return false;
}

function isNotEmpty(obj) {
    if (obj != '' && obj != null && obj != 'undefined') return true;
    return false;
}

//获取时间
var oDate = null;
var y = null;
var m = null;
var d = null;
var oT = null;
function calendar() {
    //时间
    oDate = new Date();
    y = oDate.getFullYear();//获取年
    m = oDate.getMonth() + 1;
    d = oDate.getDate();//日期
    oT = y + '' + m + '' + d + '';
}

function change(obj, action, animate) {
    obj.on(action, function () {
        animate.show();
        animate.on(action, function () {
            $(this).hide();
        })
    });
}
function change2(obj, action, animate, close_btn) {
    obj.on(action, function () {
        animate.show();
        close_btn.on('click', function () {
            animate.hide();
        })
    });
}

function base64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function timeStamp2String(time){
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}

function getDaterByType(time,type){
	var datetime = new Date();
    datetime.setTime(time);
	if (type == 'YYYY'){
		return datetime.getFullYear();
	}else if (type == 'mm'){
		return datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	}else if (type == 'dd'){
		return datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	}
}