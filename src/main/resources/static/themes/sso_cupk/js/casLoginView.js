/**
 * 登录框相关验证
 */
$(function() {
    //输入框数据切换效果
    $('.userpass').each(function(){
        $(this).attr('data-value',$(this).val())
    })
    $(".userpass").focus(function(){
        $(this).css("color", "#141414");
        var values = $(this).val();
        var valued = $(this).data('value');
        if ( values == valued ){
            var _id = $(this).attr('id');
            if (_id == "password") {
                $(this).attr('type', 'password');
            }
            $(this).val('')
        };
    });
    $(".userpass").blur(function(){
        var values = $(this).val();
        var valued = $(this).data('value');
        if ( values == '' || values == valued){
            $(this).css("color", "#cbcbcb");
            var _id = $(this).attr('id');
            if (_id == "password") {
                $(this).attr('type', 'text');
            }
            $(this).val(valued)
        };
    });
    // 全局变量
    var NORMAL_TYPE = 'login'; // 账号密码登录
    var MOBILE_TYPE = 'signup'; // 手机号登录
    var QRCODE_TYPE = 'CORP_WECHAT'; // 企业微信登录
    var LOGIN_WAY = 'loginWay';
    var loginWay = $.cookie(LOGIN_WAY);
    var currLoginWay = $("#loginType").val();
    if (!loginWay || "null" == loginWay) {
        loginWay = currLoginWay;
    }
    changeLoginWay(loginWay);
    //忘记密码跳转
    $("#J_fogetUserPwd").click( function() {
        var base64url = BASE64.encoder("casEmailResetPassword");
        window.open( "./v/forgetPwd?urlName=" + base64url);
    });

/*手机验证码登录相关内容*/
    // 校验手机
    $("#J_mobile").blur( function() {
        var mobile = $("#J_mobile").val();
        judgeMobileValid(mobile);
    });
    // 清空动态验证码处错误信息
    $("#J_mobile").focus(function() {
        //$("#J_mobileError").html("");
        $("#J_mobileMsg").html("");
    });

    //获取动态验证码
    $("#J_ClickSendCaptcha").click(function () {
       var mobile = $("#telphone").val();
       if (judgeMobileValid(mobile)) {
           // 调用发送验证码的接口
           var curCount = $.cookie("curCount");
           if (!curCount || "null" == curCount) {
               // 发送验证码
               $.post("./v/getSMSCaptcha", {
                   mobile : mobile
               }, function(result) {
                   if (result.code == "1") {
                       J_openSuccessView();
                   } else {
                       // 显示错误信息
                       var errMsg = result.msg;
                       //$("#J_mobileError").html(errMsg);
                       $("#J_mobileMsg")
                           .html("<span cssClass='form3'>" + errMsg + "</span>");
                   }
               });
           }
       }
    });

    // 校验手机格式
    function judgeMobileValid(mobile) {
        if (!(/^1\d{10}$/.test(mobile)) || mobile == "") {
            var loginmsg = "手机号输入不合法或者为空,请重新输入";
            //$("#J_mobileError").html(loginmsg);
            $("#J_mobileMsg")
                .html("<span cssClass='form3'>" + loginmsg + "</span>");
            return false;
        } else {
            return true;
        }
    }

    /**
     * 验证码倒计时
     */
    var intenalid;
    var timeCount = 60;// 当前剩余秒数

    function J_openSuccessView() {
        $.cookie("curCount", timeCount, {
            path : "/"
        });
        intenalid = setInterval(J_showtime, 1000);
    }

    function J_showtime() {
        // 从cookie中获取当前剩余时间
        var curCount = $.cookie("curCount");
        //记数为0时重置样式
        if (curCount == 0) {
            $("#J_ClickSendCaptcha").attr("class", "getCode");
            $("#J_ClickSendCaptcha").text("获取验证码");
            $.cookie("curCount", null, {
                path : "/"
            });
            clearInterval(intenalid);
        } else {
            curCount--;
            $.cookie("curCount", null, {
                path : "/"
            });
            $.cookie("curCount", curCount, {
                path : "/"
            });
            $("#J_ClickSendCaptcha").attr("class", "iphoneCodeSend");
            $("#J_ClickSendCaptcha").text("已发送" + "(" + curCount + ")");

        }
    }

    // 用户刷新页面 从cookie读取时间 判断是否需要计时
    var coocurCount = $.cookie("curCount");
    if (coocurCount) {
        if (coocurCount > 0) {
            $("#J_ClickSendCaptcha").attr("class", "iphoneCodeSend");
            $("#J_ClickSendCaptcha").text("已发送" + "(" + coocurCount + ")");
            intenalid = setInterval(J_showtime, 1000);
        }
    }

    // 提交表单
    $(".userButton").click(function() {
        var userLoginWay = $("#loginType").val();
        var result = J_check_userputinfo(userLoginWay);
        if (result) {
            // window.location.href='main.html';
            //encrypt()
            $("#fm1").submit();
        }
    });

    $(document).keyup(function(event){
        if(event.keyCode ==13){
            var userLoginWay = $("#loginType").val();
            var result = J_check_userputinfo(userLoginWay);
            if (result) {
                encrypt()
                $("#fm1").submit();
            }
        }
    });

    function encrypt(){
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey("MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAUpCfX4kq+mbPNcVHM9x1OIwk94OaU4Dwt0gS0VHDM52pG60Fmxjm47DP5EXIgrg1UlMSwJbBIdHyg1XS1E3OjQIDAQAB")
        var password =$("#password").val();
        if(password){
            password = encrypt.encrypt(password);
            $("#password").val(password);
        }
    }

    // 登录校验
    function J_check_userputinfo(loginway) {
        var logincheck = true;
        var loginmsg = "";
        if (loginway == NORMAL_TYPE) {
            var name = $("#username").val();
            var pwd = $("#password").val();
            if (name == "请输入用户名" || $.trim(name).length == 0|| name == null) {
                logincheck = false;
                loginmsg = "用户名不能为空";
            }
            if (pwd == "请输入密码" || $.trim(pwd).length == 0 || pwd == null) {
                if (loginmsg) {
                    loginmsg = "用户名和密码不能为空";
                } else {
                    loginmsg = "密码不能为空";
                }
                logincheck = false;
            }
            $("#msg").html("<span cssClass='form3'>" + loginmsg + "</span>");

        } else if (loginway == MOBILE_TYPE) {
            var mobile = $("#telphone").val();
            var mobileCaptcha = $("#telphoneCaptcha").val();
            if (mobile == "请输入手机号" || $.trim(mobile).length == 0 || mobile == null) {
                logincheck = false;
                loginmsg = "手机号不能为空";
            }
            if (mobileCaptcha == "请输入验证码" || $.trim(mobileCaptcha).length == 0 || mobileCaptcha == null) {
                logincheck = false;
                if (loginmsg) {
                    loginmsg = "手机号和验证码不能为空";
                } else {
                    loginmsg = "验证码不能为空";
                }
            }
            $("#J_mobileMsg")
                .html("<span cssClass='form3'>" + loginmsg + "</span>");
        } else {
            logincheck = false;
            loginmsg = "请选择登录方式并输入相关信息后登录";
            $("#J_mobileMsg")
                .html("<span cssClass='form3'>" + loginmsg + "</span>");
            $("#msg").html("<span cssClass='form3'>" + loginmsg + "</span>");
        }
        return logincheck;
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }



});

