/**
 * Created by guoxu on 12/7/16.
 */

function getUser(username) {
    var URL = 'http://oms.miaodeli.com/api/user?username=' + username;
    var user_data = {};
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                user_data = models.info['data']
            } else {
                alert(models.info);
            }
            var userinfo = new Vue({
                el: '#userinfo',
                data: user_data
            })
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var userinfo = new Vue({
                el: '#userinfo',
                data: user_data
            })
        }
    });
}

function getAllUser() {
    var URL = 'http://oms.miaodeli.com/api/user?start=0&count=10';
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                $("#p1").html(data);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function addUser() {
    var data = {};
    for (var i = 0; i < arguments.length; i++) {
        console.log("#" + arguments[i]);
        data[arguments[i]] = $("#" + arguments[i]).val();
    }
    var request = {
        action: 'add',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/user';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                window.location.href = "showuser.html";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}


// 更新用户密码
function updateUserPassword() {
    var new_passwd = $("#new_passwd").val();
    var confirm_new_passwd = $("#confirm_new_passwd").val();
    var old_passwd = $("#old_passwd").val();

    if (new_passwd == "" ||  old_passwd == "" || confirm_new_passwd != "") {
        alert("密码输入不能为空");
        return;
    }

    if (new_passwd != confirm_new_passwd) {
        alert("两次输入密码必须一致")
        return;
    }

    var data = {
        username: getCookie("username"),
        old_passwd: old_passwd,
        new_passwd: new_passwd
    };
    var request = {
        action: 'update',
        data: data
    };
    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/user';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                alert("密码修改成功，请重新登陆");
                window.location.href = "/login";
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });

}


function updateUser() {

    var data = {};
    var request = {
        action: 'update',
        data: data
    };

    var encoded;
    encoded = $.toJSON(request);
    var jsonStr = encoded;
    console.log(jsonStr);
    var URL = 'http://oms.miaodeli.com/api/user';
    $.ajax({
        url: URL,
        type: 'POST',
        data: jsonStr,
        dataType: 'json',
        contentType: 'application/json;charset=utf8',
        success: function (data) {
            var models = data;
            if (models.ok == true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}

function deleteUser() {
    var username = $("#username").val();
    var URL = 'http://oms.miaodeli.com/api/user?username=' + username;
    $.ajax({
        type: "DELETE",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                alert(models.info);
            } else {
                alert(models.info);
            }
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
        }
    });
}