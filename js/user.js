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
    var user_data = [];
    var show_button = false;
    $.ajax({
        type: "GET",
        url: URL,
        success: function (data) {
            var models = $.parseJSON(data);
            if (models.ok == true) {
                user_data = models.info['data'];
                show_button = true;
            } else {
                alert(models.info);
            }
            var user = new Vue({
                el: '#user',
                data: {
                    users: user_data,
                    show_button: show_button
                }
            });
        },
        error: function (xhr, error, exception) {
            alert(exception.toString());
            var user = new Vue({
                el: '#user',
                data: {
                    users: user_data,
                    show_button: show_button
                }
            });
        }
    });

}


function addUser() {
    var data = {
        username: $("#usermame").val(),
        nickname: $("#nickname").val(),
        mail: $("#mail").val(),
        passwd: $("#passwd").val(),
        department: $("#department").val(),
        permissions: $("#permissions").val()
    };

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
                alert(models.info);
                window.location.href = "/admin/user_list";
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