// 切换登录方式
function changeLoginWay(way) {
    $("#loginType").val(way);
    $.cookie('loginWay', way, {path : "/"});
    $(".loginToggle a").removeClass("login-select");
    if ('login' == way) {
        // 显示账号密码登录
        document.getElementById("login").style.display = 'block';
        document.getElementById("signup").style.display = 'none';
        $("#account").addClass("login-select");
        $("#username").val("");
        $("#password").val("");
    } else if ('signup' == way) {
        // 显示手机号验证码登录，
        document.getElementById("signup").style.display = 'block';
        document.getElementById("login").style.display = 'none';
        $("#phone").addClass("login-select");
        $("#username").val("auto");
        $("#password").val("auto");
    }
}


function clearErrorMsg(way) {
    if ('NORMAL' == way) {
        // $("#msg").html("");
        $("#J_mobileMsg").html("");
        $("#J_corpWechatMsg").html("");
    } else if ('MOBILE' == way) {
        $("#msg").html("");
        //$("#J_mobileMsg").html("");
        $("#J_corpWechatMsg").html("");
    } else {
        $("#msg").html("");
        $("#J_mobileMsg").html("");
        //$("#J_corpWechatMsg").html("");
    }
}

function init(){
    window.WwLogin({
        "id" : "wechatInit",
        "appid" : 'ww2ff69aa4c1b14a7f',
        "agentid" : '1000087',
        "redirect_uri" :"https%3A%2F%2Fcas.cupk.edu.cn%2Fcas%2Fauth%2Fwork-weixin%3Fservice%3Dhttps%253A%252F%252Fportal.cupk.edu.cn%252Fportal%252Findex_sso.jsp",
        "state" : Math.random(),
	"href":	"https://cas.cupk.edu.cn/cas/themes/sso_cupk/css/qrcode.css",
    });
}
/**
 * 刷新验证码
 */
function refreshCaptcha() {
    $("#captcha_img").attr("src", "captcha.jpg?id=" + new Date() + Math.floor(Math.random() * 24));
}