$(function() {

    $(".J_findway").click(function() {
        var base64url = BASE64.encoder($(this).attr("data-id"));
        jumpToTarget(base64url);
    });

    $("#J_rightLoginNow").click(function() {
        window.location.href = getJson("casUrl");
    });


    /*                手机相关内容                   */

    //获取动态验证码
    $("#J_ClickSendCaptcha").click(function () {
        clearErrMsg();
        var mobile = $("#J_mobile").val();
        var username = $("#J_username").val();
        if (judgeUsernameValid(username) && judgeMobileValid(mobile)) {
            var curCount = $.cookie("curCount");
            if (!curCount || "null" == curCount) {
                // 发送验证码
                $.post("./getSMSCaptcha", {
                    userName: username,
                    mobile : mobile
                }, function(result) {
                    if (result.code == "1") {
                        J_openSuccessView();
                    } else {
                        // 显示错误信息
                        var errMsg = result.msg;
                        $("#errMsg").html(errMsg);
                    }
                });
            }
        }
    });
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
        if (curCount == 0) {
            $("#J_ClickSendCaptcha").attr("class", "codeText");
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
            $("#J_ClickSendCaptcha").attr("class", "sendCaptchaText");
            $("#J_ClickSendCaptcha").text("已发送" + "(" + curCount + ")");

        }
    }

    // 用户刷新页面 从cookie读取时间 判断是否需要计时
    var coocurCount = $.cookie("curCount");
    if (coocurCount) {
        if (coocurCount > 0) {
            $("#J_ClickSendCaptcha").attr("class", "sendCaptchaText");
            $("#J_ClickSendCaptcha").text("已发送" + "(" + coocurCount + ")");
            intenalid = setInterval(J_showtime, 1000);
        }
    }

    /**
     * 手机-继续
     * @param pageName
     */
    $(".returnButton").click(function() {
        clearErrMsg();
       // var targetUrl = $(this).attr("data-id");
        var username = $("#J_username").val();
        var mobile = $("#J_mobile").val();
        var captcha = $("#J_captcha").val();
        var newPwd = $("#newPwd").val();
        var newPwd2 = $("#newPwd2").val();
        if (judgeUsernameValid() &&
            judgeMobileValid() &&
            judgeCapthcaValid() && judgePwdValid()) {
            $.post("./mobileResetPassword", {
                userName: username,
                mobile: mobile,
                captcha: captcha,
                newPwd: newPwd ,
                newPwd2: newPwd2
            }, function (result) {
                if (result.code == "1") {
					 $("#errMsg").html("重置成功，3秒后将自动跳转登录页面！");
					 setTimeout(function(){
					 window.location.href='https://cas.cupk.edu.cn/cas/login?service=https%3A%2F%2Fportal.cupk.edu.cn%2Fportal%2Findex_sso.jsp'
					}, 3000);
                   // var base64url = BASE64.encoder(targetUrl);
                   // jumpToTarget(base64url);
                } else {
                    // 显示错误信息
                    var errMsg = result.msg;
                    $("#errMsg").html(errMsg);
                }
            });


        }

    });


    //平台账号不能为空
    function judgeUsernameValid() {
        var username = $("#J_username").val();
        if ($.trim(username).length == 0|| username == null) {
            var loginmsg = "平台账号不能为空";
            $("#errMsg").html(loginmsg);
            return false;
        } else {
            return true
        }
    }

    // 校验手机格式
    function judgeMobileValid() {
        var mobile = $("#J_mobile").val();
        if (!(/^1[3|4|5|7|8|2|9|6]\d{9}$/.test(mobile)) || mobile == "") {
            var loginmsg = "手机号输入不合法或者为空,请重新输入";
            $("#errMsg").html(loginmsg);
            return false;
        } else {
            return true;
        }
    }

    // 校验验证码
    function judgeCapthcaValid() {
        var captcha = $("#J_captcha").val();
        if ($.trim(captcha).length == 0|| captcha == null) {
            var loginmsg = "验证码不能为空";
            $("#errMsg").html(loginmsg);
            return false;
        } else {
            return true
        }
    }

    //密码
    function judgePwdValid() {
        var newPwd = $("#newPwd").val();
        var newPwd2 = $("#newPwd2").val();
        return judgeEmailPasswordValid(newPwd,newPwd2);
    }


    /*          邮箱内容相关              */

    /**
     * 邮箱-发送邮件
     * @param base64url
     */
    $("#J_emailNext").click(function() {
        clearErrMsg();
        var base64url = BASE64.encoder($(this).attr("data-id"));
        var userName = $("#username").val();
        if ($.trim(userName).length == 0 || userName == null) {
            var errMsg = "请输入平台账号！";
            $("#errMsg").html(errMsg);
        } else {
            // 将按钮置灰
            $("#J_emailNext").attr("disabled",true);
            $.post("./sendEmail", {
                userName: userName
            }, function(result) {
                // 将按钮恢复
                $("#J_emailNext").attr("disabled",false);
                if (result.code == "1") {
                    var email = result.data;
                    $('.iphoneBox').hide();
                    $('#myEmail').html(email);
                    $('.completBox').show();
                } else {
                    $("#errMsg").html(result.msg);
                }
            });

        }
    });

    /**
     * 邮件重置密码
     */
    $("#J_ConfirmPassword").click(function() {
        clearErrMsg();
        //$('.iphoneBox').hide();
        var password = $("#J_password").val();
        var password2 = $("#J_password2").val();
        var userName = $("#J_userName").val();
        // 判断两次密码是否一致
        if (judgeEmailPasswordValid(password, password2)) {
            $("#errMsg").html("");
            var encodePassword = BASE64.encoder(password2);
            $.post("./changePwd", {
                encodeUsername : "userName",
                encodePassword : encodePassword,
                temp
            }, function(result) {
                if (result.code == "1") {
                    //修改密码成功
                    $('.iphoneBox').hide();
                    $(".completPart").html("您的密码已修改成功！");
                    $(".completIcons img").attr("src", "../themes/sso_cupk/images/completIcons.png" );
                    $('.completBox').show();
                } else {
                    $(".completPart").html("您的密码已修改成功！");
                    $(".completIcons img").attr("src", "../themes/sso_cupk/images/errorIcons.png" );
                    $('.completBox').show();
                    $("#errMsg").html(result.msg);
                }
            });
        }

    });

    /**
     * 判断邮箱输入的新密码和确认密码
     * @param pwd1
     * @param pwd2
     */
    var pwdRegex=/^(?=.*\d)(?=.*[a-zA-z]).{8,}$/;
    var pwdLength= 8;
    var pwdDesc= '密码必须包含字母和数字，且长度不小于8位';
    getPwdRule()
    function getPwdRule(){
        $.post("../reset/pwd/rules", {}, function(res) {
            if (res.code==1) {
                if(res.data){
                    pwdRegex = eval(res.data.code.replace("L",res.data.pwdLength));
                    pwdLength = res.data.pwdLength;
                    pwdDesc = res.data.policy+"，且长度不小于"+pwdLength+"位";
                  //  $("#errMsg").html(pwdDesc)
                }
            } else {
                layer.msg(res.msg);
            }
        });
    }
    function judgeEmailPasswordValid(pwd1, pwd2) {
        if ($.trim(pwd1).length == 0 || pwd1 == null) {
            $("#errMsg").html("新密码不能为空！");
            return false;
        }
        if ($.trim(pwd2).length == 0 || pwd2 == null) {
            $("#errMsg").html("确认密码不能为空！");
            return false;
        }
        if (pwd1 != pwd2) {
            $("#errMsg").html("新密码和确认密码不一致！");
            return false;
        }
        if (!pwdRegex.test(pwd1) || !pwdRegex.test(pwd2)) {
            $("#errMsg").html(pwdDesc);
            return false;
        }
        return true;
    }


    /*              公共                                  */
    function returnLoginPage() {
        window.location.href = getJson("casUrl");
    }

    function jumpToTarget(base64url) {
        window.location.href = getJson("casUrl")+ "sys/reset/forgetPwd?urlName="+base64url;
    }

    function jumpToTarget(base64url, email) {
        window.location.href = getJson("casUrl")+ "sys/reset/forgetPwd?urlName="+base64url+"&email=" + email;
    }

    // 清空错误信息
    function clearErrMsg() {
        $("#errMsg").html("");
    }

});